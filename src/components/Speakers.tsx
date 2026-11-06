"use client";

import Image from "next/image";

const speakers = [
  {
    name: "Dr. Ada Okonkwo",
    role: "AI Research Lead",
    company: "Tech by Leadpath",
    topic: "AI & Emerging Technologies for Youth Innovation",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600",
    social: { linkedin: "#", twitter: "#" },
  },
  {
    name: "Chinedu Eze",
    role: "Founder & CEO",
    company: "Digital Growth Africa",
    topic: "Digital Marketing Strategies for SMEs",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600",
    social: { linkedin: "#", twitter: "#" },
  },
  {
    name: "Fatima Bello",
    role: "Senior Developer Advocate",
    company: "Global Tech Corp",
    topic: "Building a Career in the Digital Economy",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=600",
    social: { linkedin: "#", twitter: "#" },
  },
  {
    name: "Kelechi Nwachukwu",
    role: "Innovation Hub Director",
    company: "DP Hub",
    topic: "From Idea to Impact: Youth-Led Innovation",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=600",
    social: { linkedin: "#", twitter: "#" },
  },
  {
    name: "Amina Yusuf",
    role: "Freelance Consultant",
    company: "Remote Work Academy",
    topic: "Freelancing & Remote Work Opportunities",
    image: "https://images.unsplash.com/photo-1598550874940-19036d8d0a47?auto=format&fit=crop&q=80&w=600",
    social: { linkedin: "#", twitter: "#" },
  },
  {
    name: "Tunde Adebayo",
    role: "Startup Mentor",
    company: "Aba Innovation Center",
    topic: "Entrepreneurship in the Digital Age",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=600",
    social: { linkedin: "#", twitter: "#" },
  },
];

export default function Speakers() {
  return (
    <section
      id="speakers"
      className="relative w-full bg-[#050B06] text-white py-16 md:py-24 lg:py-32 px-6 md:px-12 lg:px-20 overflow-hidden"
    >
      <div className="relative mx-auto max-w-[1280px]">
        {/* Section Header */}
        <div className="flex items-center justify-between gap-6 border-b border-white/10 pb-5 font-rounded text-[10px] font-bold uppercase tracking-[0.28em] text-white/45 mb-12">
          <span>03 / Speakers</span>
          <span className="text-right">Voices shaping the future</span>
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-end mb-16">
          <h2 className="font-display text-[clamp(2.2rem,5.5vw,4.5rem)] font-bold uppercase leading-[0.92] tracking-[-0.04em]">
            Global experts,
            <br />
            <span className="text-[#FAE01A]">local impact.</span>
          </h2>
          <p className="max-w-xs font-rounded text-base leading-relaxed text-white/55 lg:pb-2">
            Industry leaders, innovators and practitioners sharing real-world insights.
          </p>
        </div>

        {/* Speakers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {speakers.map((speaker, index) => (
            <article
              key={speaker.name}
              className="group relative bg-white/5 border border-white/5 rounded-sm overflow-hidden transition-all duration-500 hover:border-[#FAE01A]/50 hover:bg-white/10 hover:shadow-[0_20px_40px_-15px_rgba(250,224,26,0.15)]"
            >
              {/* Speaker Image */}
              <div className="relative aspect-[3/4] w-full overflow-hidden">
                <Image
                  src={speaker.image}
                  alt={speaker.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.05]"
                  onError={(e) => {
                    e.currentTarget.src = `https://placehold.co/600x800/1E1E1E/FAE01A?text=${encodeURIComponent(speaker.name)}`;
                  }}
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#050B06]/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Speaker Info */}
              <div className="p-6 space-y-3">
                <h3 className="font-display text-xl font-bold text-white group-hover:text-[#FAE01A] transition-colors">
                  {speaker.name}
                </h3>
                <p className="font-rounded text-sm text-[#FAE01A] font-medium">{speaker.role}</p>
                <p className="font-rounded text-sm text-white/60">{speaker.company}</p>

                <div className="pt-2 border-t border-white/10">
                  <p className="font-rounded text-xs text-white/70 leading-snug">
                    <span className="font-semibold text-white/90">Session:</span> {speaker.topic}
                  </p>
                </div>

                {/* Social Links */}
                <div className="flex items-center gap-4 pt-2">
                  <a
                    href={speaker.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/50 hover:text-[#FAE01A] transition-colors"
                    aria-label={`${speaker.name} on LinkedIn`}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  </a>
                  <a
                    href={speaker.social.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/50 hover:text-[#FAE01A] transition-colors"
                    aria-label={`${speaker.name} on Twitter`}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/></svg>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* More speakers coming soon */}
        <div className="mt-12 text-center">
          <p className="font-rounded text-base text-white/50 mb-4">More speakers to be announced...</p>
          <p className="font-rounded text-sm text-white/40">Speaker lineup is subject to change. Check back for updates.</p>
        </div>
      </div>
    </section>
  );
}