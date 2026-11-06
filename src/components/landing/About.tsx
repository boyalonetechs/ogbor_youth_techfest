import SectionKicker from "./SectionKicker";
import { attendeeRoles } from "./content";

export default function About() {
  return (
    <section
      className="bg-[color-mix(in_srgb,var(--hero-green,#00592D)_10%,white)] px-[5%] py-[88px] text-[#050B06] lg:px-[max(5%,calc((100%-1120px)/2))]"
      id="about"
    >
      <SectionKicker
        index="01"
        label="ABOUT THE EVENT"
        right="AN INITIATIVE BY DP HUB & TECH BY LEADPATH"
      />

      <div className="grid gap-10 pt-11 lg:grid-cols-[1.15fr_0.85fr] lg:gap-[8%]">
        <h2 className="font-hero text-[clamp(42px,6vw,76px)] font-[950] leading-[0.86] tracking-[-0.085em] text-balance uppercase">
          MORE THAN
          <br />A TECH <span className="text-[#989c8b]">EVENT.</span>
        </h2>

        <div className="max-w-[460px] pt-1">
          <p className="mb-5 text-[19px] font-extrabold leading-[1.25] tracking-[-0.04em]">
            The future is evolving, and opportunities are expanding.
          </p>
          <p className="my-3.5 text-[13px] leading-[1.8] text-[#62645c]">
            Ogbor Youth Tech Fest is a youth-focused technology, innovation and
            empowerment initiative organised by DP Hub &amp; Tech by Leadpath.
            We are here to bridge the gap between youthful potential and the
            opportunities available in the digital economy.
          </p>
          <p className="my-3.5 text-[13px] leading-[1.8] text-[#62645c]">
            Through insightful conversations, practical demonstrations,
            expert-led sessions, networking and exhibitions, participants will
            gain exposure to emerging technologies, digital skills,
            entrepreneurship and innovative ways of solving real-world
            problems.
          </p>
          <p className="my-3.5 text-[13px] leading-[1.8] text-[#62645c]">
            Our goal is to inspire young people to move beyond consuming
            technology to creating value, building solutions and exploring
            opportunities locally and globally.
          </p>
          <a
            className="mt-3 inline-flex items-center gap-2 text-[9px] font-extrabold uppercase tracking-[0.09em] transition-colors hover:text-[var(--hero-green,#00592D)]"
            href="#programme"
          >
            EXPLORE THE PROGRAMME <span aria-hidden="true">↓</span>
          </a>
        </div>
      </div>

      <div className="mt-11 grid gap-6 border-t border-[rgba(5,11,6,0.18)] pt-[18px] md:grid-cols-[0.8fr_1.6fr] md:gap-[30px]">
        <span className="text-[8px] font-extrabold uppercase tracking-[0.11em] text-[#717269]">
          WHO SHOULD ATTEND?
        </span>
        <div className="flex flex-wrap gap-[7px]">
          {attendeeRoles.map((role) => (
            <span
              className="rounded-full border border-[rgba(5,11,6,0.18)] px-[11px] py-2 text-[10px] font-bold leading-none text-[#4f5147]"
              key={role}
            >
              {role}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
