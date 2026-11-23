"use client";

import SectionKicker from "./SectionKicker";
import { attendeeRoles } from "./content";
import { useEffect, useRef, useState } from "react";

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    const el = sectionRef.current;
    if (el) observer.observe(el);

    return () => observer.disconnect();
  }, []);

  const chipStyle = (index: number) =>
    inView
      ? {
          animation: `chip-fall 0.9s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards`,
          animationDelay: `${index * 0.14}s`,
        }
      : { opacity: 0, transform: "translateY(-120vh) rotate(-10deg)" };

  return (
    <section
      className="bg-[var(--color-brand-ink)] px-[3%] py-[100px] text-[var(--color-brand-paper)] lg:px-[max(3%,calc((100%-1300px)/2))]"
      id="about"
    >
      <style>
        {`
          .chip {
            opacity: 0;
            transform: translateY(-120vh) rotate(-10deg);
          }

          @keyframes chip-fall {
            0% {
              transform: translateY(-120vh) rotate(-10deg);
              opacity: 0;
            }
            65% {
              transform: translateY(12px) rotate(3deg);
              opacity: 1;
            }
            85% {
              transform: translateY(-4px) rotate(-1deg);
              opacity: 1;
            }
            100% {
              transform: translateY(0) rotate(0);
              opacity: 1;
            }
          }
        `}
      </style>
      <SectionKicker
        index="01"
        label="ABOUT THE EVENT"
        right="AN INITIATIVE BY DP HUB & TECH BY LEADPATH"
      />

      <div className="grid gap-12 pt-14 lg:grid-cols-[1fr_1fr] lg:gap-[10%]">
        <div className="flex flex-col justify-center lg:items-start">
          <h2 className="font-hero text-[clamp(46px,7vw,84px)] font-[950] leading-[0.85] tracking-[-0.085em] text-balance uppercase">
            MORE THAN
            <br />A TECH <span className="text-[var(--color-brand-sun)]">EVENT.</span>
          </h2>
        </div>

        <div className="max-w-[520px] pt-2 flex flex-col justify-center lg:ml-auto lg:mr-0">
          <p className="mb-6 text-[21px] font-extrabold leading-[1.25] tracking-[-0.04em]">
            The future is evolving, and opportunities are expanding.
          </p>
          <p className="my-4 text-[15px] leading-[1.85] text-[var(--color-brand-paper)]/85">
            Ogbor Youth Tech Fest is a youth-focused technology, innovation and
            empowerment initiative organised by DP Hub &amp; Tech by Leadpath.
            We are here to bridge the gap between youthful potential and the
            opportunities available in the digital economy.
          </p>
          <p className="my-4 text-[15px] leading-[1.85] text-[var(--color-brand-paper)]/85">
            Through insightful conversations, practical demonstrations,
            expert-led sessions, networking and exhibitions, participants will
            gain exposure to emerging technologies, digital skills,
            entrepreneurship and innovative ways of solving real-world
            problems.
          </p>
          <p className="my-4 text-[15px] leading-[1.85] text-[var(--color-brand-paper)]/85">
            Our goal is to inspire young people to move beyond consuming
            technology to creating value, building solutions and exploring
            opportunities locally and globally.
          </p>
          <a
            className="mt-6 inline-flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.1em] transition-colors hover:text-[var(--color-brand-sun)]"
            href="#programme"
          >
            EXPLORE THE PROGRAMME <span aria-hidden="true">↓</span>
          </a>
        </div>
      </div>

      <div ref={sectionRef} className="mt-20 pt-12 border-t border-[var(--oytf-line)]/30">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-[10px] font-extrabold uppercase tracking-[0.15em] text-[var(--color-brand-sun)] block mb-8">
            WHO SHOULD ATTEND?
          </span>
          <div className="flex flex-wrap justify-center gap-[10px]">
            {attendeeRoles.map((role, index) => (
              <span
                className="chip rounded-full border border-[var(--oytf-line)] px-[16px] py-4 text-[14px] font-extrabold leading-none text-[var(--color-brand-paper)] uppercase tracking-[0.05em] transition-all duration-300 hover:bg-[var(--color-brand-sun)] hover:text-[var(--color-brand-ink)] hover:border-[var(--color-brand-sun)] hover:border-2 hover:scale-105 group"
                key={role}
                style={chipStyle(index)}
              >
                {role}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
