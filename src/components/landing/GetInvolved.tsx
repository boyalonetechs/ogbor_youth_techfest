"use client";

import { useRef, useState } from "react";
import type { FormEvent, KeyboardEvent } from "react";
import SectionKicker from "./SectionKicker";

type InvolvementId = "attend" | "volunteer" | "exhibit";
type FieldType = "text" | "tel" | "email" | "url" | "textarea" | "select";

type Field = {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  placeholder?: string;
  options?: string[];
  full?: boolean;
  autoComplete?: string;
};

type InvolvementTab = {
  id: InvolvementId;
  index: string;
  tabLabel: string;
  title: string;
  description: string;
  submitLabel: string;
  mailSubject: string;
  subjectField: string;
  fields: Field[];
};

type InvolvementCard = {
  id: InvolvementId;
  index: string;
  icon: string;
  title: string;
  body: string;
  highlights: string[];
  cta: string;
  tone: "attend" | "volunteer" | "exhibit";
};

const volunteerDepartments = [
  "Community mobilisation",
  "Registration & participant management",
  "Media, photography & videography",
  "Publicity & digital marketing",
  "Technical & ICT support",
  "Logistics & venue management",
  "Welfare & hospitality",
  "Partnerships & sponsorship",
];

const exhibitorCategories = [
  "Technology company / startup",
  "Digital training institution",
  "SME / innovative business",
  "AI or software solution provider",
  "Creative agency / digital professional",
  "Educational or development organisation",
  "Other",
];

const cards: InvolvementCard[] = [
  {
    id: "attend",
    index: "01 / ATTEND",
    icon: "◎",
    title: "Register to attend",
    body: "Be part of 1,000 young people exploring technology, innovation and opportunities in the digital economy.",
    highlights: [
      "Keynotes, panels & demonstrations",
      "Digital skills & exhibitions",
      "Networking & new connections",
    ],
    cta: "Register to attend",
    tone: "attend",
  },
  {
    id: "volunteer",
    index: "02 / VOLUNTEER",
    icon: "✳",
    title: "Become a volunteer",
    body: "Are you passionate about technology, youth development and community impact? Join the team delivering the experience.",
    highlights: [
      "Community mobilisation",
      "Media & digital marketing",
      "Logistics & hospitality",
    ],
    cta: "Apply to volunteer",
    tone: "volunteer",
  },
  {
    id: "exhibit",
    index: "03 / EXHIBIT",
    icon: "↗",
    title: "Exhibit at the tech fest",
    body: "Showcase your products, services, innovations and business ideas to 1,000 young people, entrepreneurs and professionals.",
    highlights: [
      "Showcase your product",
      "Meet future customers & talent",
      "Connect with partners & sponsors",
    ],
    cta: "Apply to exhibit",
    tone: "exhibit",
  },
];

