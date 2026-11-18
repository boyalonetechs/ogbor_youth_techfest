import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { ADMIN_COOKIE, isAdminAuthenticated, isAdminConfigured } from "@/lib/admin-auth";
import { getAttendeeRegistrations } from "@/lib/registrations";

export async function GET(request: NextRequest) {
  if (!isAdminConfigured()) {
    return NextResponse.json(
      { error: "Admin access is not configured yet." },
      { status: 503 },
    );
  }

  if (!isAdminAuthenticated(request.cookies.get(ADMIN_COOKIE)?.value)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const registrations = await getAttendeeRegistrations();
    return NextResponse.json({ registrations });
  } catch (error) {
    console.error("Failed to load registrations:", error);
    return NextResponse.json(
      { error: "We could not load registrations." },
      { status: 500 },
    );
  }
}
