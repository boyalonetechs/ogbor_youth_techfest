import { createHmac, timingSafeEqual } from "node:crypto";

/**
 * Separate credentials for the volunteer list. The attendee admin password
 * cannot unlock this route: a distinct env var and a distinct cookie are used.
 */
export const VOLUNTEER_ADMIN_COOKIE = "oytf_volunteer_admin_session";

const SESSION_PAYLOAD = "oytf-volunteer-admin-2026";

export function isVolunteerAdminConfigured(): boolean {
  return Boolean(process.env.VOLUNTEER_ADMIN_PASSWORD);
}

function safeEqual(a: string, b: string): boolean {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  return left.length === right.length && timingSafeEqual(left, right);
}

export function verifyVolunteerAdminPassword(password: string): boolean {
  const configured = process.env.VOLUNTEER_ADMIN_PASSWORD;
  return configured ? safeEqual(password, configured) : false;
}

export function createVolunteerAdminSessionToken(): string {
  const configured = process.env.VOLUNTEER_ADMIN_PASSWORD;
  if (!configured) throw new Error("VOLUNTEER_ADMIN_PASSWORD is not configured.");
  return createHmac("sha256", configured).update(SESSION_PAYLOAD).digest("base64url");
}

export function isVolunteerAdminAuthenticated(token: string | undefined): boolean {
  if (!token || !isVolunteerAdminConfigured()) return false;
  return safeEqual(token, createVolunteerAdminSessionToken());
}
