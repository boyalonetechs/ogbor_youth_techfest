"use client";

import Image from "next/image";

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
      {/* Concentric Outer Circle */}
      <circle cx="16" cy="16" r="13" />
      {/* Inner Concentric Dot */}
      <circle cx="16" cy="16" r="3.5" fill="currentColor" />
    </svg>
  );
}

export default function PanelSessions() {
  return (
    <section
      id="panel-sessions"
      className="relative w-full bg-white text-white min-h-screen flex items-center justify-center py-16 px-6 md:px-12 lg:px-20 overflow-hidden font-sans selection:bg-white selection:text-[#F14E23]"
    >
      {/* Outer Centered Container */}
      <div className="relative w-full max-w-[1280px] grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

        {/* Thin Vertical Center Line (Visible on Large Screens) */}
        <div
          className="hidden lg:block absolute left-1/2 top-4 bottom-4 w-[1px] bg-white/20 transform -translate-x-1/2 pointer-events-none"
          aria-hidden="true"
        />

        {/* Left Column: Organic Rotated Photo Card */}
        <div className="flex justify-center items-center py-4 lg:py-8 lg:pr-8">
          <div className="relative w-full max-w-[440px] sm:max-w-[480px] transform -rotate-2 hover:rotate-0 transition-transform duration-500 ease-out">

            {/* White Polaroid/Photo Framing */}
            <div className="bg-white p-3 sm:p-4 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.35)] rounded-sm">
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#1E1E1E]">
                <Image
                  src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=1000"
                  alt="GDG Lagos Panel Discussion Stage"
                  fill
                  sizes="(max-width: 1024px) 100vw, 480px"
                  className="object-cover object-center"
                  onError={(e) => {
                    e.currentTarget.src = "https://placehold.co/800x1000/1E1E1E/FFFFFF?text=Panel+Stage+Session";
                  }}
                />
              </div>
            </div>

          </div>
        </div>

        {/* Right Column: Title, Lists & Content */}
        <div className="flex flex-col justify-center lg:pl-8 text-left">

          {/* Top Section Number with Custom Target Icon */}
          <div className="flex items-center gap-2 mb-3">
            <TargetIcon className="w-9 h-9 text-[#111111]" />
            <span className="text-5xl sm:text-6xl font-extrabold tracking-tight text-[#111111] leading-none font-sans">
              01
            </span>
          </div>

          {/* Main Headline */}
          <h2 className="text-[clamp(2.4rem,4.5vw,4.2rem)] font-extrabold tracking-tight text-[#111111] leading-[1.05] mt-1 max-w-xl">
            Panel Sessions and Keynotes from Global Speakers
          </h2>

          {/* Thin Horizontal Divider */}
          <div className="w-full h-[1px] bg-white/30 my-8 sm:my-10" />

          {/* Bulleted Content List */}
          <ul className="space-y-4 text-lg sm:text-xl md:text-[22px] font-normal text-white leading-snug">
            <li className="flex items-start gap-3">
              <span className="select-none text-white/90 font-mono">-</span>
              <span>Engineers who shipped it, on stage</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="select-none text-white/90 font-mono">-</span>
              <span>Questions taken from the floor</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="select-none text-white/90 font-mono">-</span>
              <span>Speakers from Lagos and beyond</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="select-none text-white/90 font-mono">-</span>
              <span>Ideas you can use on Monday</span>
            </li>
          </ul>

          {/* Footer Subtext */}
          <div className="mt-14 sm:mt-16 text-lg sm:text-xl font-normal text-white/90 leading-relaxed max-w-md">
            <p>All of it on the main stage,</p>
            <p>from the first talk to the last.</p>
          </div>

        </div>

      </div>
    </section>
  );
}