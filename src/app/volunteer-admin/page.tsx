import type { Metadata } from "next";
import Link from "next/link";
import { cookies } from "next/headers";
import { connection } from "next/server";
import { Suspense } from "react";
import ManualRegistrationDashboard from "@/components/ManualRegistrationDashboard";
import { isDatabaseConfigured } from "@/lib/db";
import {
  isVolunteerAdminAuthenticated,
  isVolunteerAdminConfigured,
  VOLUNTEER_ADMIN_COOKIE,
} from "@/lib/volunteer-admin-auth";
import "@/components/landing/landing.css";

export const metadata: Metadata = {
  title: "Manual Registration | Ogbor Youth Tech Fest 2026",
  description: "Password-protected manual attendee registration portal.",
  robots: { index: false, follow: false },
};

async function ManualRegistrationContent() {
  await connection();

  const configured = isVolunteerAdminConfigured() && isDatabaseConfigured();
  const cookieStore = await cookies();
  const authenticated = configured
    ? isVolunteerAdminAuthenticated(
        cookieStore.get(VOLUNTEER_ADMIN_COOKIE)?.value,
      )
    : false;

  return (
    <ManualRegistrationDashboard
      key={authenticated ? "manual-registration-in" : "manual-registration-out"}
      configured={configured}
      authenticated={authenticated}
    />
  );
}

export default function VolunteerAdminPage() {
  return (
    <main className="oytf oytf-admin-page">
      <header className="oytf-admin-topbar">
        <strong>OGBOR <span>YOUTH TECH FEST</span> 2026</strong>
        <nav>
          <Link href="/">Home</Link>
          <Link href="/admin">Registration dashboard</Link>
        </nav>
      </header>
      <Suspense
        fallback={<div className="oytf-admin-state">Loading registration form…</div>}
      >
        <ManualRegistrationContent />
      </Suspense>
    </main>
  );
}
