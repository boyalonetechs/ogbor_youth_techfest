import { cookies } from "next/headers";
import { getPool, isDatabaseConfigured } from "@/lib/db";
import { validateManualAttendeeForm } from "@/lib/manual-attendee";
import {
  isVolunteerAdminAuthenticated,
  isVolunteerAdminConfigured,
  VOLUNTEER_ADMIN_COOKIE,
} from "@/lib/volunteer-admin-auth";

const CODE_PREFIX = "OYTF-2026-";

function generateVerificationCode(): string {
  const codeNum = Math.floor(Math.random() * 10_000);
  return `${CODE_PREFIX}${String(codeNum).padStart(4, "0")}`;
}

function isUniqueViolation(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    (error as { code?: string }).code === "23505"
  );
}

function isEmailUniqueViolation(error: unknown): boolean {
  if (!isUniqueViolation(error)) return false;
  const constraint = (error as { constraint?: string }).constraint ?? "";
  return constraint === "attendee_registrations_email_unique";
}

function duplicateEmailResponse() {
  return Response.json(
    {
      ok: false,
      error: "That email is already registered as an attendee.",
      errors: {
        email: "This email is already in the attendee sheet. Check the registration dashboard before adding another row.",
      },
    },
    { status: 409 },
  );
}

export async function POST(request: Request) {
  if (!isVolunteerAdminConfigured() || !isDatabaseConfigured()) {
    return Response.json(
      { error: "Manual registration is not configured yet." },
      { status: 503 },
    );
  }

  const cookieStore = await cookies();
  const authenticated = isVolunteerAdminAuthenticated(
    cookieStore.get(VOLUNTEER_ADMIN_COOKIE)?.value,
  );
  if (!authenticated) {
    return Response.json({ error: "Sign in to register an attendee." }, { status: 401 });
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const result = validateManualAttendeeForm(payload);
  if (!result.ok) {
    return Response.json(
      { error: "Some details need your attention.", errors: result.errors },
      { status: 400 },
    );
  }

  const {
    fullName,
    email,
    phone,
    ageRange,
    residence,
    description,
    otherDescription,
    additionalInfo,
  } = result.data;

  try {
    const existing = await getPool().query(
      `SELECT 1 FROM attendee_registrations WHERE lower(email) = lower($1) LIMIT 1`,
      [email],
    );
    if (existing.rowCount) return duplicateEmailResponse();
  } catch (error) {
    console.error("Failed to check for duplicate attendee email:", error);
    return Response.json(
      { error: "We could not check the attendee list. Please try again." },
      { status: 500 },
    );
  }

  const columns = [
    "verification_code",
    "full_name",
    "email",
    "phone",
    "age_range",
    "gender",
    "residence",
    "current_description",
    "other_description",
    "digital_skills",
    "other_skill",
    "skill_level",
    "follow_up_training",
    "learning_styles",
    "device_access",
    "digital_earnings",
    "event_hopes",
    "heard_about",
    "other_heard_about",
    "friends_invited",
    "future_updates",
    "reminder_channel",
    "additional_info",
    "email_sent_note",
  ];

  // Unasked attendee questions are saved as neutral placeholders so the row
  // can still be opened and exported from the full registration sheet.
  const values: unknown[] = [
    "", // verification code, filled below
    fullName,
    email,
    phone,
    ageRange,
    "Not provided",
    residence,
    description,
    otherDescription,
    [],
    "",
    "Not provided",
    "Not provided",
    [],
    [],
    "Not provided",
    [],
    [],
    "",
    "Not provided",
    "Not provided",
    "Not provided",
    additionalInfo,
    "Manual entry — code not emailed",
  ];

  const placeholders = values.map((_, index) => `$${index + 1}`).join(", ");

  try {
    for (let attempt = 0; attempt < 5; attempt += 1) {
      const verificationCode = generateVerificationCode();
      values[0] = verificationCode;

      try {
        const inserted = await getPool().query<{ id: string }>(
          `INSERT INTO attendee_registrations (${columns.join(", ")})
           VALUES (${placeholders})
           RETURNING id`,
          values,
        );

        return Response.json(
          {
            ok: true,
            id: inserted.rows[0]?.id,
            verificationCode,
            emailSent: false,
          },
          { status: 201 },
        );
      } catch (error) {
        if (isEmailUniqueViolation(error)) return duplicateEmailResponse();
        if (isUniqueViolation(error)) continue;
        throw error;
      }
    }

    return Response.json(
      { error: "We could not generate a unique code. Please try again." },
      { status: 500 },
    );
  } catch (error) {
    console.error("Failed to save manual attendee registration:", error);
    return Response.json(
      { error: "We could not save this registration. Please try again." },
      { status: 500 },
    );
  }
}
