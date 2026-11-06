import Link from "next/link";
import SectionKicker from "./SectionKicker";

const GOOGLE_FORMS = {
  attend: "https://forms.gle/3RqAGVhxS6Vzsg2Z6",
  volunteer: "https://forms.gle/6sgZ4orcfiC254oFA",
  exhibit: "https://forms.gle/F4cdQV1ChMa9Czj68",
} as const;

type InvolvementId = keyof typeof GOOGLE_FORMS;

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

export default function GetInvolved() {
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
          a place for you at Ogbor Youth Tech Fest 2026. Registration forms are
          now open on Google Forms.
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

            <a
              href={GOOGLE_FORMS[card.id]}
              target="_blank"
              rel="noopener noreferrer"
              className="oytf-button oytf-card-button"
            >
              {card.cta} <span aria-hidden="true">↗</span>
            </a>
          </article>
        ))}
      </div>

      <div className="oytf-form-shell hidden" id="involvement-forms">
        <div className="oytf-form-head">
          <div>
            <span className="oytf-form-eyebrow">Registration forms</span>
            <h3>Quick links</h3>
            <p>
              Use the buttons above to open the Google Forms, or visit the full
              registration page.
            </p>
          </div>
          <Link href="/register" className="oytf-button oytf-button--outline">
            Open registration page <span aria-hidden="true">↗</span>
          </Link>
        </div>
        <div className="oytf-partner-actions" style={{ marginTop: 16 }}>
          <a className="oytf-button oytf-button--outline" href={GOOGLE_FORMS.attend} target="_blank" rel="noopener noreferrer">Attend form <span aria-hidden="true">↗</span></a>
          <a className="oytf-button oytf-button--outline" href={GOOGLE_FORMS.volunteer} target="_blank" rel="noopener noreferrer">Volunteer form <span aria-hidden="true">↗</span></a>
          <a className="oytf-button oytf-button--outline" href={GOOGLE_FORMS.exhibit} target="_blank" rel="noopener noreferrer">Exhibitor form <span aria-hidden="true">↗</span></a>
        </div>
      </div>
    </section>
  );
}

