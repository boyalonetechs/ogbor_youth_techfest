"use client";

import Image from "next/image";

const panels = [
  {
    n: "01",
    title: "Digital Marketing as a Growth Engine for SMEs",
    subtitle: "Leveraging Digital Platforms to Build Brands, Reach Customers and Drive Business Growth",
    points: [
      "Digital marketing strategies for small businesses",
      "Social media, content creation and brand positioning",
      "Customer acquisition and online sales",
      "AI tools for business marketing and productivity",
    ],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000",
    alt: "Digital marketing strategy session",
    accent: "border-[#FAE01A]",
    bgGradient: "from-[#050B06] via-[#0A1A0F] to-[#050B06]",
  },
  {
    n: "02",
    title: "Unlocking Opportunities in the Digital Economy",
    subtitle: "From Digital Skills to Income, Careers and Global Opportunities",
    points: [
      "Emerging opportunities in the digital space",
      "Remote work, freelancing and digital entrepreneurship",
      "Building relevant skills for the future",
      "Accessing local and global opportunities",
    ],
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1000",
    alt: "Remote work and digital economy opportunities",
    accent: "border-[#00592D]",
    bgGradient: "from-[#050B06] via-[#06160B] to-[#050B06]",
  },
  {
    n: "03",
    title: "Building the Nexus Between Youth and Innovation",
    subtitle: "Harnessing Youthful Energy, Creativity and Technology to Solve Real-World Problems",
    points: [
      "Youth participation in innovation",
      "Transforming ideas into practical solutions",
      "AI and emerging technologies",
      "Building sustainable and scalable innovations",
    ],
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=1000",
    alt: "Youth innovation and technology collaboration",
    accent: "border-[#FAE01A]",
    bgGradient: "from-[#050B06] via-[#1A1604] to-[#050B06]",
  },
];

function TargetIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      aria-hidden="true"
    >
      <circle cx="16" cy="16" r="13" />
      <circle cx="16" cy="16" r="3.5" fill="currentColor" />
    </svg>
  );
}

