import type { Metadata } from "next";
import Link from "next/link";
import { cookies } from "next/headers";
import { connection } from "next/server";
import { Suspense } from "react";
import AdminCompose from "@/components/AdminCompose";
import { ADMIN_COOKIE, isAdminAuthenticated, isAdminConfigured } from "@/lib/admin-auth";
import { isDatabaseConfigured } from "@/lib/db";
import { getAttendeeRegistrations } from "@/lib/registrations";
import "@/components/landing/landing.css";

export const metadata: Metadata = {
  title: "Bulk Mail | Ogbor Youth Tech Fest 2026",
  description: "Compose and send bulk email to registered attendees.",
  robots: { index: false, follow: false },
};

async function ComposeContent() {
  await connection();

  const configured = isAdminConfigured() && isDatabaseConfigured();
  const cookieStore = await cookies();
  const authenticated = configured
    ? isAdminAuthenticated(cookieStore.get(ADMIN_COOKIE)?.value)
    : false;

  if (!configured || !authenticated) {
    return (
      <div className="oytf-admin-state">
        <div className="oytf-admin-login">
          <span>ADMIN ACCESS</span>
          <h2>Sign in required</h2>
          <p>Sign in to the admin dashboard before composing bulk email.</p>
          <Link href="/admin" className="oytf-button">
            GO TO ADMIN SIGN IN <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    );
  }

  const registrations = await getAttendeeRegistrations();
  return <AdminCompose registrations={registrations} />;
}

export default function ComposePage() {
  return (
    <main className="oytf oytf-admin-page">
      <header className="oytf-admin-topbar">
        <strong>OGBOR <span>YOUTH TECH FEST</span> 2026</strong>
        <nav>
          <Link href="/">Home</Link>
          <Link href="/admin">Admin</Link>
          <Link href="/register">Registration</Link>
        </nav>
      </header>
      <Suspense fallback={<div className="oytf-admin-state">Loading composer…</div>}>
        <ComposeContent />
      </Suspense>
    </main>
  );
}
