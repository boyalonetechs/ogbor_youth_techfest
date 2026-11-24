import { getPool, isDatabaseConfigured } from "@/lib/db";
import { validateAttendeeForm } from "@/lib/attendee";
import { sendRegistrationEmail } from "@/lib/email";

const CODE_PREFIX = "OYTF-2026-";

function generateVerificationCode(): string {
  // Generate a 4-digit code with leading zeros, e.g., OYTF-2026-0091
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

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const result = validateAttendeeForm(payload);
  if (!result.ok) {
    return Response.json(
      { error: "Some answers need your attention.", errors: result.errors },
      { status: 400 },
    );
  }

  if (!isDatabaseConfigured()) {
    return Response.json(
      { error: "Registration is not configured yet. Please try again later." },
      { status: 503 },
    );
  }

  const {
    fullName,
    email,
    phone,
    ageRange,
    gender,
    residence,
    description,
    otherDescription,
    digitalSkills,
    otherSkill,
    skillLevel,
    followUp,
    learningStyles,
    access,
    earnings,
    hopes,
    heardAbout,
    otherHeardAbout,
    friends,
    futureInfo,
    reminders,
    additionalInfo,
  } = result.data;

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
  ];

  const values = [
    "", // verification code, filled below
    fullName,
    email,
    phone,
    ageRange,
    gender,
    residence,
    description,
    otherDescription,
    digitalSkills,
    otherSkill,
    skillLevel,
    followUp,
    learningStyles,
    access,
    earnings,
    hopes,
    heardAbout,
    otherHeardAbout,
    friends,
    futureInfo,
    reminders,
    additionalInfo,
  ];

  const placeholders = values.map((_, index) => `$${index + 1}`).join(", ");

  try {
    for (let attempt = 0; attempt < 5; attempt += 1) {
      const verificationCode = generateVerificationCode();
      values[0] = verificationCode;

      try {
        await getPool().query(
          `INSERT INTO attendee_registrations (${columns.join(", ")})
           VALUES (${placeholders})`,
          values,
        );

        const emailResult = await sendRegistrationEmail({
          to: email,
          name: fullName,
          code: verificationCode,
        });

        return Response.json(
          {
            ok: true,
            verificationCode,
            emailSent: emailResult.sent,
            emailSkipped: emailResult.skipped,
          },
          { status: 201 },
        );
      } catch (error) {
        if (isUniqueViolation(error)) continue;
        throw error;
      }
    }

    return Response.json(
      { error: "We could not generate a unique code. Please try again." },
      { status: 500 },
    );
  } catch (error) {
    console.error("Failed to save attendee registration:", error);
    return Response.json(
      { error: "We could not save your registration. Please try again." },
      { status: 500 },
    );
  }
}
