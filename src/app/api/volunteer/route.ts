import { getPool, isDatabaseConfigured } from "@/lib/db";
import { validateVolunteerForm } from "@/lib/volunteer";

const CODE_PREFIX = "OYTFV-2026-";

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

function isConstraintViolation(error: unknown, constraint: string): boolean {
  if (!isUniqueViolation(error)) return false;
  return (error as { constraint?: string }).constraint === constraint;
}

function isEmailUniqueViolation(error: unknown): boolean {
  return isConstraintViolation(error, "volunteer_registrations_email_unique");
}

function isCodeUniqueViolation(error: unknown): boolean {
  return isConstraintViolation(error, "volunteer_registrations_code_unique");
}

function duplicateEmailResponse() {
  return Response.json(
    {
      ok: false,
      error: "This email address has already applied.",
      errors: {
        email:
          "This email has already been used for a volunteer application. Use a different address or contact us if you already applied.",
      },
    },
    { status: 409 },
  );
}

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const result = validateVolunteerForm(payload);
  if (!result.ok) {
    return Response.json(
      { error: "Some answers need your attention.", errors: result.errors },
      { status: 400 },
    );
  }

  if (!isDatabaseConfigured()) {
    return Response.json(
      { error: "Applications are not configured yet. Please try again later." },
      { status: 503 },
    );
  }

  const {
    fullName,
    email,
    whatsapp,
    shirtSize,
    previousVolunteering,
    previousDetails,
    team,
    reassignment,
    skills,
    otherSkill,
    skillLevel,
  } = result.data;

  const columns = [
    "verification_code",
    "full_name",
    "email",
    "whatsapp",
    "shirt_size",
    "previous_volunteering",
    "previous_details",
    "team",
    "reassignment",
    "skills",
    "other_skill",
    "skill_level",
  ];

  const values: unknown[] = [
    "",
    fullName,
    email,
    whatsapp,
    shirtSize,
    previousVolunteering,
    previousDetails,
    team,
    reassignment,
    skills,
    otherSkill,
    skillLevel,
  ];

  const placeholders = values.map((_, index) => `$${index + 1}`).join(", ");

  try {
    const existing = await getPool().query(
      `SELECT 1 FROM volunteer_registrations WHERE lower(email) = lower($1) LIMIT 1`,
      [email],
    );
    if (existing.rowCount) return duplicateEmailResponse();
  } catch (error) {
    console.error("Failed to check for duplicate volunteer email:", error);
    return Response.json(
      { error: "We could not check your application. Please try again." },
      { status: 500 },
    );
  }

  try {
    for (let attempt = 0; attempt < 5; attempt += 1) {
      const verificationCode = generateVerificationCode();
      values[0] = verificationCode;

      try {
        await getPool().query(
          `INSERT INTO volunteer_registrations (${columns.join(", ")})
           VALUES (${placeholders})`,
          values,
        );

        return Response.json({ ok: true, verificationCode }, { status: 201 });
      } catch (error) {
        if (isEmailUniqueViolation(error)) return duplicateEmailResponse();
        if (isCodeUniqueViolation(error)) continue;
        throw error;
      }
    }

    return Response.json(
      { error: "We could not generate a unique code. Please try again." },
      { status: 500 },
    );
  } catch (error) {
    console.error("Failed to save volunteer application:", error);
    return Response.json(
      { error: "We could not save your application. Please try again." },
      { status: 500 },
    );
  }
}
