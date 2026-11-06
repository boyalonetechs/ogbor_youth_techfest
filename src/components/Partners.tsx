"use client";

import Image from "next/image";
import Link from "next/link";

const partnerCategories = [
  {
    title: "Corporate Sponsors",
    description: "Organisations investing in youth development and digital transformation",
  },
  {
    title: "Technology Companies",
    description: "Tech innovators showcasing cutting-edge solutions",
  },
  {
    title: "Financial Institutions",
    description: "Banks and fintechs enabling digital access",
  },
  {
    title: "Educational Institutions",
    description: "Universities and training centres building future talent",
  },
  {
    title: "Government Agencies",
    description: "Public sector partners supporting youth empowerment",
  },
  {
    title: "Media Organisations",
    description: "Amplifying the story of youth innovation",
  },
  {
    title: "Development Organisations",
    description: "NGOs and international partners driving impact",
  },
  {
    title: "Individual Supporters",
    description: "Community champions believing in the vision",
  },
];

// Placeholder sponsor logos - replace with actual confirmed sponsors
const confirmedSponsors = [
  { name: "DP Hub", logo: "/partners/dp-hub.svg", url: "#" },
  { name: "Tech by Leadpath", logo: "/partners/tech-leadpath.svg", url: "#" },
  { name: "Partner 1", logo: "/partners/partner-1.svg", url: "#" },
  { name: "Partner 2", logo: "/partners/partner-2.svg", url: "#" },
  { name: "Partner 3", logo: "/partners/partner-3.svg", url: "#" },
  { name: "Partner 4", logo: "/partners/partner-4.svg", url: "#" },
  { name: "Partner 5", logo: "/partners/partner-5.svg", url: "#" },
  { name: "Partner 6", logo: "/partners/partner-6.svg", url: "#" },
];

export default function Partners() {
  return (
    <section
      id="partners"
      className="relative w-full bg-[#050B06] text-white py-16 md:py-24 lg:py-32 px-6 md:px-12 lg:px-20 overflow-hidden"
    >
      <div className="relative mx-auto max-w-[1280px]">
        {/* Section Header */}
        <div className="flex items-center justify-between gap-6 border-b border-white/10 pb-5 font-rounded text-[10px] font-bold uppercase tracking-[0.28em] text-white/45 mb-12">
          <span>05 / Partners</span>
          <span className="text-right">Partner with Us. Invest in the Future.</span>
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-end mb-16">
          <h2 className="font-display text-[clamp(2.2rem,5.5vw,4.5rem)] font-bold uppercase leading-[0.92] tracking-[-0.04em]">
            Partner with Us.
            <br />
            <span className="text-[#FAE01A]">Invest in the Future.</span>
          </h2>
          <p className="max-w-xs font-rounded text-base leading-relaxed text-white/55 lg:pb-2">
            Connect with emerging talents, entrepreneurs and the next generation of innovators.
          </p>
        </div>

        {/* Partnership Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {partnerCategories.map((category, index) => (
            <div
              key={category.title}
              className="group p-6 bg-white/5 border border-white/5 rounded-sm hover:border-[#FAE01A]/50 hover:bg-white/10 transition-all duration-300"
            >
              <h3 className="font-display text-lg font-bold text-white group-hover:text-[#FAE01A] transition-colors mb-2">
                {category.title}
              </h3>
              <p className="font-rounded text-sm text-white/60 leading-relaxed">
                {category.description}
              </p>
            </div>
          ))}
        </div>

        {/* Confirmed Sponsors */}
        <div className="mb-16">
          <h3 className="font-display text-xl font-bold text-white mb-8">Confirmed Partners</h3>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 lg:gap-16">
            {confirmedSponsors.map((sponsor, index) => (
              <a
                key={sponsor.name}
                href={sponsor.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group opacity-60 hover:opacity-100 transition-opacity duration-300"
                aria-label={sponsor.name}
              >
                <div className="w-32 h-20 md:w-40 md:h-24 flex items-center justify-center bg-white/5 border border-white/5 rounded-sm group-hover:border-[#FAE01A]/50 transition-all duration-300">
                  {/* Placeholder for logo - replace with actual Image component when logos are available */}
                  <span className="font-rounded text-xs text-white/50 uppercase tracking-wide">
                    {sponsor.name}
                  </span>
                </div>
              </a>
            ))}
          </div>
          <p className="mt-8 text-center font-rounded text-sm text-white/50">
            Display confirmed sponsors' logos in this section. Do not publish unconfirmed organisations as partners.
          </p>
        </div>

        {/* Partnership CTAs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <Link
            href="#sponsor"
            className="group p-6 bg-[#FAE01A] text-[#050B06] rounded-sm font-rounded font-bold text-center transition-all duration-200 hover:bg-[#E8CC18] hover:shadow-[0_10px_30px_-10px_rgba(250,224,26,0.4)]"
          >
            <span className="text-lg md:text-xl">Become a Sponsor</span>
            <p className="mt-2 text-sm font-normal text-[#050B06]/70">Lead the conversation on youth innovation</p>
          </Link>
          <Link
            href="#strategic-partner"
            className="group p-6 bg-[#00592D] text-white rounded-sm font-rounded font-bold text-center transition-all duration-200 hover:bg-[#004724] hover:shadow-[0_10px_30px_-10px_rgba(0,89,45,0.4)]"
          >
            <span className="text-lg md:text-xl">Become a Strategic Partner</span>
            <p className="mt-2 text-sm font-normal text-white/70">Build long-term impact with us</p>
          </Link>
          <Link
            href="#sponsorship-proposal"
            className="group p-6 bg-white/5 border border-white/10 text-white rounded-sm font-rounded font-bold text-center transition-all duration-200 hover:bg-white/10 hover:border-[#FAE01A]/50"
          >
            <span className="text-lg md:text-xl">Download Sponsorship Proposal</span>
            <p className="mt-2 text-sm font-normal text-white/60">Get the full partnership deck</p>
          </Link>
        </div>

        <p className="mt-12 text-center font-rounded text-sm text-white/50 max-w-2xl mx-auto">
          Registration/application link: <span className="text-white/70 underline">[Insert sponsorship and partnership link]</span>
        </p>
      </div>
    </section>
  );
}