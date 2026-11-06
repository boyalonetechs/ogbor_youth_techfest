"use client";

export default function About() {
  return (
    <section id="about" className="py-20 md:py-32 px-6 md:px-12 lg:px-20 bg-[#f5f3eb]">
      <div className="max-w-7xl mx-auto">
        {/* Section kicker */}
        <div className="flex items-center justify-between gap-4 mb-6 pb-4 border-b border-[#171912]/18">
          <span className="text-xs font-extrabold tracking-[0.13em] uppercase text-[#66685f]">
            01 / THE WHY
          </span>
          <span className="text-xs font-extrabold tracking-[0.13em] uppercase text-[#66685f]">
            AN INITIATIVE BY DP HUB & TECH BY LEADPATH
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-8 lg:gap-[8%] pt-10">
          {/* Left: Headline */}
          <div>
            <h2 className="font-[950] leading-[0.86] tracking-[-0.085em] text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
              MORE THAN
              <br />
              A TECH <span className="text-[#989c8b]">EVENT.</span>
            </h2>
          </div>

          {/* Right: Copy */}
          <div className="pt-2 max-w-[390px]">
            <p className="text-2xl font-extrabold leading-[1.25] tracking-[-0.04em] mb-5">
              A room full of possibility. A community ready to make things happen.
            </p>
            <p className="text-sm leading-[1.8] text-[#62645c] mb-4">
              Ogbor Youth Tech Fest is a youth-focused technology, innovation and empowerment initiative. We're here to bridge the gap between youthful potential and the opportunities of the digital economy.
            </p>
            <p className="text-sm leading-[1.8] text-[#62645c] mb-6">
              Through practical demonstrations, expert-led conversations and new connections, we want young people to move beyond consuming technology—to creating value with it.
            </p>
            <a
              href="#programme"
              className="inline-block text-xs font-extrabold uppercase tracking-[0.09em] text-[#171912] hover:text-[#005536] transition-colors"
            >
              WHAT WE'RE BUILDING <span className="text-xl ml-2">↓</span>
            </a>
          </div>
        </div>

        {/* Who should attend */}
        <div className="mt-16 pt-8 border-t border-[#171912]/18">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-2">
              <h3 className="text-xs font-extrabold tracking-[0.11em] uppercase text-[#717269]">WHO SHOULD ATTEND</h3>
              <ul className="space-y-1.5 text-sm font-medium text-[#171912]">
                <li>Secondary school students and graduates</li>
                <li>NYSC corps members</li>
                <li>Young entrepreneurs and business owners</li>
                <li>Technology enthusiasts and aspiring innovators</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="text-xs font-extrabold tracking-[0.11em] uppercase text-[#717269] hidden md:block"></h3>
              <ul className="space-y-1.5 text-sm font-medium text-[#171912]">
                <li>Freelancers and digital professionals</li>
                <li>Students and young people interested in technology</li>
                <li>SMEs seeking digital growth opportunities</li>
              </ul>
            </div>
            <div className="md:col-span-2 lg:col-span-2 space-y-2">
              <h3 className="text-xs font-extrabold tracking-[0.11em] uppercase text-[#717269]">ABOUT THE ORGANISERS</h3>
              <p className="text-sm leading-[1.8] text-[#62645c]">
                Organised by <strong>DP Hub</strong> & <strong>Tech by Leadpath</strong> — organisations committed to youth development, digital skills empowerment, and innovation in Abia State and beyond.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}