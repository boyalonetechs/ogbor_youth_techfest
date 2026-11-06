import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import "@/components/landing/landing.css";

export const metadata: Metadata = {
  title: "Register | Ogbor Youth Tech Fest 2026",
  description:
    "Register to attend, volunteer, or exhibit at Ogbor Youth Tech Fest 2026 in Aba, Abia State.",
};

const GOOGLE_FORMS = {
  attend: "https://forms.gle/3RqAGVhxS6Vzsg2Z6",
  volunteer: "https://forms.gle/6sgZ4orcfiC254oFA",
  exhibit: "https://forms.gle/F4cdQV1ChMa9Czj68",
} as const;

const options = [
  {
    key: "attend",
    index: "01 / ATTEND",
    title: "Register to attend",
    description:
      "Be part of 1,000 young people exploring technology, innovation and opportunities in the digital economy.",
    href: GOOGLE_FORMS.attend,
    cta: "Register to attend",
    tone: "oytf-involve-card--attend",
  },
  {
    key: "volunteer",
    index: "02 / VOLUNTEER",
    title: "Become a volunteer",
    description:
      "Contribute your time, skills and creativity towards delivering an impactful experience for 1,000 young people.",
    href: GOOGLE_FORMS.volunteer,
    cta: "Apply to volunteer",
    tone: "oytf-involve-card--volunteer",
  },
  {
    key: "exhibit",
    index: "03 / EXHIBIT",
    title: "Exhibit at the tech fest",
    description:
      "Showcase your products, services, innovations and business ideas to an audience of young people, entrepreneurs and professionals.",
    href: GOOGLE_FORMS.exhibit,
    cta: "Apply to exhibit",
    tone: "oytf-involve-card--exhibit",
  },
] as const;

export default function RegisterPage() {
  return (
    <main className="oytf">
      <Navbar />
      <section className="oytf-section oytf-involved" id="register">
        <div className="oytf-kicker">
          <span>REGISTER</span>
          <span>OGBOR YOUTH TECH FEST 2026</span>
        </div>

        <div className="oytf-involved-heading">
          <h1 className="oytf-display">
            YOUR ROLE,
            <br />
            <span>YOUR WAY.</span>
          </h1>
          <p>
            Choose how you want to be part of Ogbor Youth Tech Fest 2026. Each
            option opens a short Google Form.
          </p>
        </div>

        <div className="oytf-involve-grid">
          {options.map((option) => (
            <article
              key={option.key}
              className={`oytf-involve-card ${option.tone}`}
            >
              <div className="oytf-involve-top">
                <span className="oytf-involve-index">{option.index}</span>
              </div>
              <h2>{option.title}</h2>
              <p>{option.description}</p>
              <a
                href={option.href}
                target="_blank"
                rel="noopener noreferrer"
                className="oytf-button oytf-card-button"
              >
                {option.cta} <span aria-hidden="true">↗</span>
              </a>
            </article>
          ))}
        </div>

        <p className="oytf-form-note" style={{ marginTop: 24 }}>
          Need help? Email{" "}
          <a href="mailto:ogboryouthtechfest@gmail.com">
            ogboryouthtechfest@gmail.com
          </a>
          . <Link href="/">Back to home</Link>
        </p>
      </section>
    </main>
  );
}
