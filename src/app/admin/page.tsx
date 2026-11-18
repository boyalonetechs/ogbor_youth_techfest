import type { Metadata } from "next";
import Link from "next/link";
import { cookies } from "next/headers";
import { connection } from "next/server";
import { Suspense } from "react";
import AdminDashboard from "@/components/AdminDashboard";
import { ADMIN_COOKIE, isAdminAuthenticated, isAdminConfigured } from "@/lib/admin-auth";
import { isDatabaseConfigured } from "@/lib/db";
import { getAttendeeRegistrations } from "@/lib/registrations";
import "@/components/landing/landing.css";

export const metadata: Metadata = {
  title: "Admin | Ogbor Youth Tech Fest 2026",
  description: "Event admin dashboard for attendee registrations and verification.",
  robots: { index: false, follow: false },
};

async function AdminContent() {
  await connection();

  const configured = isAdminConfigured() && isDatabaseConfigured();
  const cookieStore = await cookies();
  const authenticated = configured
    ? isAdminAuthenticated(cookieStore.get(ADMIN_COOKIE)?.value)
    : false;

  const registrations =
    configured && authenticated ? await getAttendeeRegistrations() : [];

  const today = new Date().toISOString().slice(0, 10);

  return (
    <AdminDashboard
      key={authenticated ? "admin-in" : "admin-out"}
      initialRegistrations={registrations}
      configured={configured}
      authenticated={authenticated}
      today={today}
    />
  );
}

export default function AdminPage() {
  return (
    <main className="oytf oytf-admin-page">
      <header className="oytf-admin-topbar">
        <strong>OGBOR <span>YOUTH TECH FEST</span> 2026</strong>
        <nav>
          <Link href="/">Home</Link>
          <Link href="/register">Registration</Link>
        </nav>
      </header>
      <Suspense fallback={<div className="oytf-admin-state">Loading registrations…</div>}>
        <AdminContent />
      </Suspense>
    </main>
  );
}
