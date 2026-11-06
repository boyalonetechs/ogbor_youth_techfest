"use client";

import Image from "next/image";

export default function About() {
  return (
    <section
      id="about"
      className="relative w-full bg-[#050B06] text-white py-16 md:py-24 lg:py-32 px-6 md:px-12 lg:px-20 overflow-hidden"
    >
      <div className="relative mx-auto max-w-[1280px]">
        {/* Section Header */}
        <div className="flex items-center justify-between gap-6 border-b border-white/10 pb-5 font-rounded text-[10px] font-bold uppercase tracking-[0.28em] text-white/45 mb-12">
          <span>01 / About the Event</span>
          <span className="text-right">What is Ogbor Youth Tech Fest?</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Column - Main Content */}
          <div className="space-y-8">
            <h2 className="font-display text-[clamp(2.2rem,5vw,4rem)] font-bold uppercase leading-[0.92] tracking-[-0.04em]">
              Empowering Youths,
              <br />
              <span className="text-[#00592D]">Inspiring Innovation</span>
              <br />
              and Creating Opportunities.
            </h2>

            <div className="space-y-6 text-lg leading-relaxed text-white/80 max-w-xl">
              <p>
                The future is evolving, and opportunities are expanding. Ogbor Youth
                Tech Fest 2026 is bringing together young minds, innovators,
                entrepreneurs, technology enthusiasts and industry professionals to
                explore the possibilities of the digital economy.
              </p>
              <p>
                Join us as we discover opportunities, explore emerging technologies,
                inspire innovation and equip young people with the skills and
                connections needed to thrive in a rapidly changing world.
              </p>
            </div>

            {/* Key Stats */}
            <div className="grid grid-cols-2 gap-6 pt-4 border-t border-white/10">
              <div>
                <span className="font-display text-5xl font-bold text-[#FAE01A] leading-none">1,000+</span>
                <p className="mt-1 font-rounded text-sm text-white/60">Expected Participants</p>
              </div>
              <div>
                <span className="font-display text-5xl font-bold text-[#FAE01A] leading-none">30</span>
                <p className="mt-1 font-rounded text-sm text-white/60">November 2026</p>
              </div>
            </div>
          </div>

          {/* Right Column - Visual Card */}
          <div className="relative">
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#1E1E1E] rounded-sm">
              <Image
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1200"
                alt="Young African students learning technology and coding"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center"
                onError={(e) => {
                  e.currentTarget.src = "https://placehold.co/800x1000/1E1E1E/FAE01A?text=Youth+Tech+Education";
                }}
              />
            </div>

            {/* Floating stats card */}
            <div className="absolute -bottom-6 -right-6 lg:-bottom-8 lg:-right-8 bg-white/95 backdrop-blur-sm text-[#050B06] p-5 sm:p-6 rounded-sm shadow-[0_25px_50px_-12px_rgba(0,0,0,0.4)] w-full max-w-xs">
              <h3 className="font-display text-xl font-bold text-[#00592D]">Who Should Attend</h3>
              <ul className="mt-4 space-y-2 text-sm font-rounded text-[#050B06]/80">
                <li className="flex items-center gap-2"><span className="text-[#FAE01A] font-bold">→</span> Secondary school students & graduates</li>
                <li className="flex items-center gap-2"><span className="text-[#FAE01A] font-bold">→</span> NYSC corps members</li>
                <li className="flex items-center gap-2"><span className="text-[#FAE01A] font-bold">→</span> Young entrepreneurs & business owners</li>
                <li className="flex items-center gap-2"><span className="text-[#FAE01A] font-bold">→</span> Technology enthusiasts & aspiring innovators</li>
                <li className="flex items-center gap-2"><span className="text-[#FAE01A] font-bold">→</span> Freelancers & digital professionals</li>
                <li className="flex items-center gap-2"><span className="text-[#FAE01A] font-bold">→</span> SMEs seeking digital growth</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Organisers Info */}
        <div className="mt-16 pt-12 border-t border-white/10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-[#FAE01A] flex items-center justify-center flex-shrink-0">
              <span className="font-display text-2xl font-bold text-[#050B06]">DP</span>
            </div>
            <div>
              <p className="font-display text-lg font-bold text-white">Organised by DP Hub</p>
              <p className="font-rounded text-sm text-white/60">Tech by Leadpath</p>
            </div>
          </div>
          <p className="font-rounded text-base text-white/70 text-center md:text-right max-w-md">
            Bridging the gap between youthful potential and opportunities in the digital economy.
          </p>
        </div>
      </div>
    </section>
  );
}