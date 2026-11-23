import SectionKicker from "./SectionKicker";
import { objectives } from "./content";

export default function Objectives() {
  return (
    <section
      className="bg-[var(--color-brand-sun)] px-[5%] py-[88px] text-brand-ink"
      id="objectives"
    >
      <div className="mx-auto w-full max-w-[1120px]">
        <SectionKicker
          index="02"
          label="THE MISSION"
          right="FOUR WAYS WE MOVE FORWARD"
        />

        {/* Section title */}
        <h2 className="font-hero text-[clamp(42px,6vw,76px)] font-black uppercase leading-[0.86] tracking-[-0.085em] mb-10 text-balance">
          POTENTIAL, <span className="text-brand-forest">UNLOCKED.</span>
        </h2>

        {/* Objectives grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {objectives.map((item) => (
            <article
              key={item.n}
              className="relative flex flex-col min-h-[240px] overflow-hidden border border-brand-ink bg-white p-6 text-brand-ink shadow-[8px_8px_0_var(--color-brand-ink)]"
            >
              <div className="flex items-start justify-between gap-5">
                <span className="text-[8px] font-black tracking-[0.12em] text-brand-ink/60">
                  0{item.n}
                </span>
                <span
                  className="text-3xl leading-[0.8] text-brand-forest"
                  aria-hidden="true"
                >
                  {item.icon}
                </span>
              </div>
              <h3 className="mb-3 mt-8 font-hero text-[clamp(22px,2.5vw,26px)] font-black uppercase leading-[1] tracking-[-0.05em] break-words max-w-full">
                {item.title}
              </h3>
              <p className="text-xs leading-[1.7] text-brand-ink/65 break-words overflow-hidden max-w-full">
                {item.body}
              </p>
            </article>
          ))}
        </div>

        {/* Audience */}
        <div className="pt-6 border-t border-brand-ink/15">
          <span className="text-[8px] font-black uppercase tracking-[0.12em] text-brand-ink/60 block mb-2">
            YOU&apos;RE IN THE RIGHT ROOM IF YOU&apos;RE A...
          </span>
          <p className="text-sm font-bold text-brand-ink">
            Student <span className="text-brand-forest not-italic mx-2">·</span>{" "}
            Graduate{" "}
            <span className="text-brand-forest not-italic mx-2">·</span> Corps
            member <span className="text-brand-forest not-italic mx-2">·</span>{" "}
            Founder <span className="text-brand-forest not-italic mx-2">·</span>{" "}
            Freelancer{" "}
            <span className="text-brand-forest not-italic mx-2">·</span> Curious
            mind
          </p>
        </div>
      </div>
    </section>
  );
}
