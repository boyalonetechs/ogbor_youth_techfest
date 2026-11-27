import { NextResponse } from "next/server";
import {
  createVolunteerAdminSessionToken,
  isVolunteerAdminConfigured,
  verifyVolunteerAdminPassword,
  VOLUNTEER_ADMIN_COOKIE,
} from "@/lib/volunteer-admin-auth";

export async function POST(request: Request) {
  if (!isVolunteerAdminConfigured()) {
    return NextResponse.json(
      { error: "Volunteer admin access is not configured yet." },
      { status: 503 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    body = null;
  }

  const password =
    body && typeof body === "object" && "password" in body
      ? (body as { password?: unknown }).password
      : undefined;

  if (typeof password !== "string" || !verifyVolunteerAdminPassword(password)) {
    return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(VOLUNTEER_ADMIN_COOKIE, createVolunteerAdminSessionToken(), {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8,
  });
  return response;
}