const tabs: InvolvementTab[] = [
  {
    id: "attend",
    index: "01",
    tabLabel: "Attend",
    title: "Register to attend",
    description:
      "Secure your place among 1,000 young people exploring technology, innovation and opportunity.",
    submitLabel: "Submit registration",
    mailSubject: "Ogbor Youth Tech Fest — Attendee registration",
    subjectField: "fullName",
    fields: [
      {
        name: "fullName",
        label: "Full name",
        type: "text",
        required: true,
        placeholder: "Your full name",
        autoComplete: "name",
      },
      {
        name: "phone",
        label: "Phone number",
        type: "tel",
        required: true,
        placeholder: "0800 000 0000",
        autoComplete: "tel",
      },
      {
        name: "email",
        label: "Email address",
        type: "email",
        required: true,
        placeholder: "you@example.com",
        autoComplete: "email",
      },
      {
        name: "gender",
        label: "Gender (optional)",
        type: "select",
        options: ["Female", "Male", "Non-binary", "Prefer not to say"],
      },
      {
        name: "ageRange",
        label: "Age range",
        type: "select",
        required: true,
        options: ["Under 18", "18–24", "25–34", "35–44", "45+"],
      },
      {
        name: "location",
        label: "State and location",
        type: "text",
        required: true,
        placeholder: "e.g. Abia, Aba",
        autoComplete: "address-level1",
      },
      {
        name: "organisation",
        label: "Organisation, school or institution",
        type: "text",
        placeholder: "Optional",
      },
      {
        name: "status",
        label: "Current status",
        type: "select",
        required: true,
        options: [
          "Student",
          "NYSC corps member",
          "Entrepreneur",
          "Professional",
          "Job seeker",
          "Other",
        ],
      },
      {
        name: "interest",
        label: "Area of interest",
        type: "select",
        required: true,
        options: [
          "Digital skills",
          "AI & emerging technology",
          "Entrepreneurship",
          "Digital marketing",
          "Innovation",
          "Careers & opportunities",
          "Other",
        ],
      },
      {
        name: "heardFrom",
        label: "How did you hear about the event?",
        type: "select",
        required: true,
        options: [
          "Social media",
          "Friend or colleague",
          "School or institution",
          "Radio or TV",
          "Community event",
          "Other",
        ],
      },
    ],
  },
  {
    id: "volunteer",
    index: "02",
    tabLabel: "Volunteer",
    title: "Become a volunteer",
    description:
      "Contribute your time, skills and creativity towards delivering an impactful experience for 1,000 young people.",
    submitLabel: "Submit application",
    mailSubject: "Ogbor Youth Tech Fest — Volunteer application",
    subjectField: "fullName",
    fields: [
      {
        name: "fullName",
        label: "Full name",
        type: "text",
        required: true,
        placeholder: "Your full name",
        autoComplete: "name",
      },
      {
        name: "phone",
        label: "Phone number",
        type: "tel",
        required: true,
        placeholder: "0800 000 0000",
        autoComplete: "tel",
      },
      {
        name: "email",
        label: "Email address",
        type: "email",
        required: true,
        placeholder: "you@example.com",
        autoComplete: "email",
      },
      {
        name: "location",
        label: "Location",
        type: "text",
        required: true,
        placeholder: "City / state",
        autoComplete: "address-level1",
      },
      {
        name: "department",
        label: "Preferred volunteer department",
        type: "select",
        required: true,
        options: volunteerDepartments,
      },
      {
        name: "availability",
        label: "Availability",
        type: "select",
        required: true,
        options: ["Weekdays", "Weekends", "Flexible", "Event day only"],
      },
      {
        name: "skills",
        label: "Skills and experience",
        type: "textarea",
        required: true,
        placeholder:
          "Tell us about the skills and experience you would bring to the team.",
        full: true,
      },
      {
        name: "motivation",
        label: "Why do you want to volunteer?",
        type: "textarea",
        required: true,
        placeholder: "Share what motivates you to be part of the team.",
        full: true,
      },
      {
        name: "portfolio",
        label: "CV or portfolio (optional)",
        type: "url",
        placeholder: "Link to your CV, portfolio or LinkedIn",
        full: true,
        autoComplete: "url",
      },
    ],
  },
  {
    id: "exhibit",
    index: "03",
    tabLabel: "Exhibit",
    title: "Exhibit at the tech fest",
    description:
      "Showcase your products, services, innovations and business ideas to an audience of young people, entrepreneurs and professionals.",
    submitLabel: "Submit application",
    mailSubject: "Ogbor Youth Tech Fest — Exhibition application",
    subjectField: "organisation",
    fields: [
      {
        name: "organisation",
        label: "Organisation / business name",
        type: "text",
        required: true,
        placeholder: "Name of your organisation",
        autoComplete: "organization",
      },
      {
        name: "contactName",
        label: "Contact person’s name",
        type: "text",
        required: true,
        placeholder: "Full name",
        autoComplete: "name",
      },
      {
        name: "phone",
        label: "Phone number",
        type: "tel",
        required: true,
        placeholder: "0800 000 0000",
        autoComplete: "tel",
      },
      {
        name: "email",
        label: "Email address",
        type: "email",
        required: true,
        placeholder: "you@example.com",
        autoComplete: "email",
      },
      {
        name: "category",
        label: "Business category",
        type: "select",
        required: true,
        options: exhibitorCategories,
      },
      {
        name: "package",
        label: "Preferred exhibition package",
        type: "select",
        required: true,
        options: [
          "Standard booth",
          "Premium booth",
          "Startup showcase",
          "Not sure yet — please advise",
        ],
      },
      {
        name: "description",
        label: "Description of product, service or innovation",
        type: "textarea",
        required: true,
        placeholder: "Tell us what you would like to showcase.",
        full: true,
      },
      {
        name: "requirements",
        label: "Exhibition requirements",
        type: "textarea",
        placeholder:
          "Space, power, equipment or anything else we should know. Optional.",
        full: true,
      },
      {
        name: "handles",
        label: "Website / social media handles (optional)",
        type: "text",
        placeholder: "Website, Instagram, LinkedIn…",
        full: true,
      },
      {
        name: "partnershipInterest",
        label: "Sponsorship or partnership interest (optional)",
        type: "select",
        options: [
          "Sponsorship",
          "Strategic partnership",
          "Exhibition only",
          "Not sure yet",
        ],
      },
    ],
  },
];

