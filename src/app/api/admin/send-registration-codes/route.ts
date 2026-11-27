import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import {
  ADMIN_COOKIE,
  isAdminAuthenticated,
  isAdminConfigured,
} from "@/lib/admin-auth";
import { getPool } from "@/lib/db";
import { isEmailConfigured, sendRegistrationEmail } from "@/lib/email";

type CodeRow = {
  verification_code: string;
  full_name: string;
  email: string;
};

type SendSummary = {
  total: number;
  sent: number;
  failed: number;
  skipped: number;
  errors: string[];
};

// Keep the burst small enough for Resend's rate limits, matching the bulk composer.
const BATCH_SIZE = 10;
const BATCH_DELAY_MS = 500;

function delay(milliseconds: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, milliseconds));
}

export async function POST(request: NextRequest) {
  if (!isAdminConfigured()) {
    return NextResponse.json(
      { error: "Admin access is not configured yet." },
      { status: 503 },
    );
  }

  if (!isAdminAuthenticated(request.cookies.get(ADMIN_COOKIE)?.value)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!isEmailConfigured()) {
    return NextResponse.json(
      { error: "Email service not configured" },
      { status: 503 },
    );
  }

  let rows: CodeRow[];
  try {
    const result = await getPool().query<CodeRow>(
      `SELECT verification_code, full_name, email
       FROM attendee_registrations
       WHERE verification_code IS NOT NULL AND btrim(verification_code) <> ''
         AND email IS NOT NULL AND btrim(email) <> ''
       ORDER BY created_at ASC`,
    );
    rows = result.rows;
  } catch (error) {
    console.error("Failed to load registration codes:", error);
    return NextResponse.json(
      { error: "Could not load registrations." },
      { status: 500 },
    );
  }

  const summary: SendSummary = {
    total: rows.length,
    sent: 0,
    failed: 0,
    skipped: 0,
    errors: [],
  };

  for (let index = 0; index < rows.length; index += BATCH_SIZE) {
    const batch = rows.slice(index, index + BATCH_SIZE);

    await Promise.all(
      batch.map(async (row) => {
        // The code, name and address all come from the same database row, so
        // an attendee can only ever receive their own registration code.
        const to = row.email.trim().toLowerCase();
        const code = row.verification_code.trim();
        const name = row.full_name?.trim() || "there";

        try {
          const result = await sendRegistrationEmail({ to, name, code });
          if (result.skipped) {
            summary.skipped++;
            summary.errors.push(`${to}: email service not configured`);
          } else if (result.sent) {
            summary.sent++;
          } else {
            summary.failed++;
            summary.errors.push(`${to}: email provider rejected the message`);
          }
        } catch (error) {
          summary.failed++;
          summary.errors.push(
            `${to}: ${error instanceof Error ? error.message : "Unknown error"}`,
          );
        }
      }),
    );

    if (index + BATCH_SIZE < rows.length) {
      await delay(BATCH_DELAY_MS);
    }
  }

  return NextResponse.json(summary);
}
