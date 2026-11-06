"use client";

export default function Partners() {
  return (
    <section id="partners" className="py-20 md:py-32 px-6 md:px-12 lg:px-20 bg-[#e6e6dd]">
      <div className="max-w-7xl mx-auto">
        {/* Section kicker */}
        <div className="flex items-center justify-between gap-4 mb-10 pb-4 border-b border-[#171912]/18">
          <span className="text-xs font-extrabold tracking-[0.13em] uppercase text-[#66685f]">
            06 / BETTER TOGETHER
          </span>
          <span className="text-xs font-extrabold tracking-[0.13em] uppercase text-[#66685f]">
            PARTNERSHIPS & SPONSORSHIP
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-[10%] pt-10">
          {/* Left column */}
          <div>
            <h2 className="font-[950] leading-[0.86] tracking-[-0.085em] text-4xl md:text-5xl lg:text-6xl xl:text-7xl mb-6">
              INVEST IN
              <br />
              <span className="text-[#989c8b]">WHAT'S NEXT.</span>
            </h2>
            <p className="text-sm leading-[1.7] text-[#65675e] max-w-[300px] mb-8">
              Help connect young people with the skills, tools and opportunities to thrive in the digital economy.
            </p>
            <a
              href="mailto:ogboryouthtechfest@gmail.com?subject=Partner%20with%20Ogbor%20Youth%20Tech%20Fest"
              className="inline-flex items-center gap-2 bg-[#171912] text-white px-6 py-3 text-xs font-extrabold uppercase tracking-[0.03em] hover:bg-[#46483d] transition-colors"
            >
              Partner with us <span aria-hidden="true">↗</span>
            </a>
          </div>

          {/* Right column */}
          <div className="flex items-center gap-8 lg:gap-12">
            {/* Partner orbit */}
            <div className="flex-none relative w-40 h-40 md:w-52 md:h-52 lg:w-64 lg:h-64 rounded-full border border-[#a6aa9d] flex items-center justify-center text-center">
              <div className="absolute inset-4 border border-[#a6aa9d] rounded-full transform rotate-45 scale-x-[0.48]" />
              <div className="absolute inset-4 border border-[#a6aa9d] rounded-full transform -rotate-45 scale-x-[0.48]" />
              <div className="relative z-10">
                <span className="text-4xl md:text-5xl text-[#005536] block">✳</span>
                <i className="not-italic text-xs font-extrabold leading-[1.3] uppercase block mt-2">
                  OGBOR<br />YOUTH TECH<br />FEST 2026
                </i>
              </div>
            </div>

            {/* Partner copy */}
            <div>
              <span className="text-xs font-extrabold tracking-[0.08em] uppercase text-[#171912] block mb-3">
                LET'S BUILD SOMETHING THAT LASTS
              </span>
              <p className="text-sm leading-[1.6] text-[#696b62] mb-6">
                We welcome organisations, businesses and individuals who believe in the potential of young people.
              </p>
              <div className="border-t border-[#171912]/18 pt-4">
                <div className="text-xs font-extrabold tracking-[0.08em] uppercase text-[#171912] mb-2">
                  SPONSORS & STRATEGIC PARTNERS
                </div>
                <small className="text-sm text-[#77796f] font-normal tracking-normal block">
                  Confirmed partners will be featured here.
                </small>
              </div>

              {/* Partner CTAs */}
              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="mailto:ogboryouthtechfest@gmail.com?subject=Become%20a%20Sponsor"
                  className="px-5 py-2.5 bg-[#171912] text-white text-xs font-extrabold uppercase tracking-[0.06em] rounded-full hover:bg-[#46483d] transition-colors"
                >
                  Become a Sponsor
                </a>
                <a
                  href="mailto:ogboryouthtechfest@gmail.com?subject=Strategic%20Partnership"
                  className="px-5 py-2.5 border border-[#171912]/18 text-[#171912] text-xs font-extrabold uppercase tracking-[0.06em] rounded-full hover:bg-[#e9e8df] transition-colors"
                >
                  Become a Strategic Partner
                </a>
                <a
                  href="#"
                  className="px-5 py-2.5 border border-[#171912]/18 text-[#171912] text-xs font-extrabold uppercase tracking-[0.06em] rounded-full hover:bg-[#e9e8df] transition-colors"
                >
                  Download Sponsorship Proposal
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}