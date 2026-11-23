import Link from "next/link";
import SectionKicker from "./SectionKicker";

const REGISTRATION_LINKS = {
  attend: "/register/attend",
  volunteer: "https://forms.gle/6sgZ4orcfiC254oFA",
  exhibit: "https://forms.gle/F4cdQV1ChMa9Czj68",
} as const;

type InvolvementId = keyof typeof REGISTRATION_LINKS;

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

const CARD_BUTTON =
  "mt-auto inline-flex w-full items-center justify-between gap-4 border border-black bg-black px-[19px] py-[15px] font-rounded text-[10px] font-extrabold uppercase leading-none tracking-[0.03em] text-white! transition-colors duration-200 hover:bg-white hover:text-black! focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black";

const OUTLINE_LINK =
  "inline-flex items-center justify-center gap-4 border border-black bg-transparent px-4 py-3 font-rounded text-[9px] font-extrabold uppercase leading-none tracking-[0.03em] text-black transition-colors duration-200 hover:bg-black hover:text-white! focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black";

export default function GetInvolved() {
  return (
    <section
      id="get-involved"
      className="border-y border-black bg-brand-sun px-[5%] py-[88px] text-brand-ink"
    >
      <div className="mx-auto w-full max-w-[1120px]">
        <div className="[&>div]:border-black/20 [&>div]:text-black/65">
          <SectionKicker
            index="05"
            label="GET INVOLVED"
            right="THREE WAYS TO BE PART OF IT"
          />
        </div>

        <div className="mb-10 mt-10 flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <h2 className="font-hero text-[clamp(42px,6vw,76px)] font-black uppercase leading-[0.86] tracking-[-0.085em] text-brand-ink">
            YOUR ROLE,
            <br />
            <span className="text-brand-forest">YOUR WAY.</span>
          </h2>
          <p className="mb-1 max-w-[360px] text-[13px] leading-[1.7] text-black/65">
            Whether you want to learn, contribute or showcase your work, there
            is a place for you at Ogbor Youth Tech Fest 2026. Attendee
            registration is now open on this site.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
          {cards.map((card) => (
            <article
              key={card.id}
              className="relative flex min-h-[380px] flex-col border border-black bg-white p-6 text-brand-ink shadow-[8px_8px_0_#000]"
            >
              <div className="flex items-start justify-between gap-5">
                <span className="text-[8px] font-black tracking-[0.12em] text-black/60">
                  {card.index}
                </span>
                <span
                  className="text-3xl leading-[0.8] text-brand-forest"
                  aria-hidden="true"
                >
                  {card.icon}
                </span>
              </div>

              <h3 className="mb-3 mt-12 max-w-[280px] font-hero text-[clamp(28px,3vw,36px)] font-black uppercase leading-[0.90] tracking-[-0.075em]">
                {card.title}
              </h3>
              <p className="max-w-[280px] text-xs leading-[1.7] text-black/65">
                {card.body}
              </p>

              <ul className="mb-[26px] mt-5 flex list-none flex-col p-0">
                {card.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="flex items-center gap-2.5 border-t border-black/15 py-2 text-[10.5px] font-bold leading-[1.3] text-black/75"
                  >
                    <span
                      className="text-lg leading-none text-brand-forest"
                      aria-hidden="true"
                    >
                      ·
                    </span>
                    {highlight}
                  </li>
                ))}
              </ul>

              {REGISTRATION_LINKS[card.id].startsWith("/") ? (
                <Link
                  href={REGISTRATION_LINKS[card.id]}
                  className={CARD_BUTTON}
                >
                  {card.cta} <span aria-hidden="true">↗</span>
                </Link>
              ) : (
                <a
                  href={REGISTRATION_LINKS[card.id]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={CARD_BUTTON}
                >
                  {card.cta} <span aria-hidden="true">↗</span>
                </a>
              )}
            </article>
          ))}
        </div>

        <div
          className="mt-12 hidden border-2 border-black bg-white p-6 text-brand-ink shadow-[8px_8px_0_#000]"
          id="involvement-forms"
        >
          <div className="mb-7 flex flex-col items-start justify-between gap-6 xl:flex-row">
            <div>
              <span className="mb-2.5 block text-[8px] font-black uppercase tracking-[0.12em] text-black/60">
                Registration forms
              </span>
              <h3 className="mb-2 text-[clamp(26px,3vw,38px)] font-black uppercase leading-[0.9] tracking-[-0.075em]">
                Quick links
              </h3>
              <p className="max-w-[620px] text-xs leading-[1.7] text-black/65">
                Use the buttons above to apply, or visit the full registration
                page.
              </p>
            </div>
            <Link href="/register" className={OUTLINE_LINK}>
              Open registration page <span aria-hidden="true">↗</span>
            </Link>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link href={REGISTRATION_LINKS.attend} className={OUTLINE_LINK}>
              Attend form <span aria-hidden="true">↗</span>
            </Link>
            <a
              href={REGISTRATION_LINKS.volunteer}
              target="_blank"
              rel="noopener noreferrer"
              className={OUTLINE_LINK}
            >
              Volunteer form <span aria-hidden="true">↗</span>
            </a>
            <a
              href={REGISTRATION_LINKS.exhibit}
              target="_blank"
              rel="noopener noreferrer"
              className={OUTLINE_LINK}
            >
              Exhibitor form <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
