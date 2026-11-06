"use client";

const experiences = [
  "Inspiring keynote presentations",
  "Panel discussions with industry professionals",
  "Artificial Intelligence demonstrations",
  "Practical digital skills exposure",
  "Technology and innovation exhibitions",
  "Business and entrepreneurship conversations",
  "Networking with industry experts and organisations",
  "Opportunities for training, mentorship and internships",
  "Innovation challenges and talent discovery",
];

export default function WhatToExpect() {
  return (
    <section id="experience" className="py-20 md:py-32 px-6 md:px-12 lg:px-20 bg-[#d7f35a]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-[11%] pt-10">
          {/* Left column */}
          <div>
            <div className="flex items-center gap-4 mb-6 pb-4 border-b border-[#00553645]">
              <span className="text-xs font-extrabold tracking-[0.13em] uppercase text-[#44483a]">
                04 / THE EXPERIENCE
              </span>
            </div>
            <h2 className="font-[950] leading-[0.86] tracking-[-0.085em] text-4xl md:text-5xl lg:text-6xl mb-6">
              COME CURIOUS.
              <br />
              <span className="text-[#005536]">LEAVE CHARGED.</span>
            </h2>
            <p className="text-sm leading-[1.7] text-[#45483b] max-w-[280px] mb-8">
              A full day of ideas, hands-on discovery and the kind of conversations that stick with you.
            </p>
            <a
              href="/register"
              className="inline-flex items-center gap-2 bg-[#171912] text-white px-6 py-3 text-xs font-extrabold tracking-[0.03em] hover:bg-[#46483d] transition-colors"
            >
              Save your spot <span aria-hidden="true">↗</span>
            </a>
          </div>

          {/* Right column */}
          <div className="border-l border-[#00553645] pl-7">
            {/* Stat */}
            <div className="flex items-center gap-4 mb-8">
              <strong className="text-5xl md:text-6xl font-[950] leading-[1] tracking-[-0.09em] text-[#171912]">
                1,000
              </strong>
              <span className="text-xs leading-[1.4] font-extrabold tracking-[0.1em] uppercase text-[#005536]">
                YOUNG PEOPLE<br />IN ONE ROOM
              </span>
            </div>

            {/* Experience list */}
            <ul className="space-y-0">
              {experiences.map((item, index) => (
                <li
                  key={index}
                  className="border-t border-[#00553645] py-3 text-sm font-bold text-[#171912] flex items-start gap-4"
                >
                  <span className="text-xs font-extrabold text-[#005536] shrink-0 mt-0.5">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <small className="block mt-4 text-xs text-[#005536]">
              Specific speakers and opportunities will be announced once confirmed.
            </small>
          </div>
        </div>
      </div>
    </section>
  );
}