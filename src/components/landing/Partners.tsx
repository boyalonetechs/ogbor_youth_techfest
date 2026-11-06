import SectionKicker from "./SectionKicker";

const partnerTypes = [
  "Corporate sponsors",
  "Technology companies",
  "Financial institutions",
  "Educational institutions",
  "Government agencies",
  "Media organisations",
  "Development organisations",
  "Individual supporters",
];

const sponsorMail =
  "mailto:ogboryouthtechfest@gmail.com?subject=Sponsorship%20enquiry%20%E2%80%94%20Ogbor%20Youth%20Tech%20Fest%202026";
const partnerMail =
  "mailto:ogboryouthtechfest@gmail.com?subject=Strategic%20partnership%20%E2%80%94%20Ogbor%20Youth%20Tech%20Fest%202026";
const proposalMail =
  "mailto:ogboryouthtechfest@gmail.com?subject=Sponsorship%20proposal%20request%20%E2%80%94%20Ogbor%20Youth%20Tech%20Fest%202026";

export default function Partners() {
  return (
    <section
      className="bg-white px-[5%] py-[88px] text-[#050B06] lg:px-[max(5%,calc((100%-1120px)/2))]"
      id="partners"
    >
      <SectionKicker
        index="06"
        label="BETTER TOGETHER"
        right="PARTNERSHIPS & SPONSORSHIP"
      />

      <div className="grid gap-12 pt-11 lg:grid-cols-[1.1fr_0.9fr] lg:items-start lg:gap-16">
        <div>
          <h2 className="font-hero text-[clamp(42px,6vw,76px)] font-[950] leading-[0.86] tracking-[-0.085em] text-balance uppercase">
            INVEST IN
            <br />
            <span className="text-[var(--hero-yellow,#FAE01A)]">
              WHAT’S NEXT.
            </span>
          </h2>

          <p className="mt-6 max-w-[560px] font-rounded text-[15px] leading-[1.8] text-[#050B06]/75">
            Ogbor Youth Tech Fest brings young people, builders and local
            businesses into the same room. If your organisation cares about
            youth, skills, or innovation in Aba, partnering with us is a
            practical way to show up and make a real difference.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              className="inline-flex items-center justify-center rounded-sm bg-[#FAE01A] px-6 py-3.5 font-rounded text-sm font-bold text-white transition-colors hover:text-white"
              href={sponsorMail}
            >
              Become a sponsor{" "}
              <span aria-hidden="true" className="ml-2">
                ↗
              </span>
            </a>
            <a
              className="inline-flex items-center justify-center rounded-sm border border-[#050B06]/20 bg-white px-6 py-3.5 font-rounded text-sm font-bold text-[#050B06] transition-colors hover:border-[var(--hero-green,#00592D)] hover:text-[var(--hero-green,#00592D)]"
              href={partnerMail}
            >
              Strategic partner
            </a>
            <a
              className="inline-flex items-center justify-center font-rounded text-sm font-bold text-[#050B06] underline decoration-[#050B06]/25 underline-offset-4 transition-colors hover:text-[var(--hero-green,#00592D)]"
              href={proposalMail}
            >
              Request proposal
            </a>
          </div>
        </div>

        <div className="border-t border-[#050B06]/15 pt-6 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-10">
          <p className="font-rounded text-[11px] font-extrabold uppercase tracking-[0.12em] text-[#050B06]/55">
            Who we&apos;d love to work with
          </p>
          <ul className="mt-4 space-y-0">
            {partnerTypes.map((type) => (
              <li
                key={type}
                className="border-b border-[#050B06]/10 py-3 font-rounded text-[15px] text-[#050B06]/80"
              >
                {type}
              </li>
            ))}
          </ul>

          <div className="mt-8 bg-[var(--hero-yellow,#FAE01A)] p-5">
            <p className="font-rounded text-[11px] font-extrabold uppercase tracking-[0.1em] text-[#050B06]">
              Sponsors &amp; strategic partners
            </p>
            <p className="mt-2 font-rounded text-sm leading-[1.7] text-[#050B06]/75">
              Confirmed partners will be featured here once announced. We only
              list organisations that are officially on board.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