function PanelCard({ panel, index }: { panel: typeof panels[0]; index: number }) {
  const isEven = index % 2 === 0;

  return (
    <section
      id={`panel-${panel.n}`}
      className={`relative w-full ${panel.bgGradient} py-16 md:py-24 lg:py-32 px-6 md:px-12 lg:px-20 ${index > 0 ? 'border-t border-white/5' : ''}`}
    >
      <div className="relative mx-auto max-w-[1280px]">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center ${isEven ? '' : 'lg:grid-flow-dense'}`}>

          {/* Visual Column */}
          <div className={`relative ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
            <div className="relative w-full max-w-[520px] mx-auto lg:mx-0">
              <div className={`relative aspect-[4/5] w-full overflow-hidden bg-[#1E1E1E] rounded-sm border-2 ${panel.accent} shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)]`}>
                <Image
                  src={panel.image}
                  alt={panel.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 520px"
                  className="object-cover object-center transition-transform duration-700 ease-out hover:scale-[1.02]"
                  onError={(e) => {
                    e.currentTarget.src = `https://placehold.co/800x1000/1E1E1E/FFFFFF?text=Panel+${panel.n}`;
                  }}
                />
              </div>
              {/* Panel badge */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-[#050B06] border border-white/10 px-4 py-2 rounded-full font-rounded text-[10px] font-bold uppercase tracking-[0.22em] text-white/70">
                <span>Main Stage</span>
                <span className="text-[#FAE01A]">{panel.n} / 03</span>
              </div>
            </div>
          </div>

          {/* Content Column */}
          <div className={`flex flex-col justify-center ${isEven ? 'lg:order-1 lg:pr-8 text-right' : 'lg:order-2 lg:pl-8 text-left'}`}>
            {/* Section Number with Target Icon */}
            <div className={`flex items-center gap-2 mb-3 ${isEven ? 'justify-end' : ''}`}>
              <TargetIcon className="w-9 h-9 text-[#FAE01A]" />
              <span className="text-5xl sm:text-6xl font-extrabold tracking-tight text-[#FAE01A] leading-none font-display">
                {panel.n}
              </span>
            </div>

            {/* Panel Title */}
            <h3 className="font-display text-[clamp(1.8rem,3.5vw,3rem)] font-bold uppercase leading-[1.05] tracking-[-0.03em] text-white mb-3 max-w-xl mx-auto">
              {panel.title}
            </h3>

            {/* Panel Subtitle */}
            <p className="font-rounded text-lg sm:text-xl text-white/70 leading-relaxed max-w-xl mx-auto mb-8">
              {panel.subtitle}
            </p>

            {/* Divider */}
            <div className={`w-full h-[1px] bg-white/10 my-8 ${isEven ? 'ml-auto' : ''}`} />

            {/* Key Discussion Areas */}
            <ul className="space-y-4 text-lg sm:text-xl font-normal text-white/90 leading-snug">
              {panel.points.map((point, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="select-none text-[#FAE01A] font-mono text-lg leading-6 shrink-0">—</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Programme() {
  return (
    <>
      {/* Programme Header Section */}
      <section
        id="programme"
        className="relative w-full bg-[#050B06] text-white py-16 md:py-24 lg:py-32 px-6 md:px-12 lg:px-20 overflow-hidden"
      >
        <div className="relative mx-auto max-w-[1280px]">
          <div className="flex items-center justify-between gap-6 border-b border-white/10 pb-5 font-rounded text-[10px] font-bold uppercase tracking-[0.28em] text-white/45 mb-12">
            <span>02 / Programme</span>
            <span className="text-right">Conversations that move us</span>
          </div>

          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-end">
            <h2 className="font-display text-[clamp(2.2rem,5.5vw,4.5rem)] font-bold uppercase leading-[0.92] tracking-[-0.04em]">
              Big questions.
              <br />
              <span className="text-[#00592D]">Real possibilities.</span>
            </h2>
            <p className="max-w-xs font-rounded text-base leading-relaxed text-white/55 lg:pb-2">
              Three conversations about what's next — and how we can build
              it together.
            </p>
          </div>
        </div>
      </section>

      {/* Three Panel Sessions */}
      {panels.map((panel, index) => (
        <PanelCard key={panel.n} panel={panel} index={index} />
      ))}

      {/* What to Expect Section */}
      <section
        id="what-to-expect"
        className="relative w-full bg-[#050B06] text-white py-16 md:py-24 lg:py-32 px-6 md:px-12 lg:px-20 overflow-hidden"
      >
        <div className="relative mx-auto max-w-[1280px]">
          <div className="flex items-center justify-between gap-6 border-b border-white/10 pb-5 font-rounded text-[10px] font-bold uppercase tracking-[0.28em] text-white/45 mb-12">
            <span>03 / Experience</span>
            <span className="text-right">What to expect</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "Inspiring keynote presentations",
              "Panel discussions with industry professionals",
              "Artificial Intelligence demonstrations",
              "Practical digital skills exposure",
              "Technology and innovation exhibitions",
              "Business and entrepreneurship conversations",
              "Networking with industry experts and organisations",
              "Opportunities for training, mentorship and internships",
              "Innovation challenges and talent discovery",
            ].map((item, i) => (
              <div
                key={i}
                className="group relative p-6 bg-white/5 border border-white/5 rounded-sm hover:border-[#FAE01A]/50 hover:bg-white/10 transition-all duration-300"
              >
                <div className="flex items-start gap-3">
                  <span className="text-[#FAE01A] font-mono text-xl leading-6 shrink-0">—</span>
                  <p className="font-rounded text-base md:text-lg leading-relaxed text-white/90">{item}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-12 text-center font-rounded text-sm text-white/50 max-w-2xl mx-auto">
            Only advertise specific speakers, prizes or confirmed opportunities once they have been secured.
          </p>
        </div>
      </section>
    </>
  );
}