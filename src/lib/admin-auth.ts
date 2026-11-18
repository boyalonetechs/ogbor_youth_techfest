import { createHmac, timingSafeEqual } from "node:crypto";

export const ADMIN_COOKIE = "oytf_admin_session";

const SESSION_PAYLOAD = "oytf-admin-2026";

export function isAdminConfigured(): boolean {
  return Boolean(process.env.ADMIN_PASSWORD);
}

function safeEqual(a: string, b: string): boolean {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  return left.length === right.length && timingSafeEqual(left, right);
}

export function verifyAdminPassword(password: string): boolean {
  const configured = process.env.ADMIN_PASSWORD;
  return configured ? safeEqual(password, configured) : false;
}

export function createAdminSessionToken(): string {
  const configured = process.env.ADMIN_PASSWORD;
  if (!configured) throw new Error("ADMIN_PASSWORD is not configured.");
  return createHmac("sha256", configured).update(SESSION_PAYLOAD).digest("base64url");
}

export function isAdminAuthenticated(token: string | undefined): boolean {
  if (!token || !isAdminConfigured()) return false;
  return safeEqual(token, createAdminSessionToken());
}
