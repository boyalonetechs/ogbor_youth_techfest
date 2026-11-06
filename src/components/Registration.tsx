"use client";

import Link from "next/link";

export default function Registration() {
  const ctas = [
    {
      label: "Register to Attend",
      href: "#register",
      description: "Secure your spot at the festival",
      primary: true,
    },
    {
      label: "Become a Volunteer",
      href: "#volunteer",
      description: "Help make the event happen",
      primary: false,
    },
    {
      label: "Book an Exhibition Space",
      href: "#exhibit",
      description: "Showcase your brand or innovation",
      primary: false,
    },
  ];

  return (
    <section className="registration section-pad" id="get-involved">
      <div className="section-kicker">
        <span>05 / GET INVOLVED</span>
        <span>THREE WAYS TO BE PART OF IT</span>
      </div>
      <div className="registration-grid">
        <div className="registration-header">
          <h2 className="section-title">
            YOUR ROLE,
            <br />
            <span>YOUR WAY.</span>
          </h2>
          <p className="registration-lead">
            Whether you want to learn, contribute, or showcase — there&apos;s a place
            for you at Ogbor Youth Tech Fest 2026.
          </p>
        </div>
        <div className="registration-cards">
          {ctas.map((cta) => (
            <article
              key={cta.label}
              className={`registration-card ${
                cta.primary ? "registration-card--primary" : ""
              }`}
            >
              <div className="card-content">
                <h3>{cta.label}</h3>
                <p>{cta.description}</p>
              </div>
              <Link
                href={cta.href}
                className={`button ${
                  cta.primary ? "button-lime" : "button-dark"
                } registration-btn`}
              >
                {cta.label} <span aria-hidden="true">→</span>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
