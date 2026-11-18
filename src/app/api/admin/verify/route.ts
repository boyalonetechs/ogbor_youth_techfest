import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { ADMIN_COOKIE, isAdminAuthenticated, isAdminConfigured } from "@/lib/admin-auth";
import { getPool } from "@/lib/db";

function guard(request: NextRequest) {
  if (!isAdminConfigured()) {
    return NextResponse.json(
      { error: "Admin access is not configured yet." },
      { status: 503 },
    );
  }
  if (!isAdminAuthenticated(request.cookies.get(ADMIN_COOKIE)?.value)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }
  return null;
}

async function updateVerification(code: string, verified: boolean) {
  const result = await getPool().query(
    `UPDATE attendee_registrations
     SET verified_at = CASE WHEN $2 THEN now() ELSE NULL END
     WHERE verification_code = $1
     RETURNING verification_code, full_name, verified_at`,
    [code, verified],
  );
  return result.rows[0];
}

export async function POST(request: NextRequest) {
  const denied = guard(request);
  if (denied) return denied;

  const body = (await request.json().catch(() => null)) as { code?: string } | null;
  const code = body?.code?.trim().toUpperCase();
  if (!code) {
    return NextResponse.json({ error: "Enter a verification code." }, { status: 400 });
  }

  try {
    const registration = await updateVerification(code, true);
    if (!registration) {
      return NextResponse.json(
        { error: "No registration found for that code." },
        { status: 404 },
      );
    }
    return NextResponse.json({ ok: true, registration });
  } catch (error) {
    console.error("Failed to verify code:", error);
    return NextResponse.json(
      { error: "We could not verify that code." },
      { status: 500 },
    );
  }
}

export async function DELETE(request: NextRequest) {
  const denied = guard(request);
  if (denied) return denied;

  const code = request.nextUrl.searchParams.get("code")?.trim().toUpperCase();
  if (!code) {
    return NextResponse.json({ error: "Enter a verification code." }, { status: 400 });
  }

  try {
    const registration = await updateVerification(code, false);
    if (!registration) {
      return NextResponse.json(
        { error: "No registration found for that code." },
        { status: 404 },
      );
    }
    return NextResponse.json({ ok: true, registration });
  } catch (error) {
    console.error("Failed to undo verification:", error);
    return NextResponse.json(
      { error: "We could not undo that verification." },
      { status: 500 },
    );
  }
}
