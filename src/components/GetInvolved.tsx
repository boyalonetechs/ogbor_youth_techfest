"use client";

import Image from "next/image";
import Link from "next/link";

const opportunities = [
  {
    id: "attend",
    title: "Register to Attend",
    subtitle: "Be part of 1,000 young people exploring technology, innovation and opportunities in the digital economy.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
      </svg>
    ),
    benefits: [
      "Access to all keynotes and panel sessions",
      "Networking with industry professionals",
      "Hands-on workshops and demos",
      "Exhibition area access",
      "Certificate of participation",
      "Access to post-event resources",
    ],
    cta: "Register Now",
    href: "#register",
    color: "bg-[#FAE01A] text-[#050B06] hover:bg-[#E8CC18]",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=1000",
    alt: "Young people attending a tech conference",
  },
  {
    id: "volunteer",
    title: "Become a Volunteer",
    subtitle: "Are you passionate about technology, youth development, innovation and community impact?",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    opportunities_list: [
      "Community mobilisation",
      "Registration and participant management",
      "Media, photography and videography",
      "Publicity and digital marketing",
      "Technical and ICT support",
      "Logistics and venue management",
      "Welfare and hospitality",
      "Partnerships and sponsorship",
    ],
    cta: "Apply to Volunteer",
    href: "#volunteer",
    color: "bg-[#00592D] text-white hover:bg-[#004724]",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1000",
    alt: "Volunteers helping at a technology event",
  },
  {
    id: "exhibit",
    title: "Exhibit at the Tech Fest",
    subtitle: "Showcase your products, services, innovations, technology solutions and business ideas to an audience of young people, entrepreneurs, professionals and potential customers.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    partners: [
      "Technology companies and startups",
      "Digital training institutions",
      "SMEs and innovative businesses",
      "AI and software solution providers",
      "Creative agencies and digital professionals",
      "Educational and development organisations",
    ],
    cta: "Apply to Exhibit",
    href: "#exhibit",
    color: "bg-[#050B06] border border-white/20 text-white hover:bg-white/10",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1000",
    alt: "Exhibition booth at a technology conference",
  },
];

function OpportunityCard({ opportunity, index }: { opportunity: typeof opportunities[0]; index: number }) {
  const isEven = index % 2 === 0;

  return (
    <section
      id={opportunity.id}
      className={`relative w-full py-16 md:py-24 lg:py-32 px-6 md:px-12 lg:px-20 ${index > 0 ? 'border-t border-white/5' : ''} ${isEven ? 'bg-[#050B06]' : 'bg-[#0A1A0F]'}`}
    >
      <div className="relative mx-auto max-w-[1280px]">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center ${isEven ? '' : 'lg:grid-flow-dense'}`}>

          {/* Visual Column */}
          <div className={`relative ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
            <div className="relative w-full max-w-[520px] mx-auto lg:mx-0">
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#1E1E1E] rounded-sm border border-white/10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)]">
                <Image
                  src={opportunity.image}
                  alt={opportunity.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 520px"
                  className="object-cover object-center transition-transform duration-700 ease-out hover:scale-[1.02]"
                  onError={(e) => {
                    e.currentTarget.src = `https://placehold.co/800x600/1E1E1E/FAE01A?text=${encodeURIComponent(opportunity.title)}`;
                  }}
                />
              </div>
            </div>
          </div>

          {/* Content Column */}
          <div className={`flex flex-col justify-center ${isEven ? 'lg:order-1 lg:pr-8 text-right' : 'lg:order-2 lg:pl-8 text-left'}`}>
            {/* Icon */}
            <div className={`flex items-center gap-3 mb-6 ${isEven ? 'justify-end' : ''}`}>
              <div className={`w-16 h-16 rounded-sm flex items-center justify-center text-white ${opportunity.color.replace('bg-', 'bg-').replace(' text-white', '').replace(' text-[#050B06]', '').replace(' hover:bg-[#E8CC18]', '').replace(' hover:bg-[#004724]', '').replace(' hover:bg-white/10', '').replace(' border border-white/20', '')}`}>
                {opportunity.icon}
              </div>
            </div>

            {/* Title */}
            <h3 className="font-display text-[clamp(1.8rem,3.5vw,3rem)] font-bold uppercase leading-[1.05] tracking-[-0.03em] text-white mb-3 max-w-xl mx-auto">
              {opportunity.title}
            </h3>

            {/* Subtitle */}
            <p className="font-rounded text-lg sm:text-xl text-white/70 leading-relaxed max-w-xl mx-auto mb-8">
              {opportunity.subtitle}
            </p>

            {/* Benefits/Opportunities List */}
            <div className="space-y-3 max-w-xl mx-auto mb-10">
              {(opportunity.benefits || opportunity.opportunities_list || opportunity.partners).map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-[#FAE01A] font-mono text-lg leading-6 shrink-0">—</span>
                  <span className="font-rounded text-base text-white/90">{item}</span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className={`flex ${isEven ? 'justify-end' : ''}`}>
              <Link
                href={opportunity.href}
                className={`inline-flex items-center justify-center rounded-sm px-6 py-3 font-rounded font-bold tracking-tight text-base transition-all duration-200 ${opportunity.color} focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FAE01A]`}
              >
                {opportunity.cta}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function GetInvolved() {
  return (
    <>
      {/* Get Involved Header Section */}
      <section
        id="get-involved"
        className="relative w-full bg-[#050B06] text-white py-16 md:py-24 lg:py-32 px-6 md:px-12 lg:px-20 overflow-hidden"
      >
        <div className="relative mx-auto max-w-[1280px]">
          <div className="flex items-center justify-between gap-6 border-b border-white/10 pb-5 font-rounded text-[10px] font-bold uppercase tracking-[0.28em] text-white/45 mb-12">
            <span>04 / Get Involved</span>
            <span className="text-right">Three ways to be part of it</span>
          </div>

          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-end">
            <h2 className="font-display text-[clamp(2.2rem,5.5vw,4.5rem)] font-bold uppercase leading-[0.92] tracking-[-0.04em]">
              Don't just watch.
              <br />
              <span className="text-[#FAE01A]">Be part of it.</span>
            </h2>
            <p className="max-w-xs font-rounded text-base leading-relaxed text-white/55 lg:pb-2">
              Whether you want to learn, contribute or showcase — there's a place for you.
            </p>
          </div>
        </div>
      </section>

      {/* Three Opportunity Sections */}
      {opportunities.map((opportunity, index) => (
        <OpportunityCard key={opportunity.id} opportunity={opportunity} index={index} />
      ))}
    </>
  );
}