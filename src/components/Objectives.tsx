"use client";

import SectionKicker from "./landing/SectionKicker";

const objectives = [
  {
    n: "01",
    title: "Digital Empowerment",
    body: "Expose young people to relevant digital skills and emerging technologies.",
    icon: "⌘",
  },
  {
    n: "02",
    title: "Innovation & Creativity",
    body: "Encourage young minds to develop solutions to real-world challenges.",
    icon: "✳",
  },
  {
    n: "03",
    title: "Entrepreneurship",
    body: "Connect digital knowledge with business creation and economic opportunities.",
    icon: "↗",
  },
  {
    n: "04",
    title: "Networking & Opportunities",
    body: "Connect participants with mentors, organisations, employers and industry professionals.",
    icon: "◎",
  },
];

export default function Objectives() {
  return (
    <section className="bg-[#f5f3eb] px-[5%] py-[88px] text-brand-ink">
      <div className="mx-auto w-full max-w-[1120px]">
        <SectionKicker
          index="02"
          label="THE MISSION"
          right="FOUR WAYS WE MOVE FORWARD"
        />

        {/* Section title */}
        <h2 className="font-hero text-[clamp(42px,6vw,76px)] font-black uppercase leading-[0.86] tracking-[-0.085em] mb-10 text-balance">
          POTENTIAL, <span className="text-brand-muted">UNLOCKED.</span>
        </h2>

        {/* Objectives grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {objectives.map((item) => (
            <article
              key={item.n}
              className="relative flex flex-col min-h-[240px] border border-black bg-white p-6 text-brand-ink shadow-[8px_8px_0_#000]"
            >
              <div className="flex items-start justify-between gap-5">
                <span className="text-[8px] font-black tracking-[0.12em] text-black/60">
                  0{item.n}
                </span>
                <span
                  className="text-3xl leading-[0.8] text-brand-forest"
                  aria-hidden="true"
                >
                  {item.icon}
                </span>
              </div>
              <h3 className="mb-3 mt-8 font-hero text-[clamp(22px,2.5vw,28px)] font-black uppercase leading-[0.86] tracking-[-0.05em]">
                {item.title}
              </h3>
              <p className="text-xs leading-[1.7] text-black/65">
                {item.body}
              </p>
            </article>
          ))}
        </div>

        {/* Audience */}
        <div className="pt-6 border-t border-black/15">
          <span className="text-[8px] font-black uppercase tracking-[0.12em] text-black/60 block mb-2">
            YOU&apos;RE IN THE RIGHT ROOM IF YOU&apos;RE A...
          </span>
          <p className="text-sm font-bold text-black">
            Student <span className="text-brand-forest not-italic mx-2">·</span> Graduate{" "}
            <span className="text-brand-forest not-italic mx-2">·</span> Corps member{" "}
            <span className="text-brand-forest not-italic mx-2">·</span> Founder{" "}
            <span className="text-brand-forest not-italic mx-2">·</span> Freelancer{" "}
            <span className="text-brand-forest not-italic mx-2">·</span> Curious mind
          </p>
        </div>
      </div>
    </section>
  );
}
