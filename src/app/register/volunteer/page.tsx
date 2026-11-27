import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import VolunteerForm from "@/components/VolunteerForm";
import "@/components/landing/landing.css";

export const metadata: Metadata = {
  title: "Volunteer Application | Ogbor Youth Tech Fest 2026",
  description:
    "Join the volunteer team behind Ogbor Youth Tech Fest 2026 in Aba, Abia State.",
};

export default function VolunteerRegistrationPage() {
  return (
    <main className="oytf min-h-screen bg-brand-sun! text-brand-ink!">
      <Navbar />
      <section
        className="mx-auto w-full max-w-[1180px] px-5 pb-20 pt-20 sm:px-8 sm:pt-24 lg:pb-28"
        id="volunteer-register"
      >
        <div className="mt-8 sm:mt-0">
          <VolunteerForm />
        </div>
      </section>
    </main>
  );
}
