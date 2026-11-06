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
      className="bg-[color-mix(in_srgb,var(--hero-green,#00592D)_8%,white)] px-[5%] py-[88px] text-[#050B06] lg:px-[max(5%,calc((100%-1120px)/2))]"
      id="partners"
    >
      <SectionKicker
        index="06"
        label="BETTER TOGETHER"
        right="PARTNERSHIPS & SPONSORSHIP"
      />

      <div className="grid gap-10 pt-11 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
        <div className="rounded-[28px] border border-[rgba(5,11,6,0.12)] bg-white/70 p-7 shadow-[0_20px_60px_rgba(5,11,6,0.06)] backdrop-blur-sm md:p-9">
          <span className="inline-flex rounded-full bg-[#050B06] px-3 py-1.5 text-[9px] font-extrabold uppercase tracking-[0.12em] text-[var(--hero-yellow,#FAE01A)]">
            Partnership opportunity
          </span>

          <h2 className="mt-5 font-hero text-[clamp(42px,6vw,72px)] font-[950] leading-[0.86] tracking-[-0.085em] text-balance uppercase">
            INVEST IN
            <br />
            <span className="text-[var(--hero-green,#00592D)]">
              WHAT’S NEXT.
            </span>
          </h2>

          <p className="mt-5 max-w-[520px] text-sm leading-[1.8] text-[#5f6159] md:text-[15px]">
            Partner with Ogbor Youth Tech Fest to support youth development and
            connect your brand with emerging talent, entrepreneurs and the next
            generation of innovators in Aba.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              className="inline-flex items-center justify-center rounded-sm bg-[#050B06] px-5 py-3.5 text-[10px] font-extrabold uppercase tracking-[0.06em] text-white transition-colors hover:bg-[var(--hero-green,#00592D)]"
              href={sponsorMail}
            >
              Become a sponsor <span aria-hidden="true" className="ml-2">↗</span>
            </a>
            <a
              className="inline-flex items-center justify-center rounded-sm border border-[rgba(5,11,6,0.18)] bg-white px-5 py-3.5 text-[10px] font-extrabold uppercase tracking-[0.06em] text-[#050B06] transition-colors hover:border-[var(--hero-green,#00592D)] hover:text-[var(--hero-green,#00592D)]"
              href={partnerMail}
            >
              Strategic partner <span aria-hidden="true" className="ml-2">↗</span>
            </a>
            <a
              className="inline-flex items-center justify-center rounded-sm border border-[rgba(5,11,6,0.18)] bg-transparent px-5 py-3.5 text-[10px] font-extrabold uppercase tracking-[0.06em] text-[#050B06] transition-colors hover:border-[var(--hero-green,#00592D)] hover:text-[var(--hero-green,#00592D)]"
              href={proposalMail}
            >
              Request proposal <span aria-hidden="true" className="ml-2">↗</span>
            </a>
          </div>

          <ul className="mt-8 flex flex-wrap gap-2" aria-label="Who we welcome">
            {partnerTypes.map((type) => (
              <li
                key={type}
                className="rounded-full border border-[rgba(5,11,6,0.12)] bg-[color-mix(in_srgb,var(--hero-yellow,#FAE01A)_18%,white)] px-3 py-2 text-[10px] font-bold text-[#4f5147]"
              >
                {type}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col justify-between gap-6">
          <div className="relative overflow-hidden rounded-[28px] border border-[rgba(5,11,6,0.12)] bg-[#050B06] p-8 text-white shadow-[0_20px_60px_rgba(5,11,6,0.12)]">
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(250,224,26,0.28),transparent_42%),radial-gradient(circle_at_bottom_left,rgba(0,89,45,0.45),transparent_45%)]"
            />
            <div className="relative flex items-start justify-between gap-6">
              <div
                className="relative flex h-36 w-36 shrink-0 items-center justify-center rounded-full border border-white/20 text-center md:h-44 md:w-44"
                aria-hidden="true"
              >
                <div className="absolute inset-4 rounded-full border border-white/15 [transform:rotate(45deg)_scaleX(0.48)]" />
                <div className="absolute inset-4 rounded-full border border-white/15 [transform:rotate(-45deg)_scaleX(0.48)]" />
                <div className="relative z-10">
                  <span className="block text-4xl text-[var(--hero-yellow,#FAE01A)] md:text-5xl">✳</span>
                  <i className="mt-2 block text-[10px] font-extrabold not-italic uppercase leading-[1.3] tracking-[0.06em]">
                    OGBOR
                    <br />
                    YOUTH TECH
                    <br />
                    FEST 2026
                  </i>
                </div>
              </div>
              <div className="pt-2">
                <span className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-white/65">
                  Why partner
                </span>
                <p className="mt-3 max-w-[280px] text-sm leading-[1.7] text-white/80">
                  Put your organisation in the room with young builders, future
                  customers and local innovation leaders.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-[28px] border border-[rgba(5,11,6,0.12)] bg-white p-7">
            <span className="block text-[9px] font-extrabold uppercase tracking-[0.12em] text-[#050B06]">
              LET’S BUILD SOMETHING THAT LASTS
            </span>
            <p className="mt-3 text-sm leading-[1.7] text-[#696b62]">
              We welcome organisations, businesses and individuals who believe in
              the potential of young people.
            </p>
            <div className="mt-6 border-t border-[rgba(5,11,6,0.12)] pt-4">
              <div className="text-[10px] font-extrabold uppercase tracking-[0.08em] text-[#050B06]">
                Sponsors &amp; strategic partners
              </div>
              <p className="mt-2 text-sm text-[#77796f]">
                Confirmed partners will be featured here. No unconfirmed
                organisation is listed.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
