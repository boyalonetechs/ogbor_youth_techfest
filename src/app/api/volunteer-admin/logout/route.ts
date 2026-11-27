import { NextResponse } from "next/server";
import { VOLUNTEER_ADMIN_COOKIE } from "@/lib/volunteer-admin-auth";

export async function POST() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set(VOLUNTEER_ADMIN_COOKIE, "", {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
  return response;
}