function FormField({ field, idPrefix }: { field: Field; idPrefix: string }) {
  const id = `${idPrefix}-${field.name}`;

  return (
    <div className={`oytf-field${field.full ? " oytf-field--full" : ""}`}>
      <label htmlFor={id}>
        {field.label}
        {field.required ? <span aria-hidden="true"> *</span> : null}
      </label>

      {field.type === "textarea" ? (
        <textarea
          id={id}
          name={field.name}
          rows={4}
          required={field.required}
          placeholder={field.placeholder}
        />
      ) : field.type === "select" ? (
        <select
          id={id}
          name={field.name}
          required={field.required}
          defaultValue=""
        >
          <option value="" disabled>
            Select an option
          </option>
          {field.options?.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={id}
          name={field.name}
          type={field.type}
          required={field.required}
          placeholder={field.placeholder}
          autoComplete={field.autoComplete}
        />
      )}
    </div>
  );
}

export default function GetInvolved() {
  const [activeTab, setActiveTab] = useState<InvolvementId>("attend");
  const [status, setStatus] = useState<Record<string, string>>({});
  const formShellRef = useRef<HTMLDivElement>(null);

  const selectFromCard = (id: InvolvementId) => {
    setActiveTab(id);
    window.requestAnimationFrame(() => {
      formShellRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  };

  const handleTabKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") {
      return;
    }

    event.preventDefault();
    const nextIndex =
      event.key === "ArrowRight"
        ? (index + 1) % tabs.length
        : (index - 1 + tabs.length) % tabs.length;
    const nextTab = tabs[nextIndex];

    setActiveTab(nextTab.id);
    document.getElementById(`oytf-tab-${nextTab.id}`)?.focus();
  };

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>,
    tab: InvolvementTab,
  ) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const lines = Array.from(data.entries()).map(([name, value]) => {
      const label =
        tab.fields.find((field) => field.name === name)?.label ?? name;
      return `${label}: ${String(value || "—")}`;
    });

    const subjectValue = String(data.get(tab.subjectField) ?? "");
    const subject = `${tab.mailSubject}${
      subjectValue ? ` — ${subjectValue}` : ""
    }`;
    const body = [
      "Ogbor Youth Tech Fest 2026",
      tab.title,
      "",
      ...lines,
    ].join("\n");

    const mailtoUrl = `mailto:ogboryouthtechfest@gmail.com?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;

    window.location.assign(mailtoUrl);

    setStatus((previous) => ({
      ...previous,
      [tab.id]:
        "Your email app should open with your application. If it doesn’t, email ogboryouthtechfest@gmail.com directly.",
    }));
  };

  return (
    <section className="oytf-section oytf-involved" id="get-involved">
      <SectionKicker
        index="05"
        label="GET INVOLVED"
        right="THREE WAYS TO BE PART OF IT"
      />

      <div className="oytf-involved-heading">
        <h2 className="oytf-display">
          YOUR ROLE,
          <br />
          <span>YOUR WAY.</span>
        </h2>
        <p>
          Whether you want to learn, contribute or showcase your work, there is
          a place for you at Ogbor Youth Tech Fest 2026. Choose a route below
          and complete the short application.
        </p>
      </div>

      <div className="oytf-involve-grid">
        {cards.map((card) => (
          <article
            className={`oytf-involve-card oytf-involve-card--${card.tone}`}
            key={card.id}
          >
            <div className="oytf-involve-top">
              <span className="oytf-involve-index">{card.index}</span>
              <span className="oytf-involve-icon" aria-hidden="true">
                {card.icon}
              </span>
            </div>

            <h3>{card.title}</h3>
            <p>{card.body}</p>

            <ul className="oytf-involve-list">
              {card.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>

            <button
              type="button"
              className="oytf-button oytf-card-button"
              onClick={() => selectFromCard(card.id)}
            >
              {card.cta} <span aria-hidden="true">↗</span>
            </button>
          </article>
        ))}
      </div>

      <div
        className="oytf-form-shell"
        id="involvement-forms"
        ref={formShellRef}
      >
        <div
          className="oytf-form-tabs"
          role="tablist"
          aria-label="Choose an application type"
        >
          {tabs.map((tab, index) => (
            <button
              key={tab.id}
              id={`oytf-tab-${tab.id}`}
              type="button"
              role="tab"
              aria-selected={activeTab === tab.id}
              aria-controls={`oytf-panel-${tab.id}`}
              tabIndex={activeTab === tab.id ? 0 : -1}
              className="oytf-form-tab"
              onClick={() => setActiveTab(tab.id)}
              onKeyDown={(event) => handleTabKeyDown(event, index)}
            >
              <span>
                {tab.index} / {tab.tabLabel}
              </span>
              <span aria-hidden="true">
                {activeTab === tab.id ? "●" : "○"}
              </span>
            </button>
          ))}
        </div>

        {tabs.map((tab) => (
          <div
            key={tab.id}
            id={`oytf-panel-${tab.id}`}
            role="tabpanel"
            aria-labelledby={`oytf-tab-${tab.id}`}
            hidden={activeTab !== tab.id}
            className="oytf-form-panel"
          >
            <div className="oytf-form-head">
              <div>
                <span className="oytf-form-eyebrow">
                  {tab.index} / {tab.tabLabel}
                </span>
                <h3>{tab.title}</h3>
                <p>{tab.description}</p>
              </div>
              <span className="oytf-form-badge">Application form</span>
            </div>

            <form onSubmit={(event) => handleSubmit(event, tab)}>
              <div className="oytf-form-grid">
                {tab.fields.map((field) => (
                  <FormField
                    key={field.name}
                    field={field}
                    idPrefix={tab.id}
                  />
                ))}
              </div>

              <div className="oytf-form-foot">
                <p className="oytf-form-note">
                  Submitting opens your email app with your details filled in.
                  You can also email{" "}
                  <a href="mailto:ogboryouthtechfest@gmail.com">
                    ogboryouthtechfest@gmail.com
                  </a>{" "}
                  directly. Fields marked <span aria-hidden="true">*</span> are
                  required.
                </p>
                <button type="submit" className="oytf-button">
                  {tab.submitLabel} <span aria-hidden="true">↗</span>
                </button>
              </div>

              {status[tab.id] ? (
                <p className="oytf-form-status" role="status">
                  {status[tab.id]}
                </p>
              ) : null}
            </form>
          </div>
        ))}
      </div>
    </section>
  );
}
