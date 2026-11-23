import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { isAdminAuthenticated, ADMIN_COOKIE } from "@/lib/admin-auth";
import { sendBulkEmail, isEmailConfigured } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const cookie = cookieStore.get(ADMIN_COOKIE);
    const authenticated = isAdminAuthenticated(cookie?.value);

    if (!authenticated) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!isEmailConfigured()) {
      return NextResponse.json(
        { error: "Email service not configured" },
        { status: 503 }
      );
    }

    const body = await request.json();
    const { to, subject, text, html } = body;

    if (!to || !Array.isArray(to) || to.length === 0) {
      return NextResponse.json(
        { error: "No recipients provided" },
        { status: 400 }
      );
    }

    if (!subject || !text || !html) {
      return NextResponse.json(
        { error: "Subject, text, and html are required" },
        { status: 400 }
      );
    }

    const result = await sendBulkEmail({ to, subject, text, html });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Bulk email error:", error);
    return NextResponse.json(
      { error: "Failed to send bulk email" },
      { status: 500 }
    );
  }
}