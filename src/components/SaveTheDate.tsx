"use client";

import { useEffect, useState } from "react";

export default function SaveTheDate() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const eventDate = new Date("2026-11-30T09:00:00").getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const distance = eventDate - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="save-the-date"
      className="relative w-full bg-[#FAE01A] text-[#050B06] py-16 md:py-24 lg:py-32 px-6 md:px-12 lg:px-20 overflow-hidden"
    >
      <div className="relative mx-auto max-w-[1280px]">
        {/* Decorative background elements */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
        >
          <svg
            className="absolute h-full w-full opacity-20"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >
            <path
              d="M120 180 Q130 165 150 165 Q170 165 180 175 Q195 160 215 165 Q230 170 235 185 Q245 185 245 195 Q245 205 230 205 L130 205 Q115 205 115 195 Q115 185 120 180 Z"
              fill="#050B06"
            />
            <path
              d="M520 120 Q530 108 548 108 Q565 108 575 118 Q590 105 608 110 Q622 115 628 128 Q638 128 638 138 Q638 146 625 146 L530 146 Q515 146 515 138 Q515 128 520 120 Z"
              fill="#050B06"
            />
            <path
              d="M1090 270 Q1100 258 1115 258 Q1130 258 1138 266 Q1150 254 1166 258 Q1178 262 1183 274 Q1192 274 1192 282 Q1192 290 1180 290 L1100 290 Q1088 290 1088 282 Z"
              fill="#050B06"
            />
          </svg>
        </div>

        <div className="relative z-10 text-center">
          {/* Section Label */}
          <div className="flex items-center justify-center gap-2 mb-6 font-rounded text-[10px] font-bold uppercase tracking-[0.28em] text-[#050B06]/60">
            <span>06 / Event</span>
            <span className="mx-2 w-1 h-1 bg-[#050B06]/30 rounded-full" />
            <span>Save the Date</span>
          </div>

          {/* Main Headline */}
          <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] font-bold uppercase leading-[0.9] tracking-[-0.04em] mb-4">
            SAVE THE DATE!
          </h2>

          {/* Date */}
          <div className="font-display text-[clamp(3rem,8vw,7rem)] font-bold uppercase leading-[0.85] tracking-[-0.03em] mb-6 text-[#00592D]">
            30 NOVEMBER 2026
          </div>

          {/* Day */}
          <p className="font-rounded text-[clamp(1.25rem,2.5vw,1.75rem)] font-medium leading-relaxed mb-12 text-[#050B06]/80">
            Monday, 30 November 2026
          </p>

          {/* Countdown Timer */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-3xl mx-auto mb-16">
            <div className="group">
              <div className="font-display text-[clamp(3rem,6vw,5rem)] font-bold leading-none text-[#00592D]">
                {String(timeLeft.days).padStart(2, "0")}
              </div>
              <div className="font-rounded text-[10px] font-bold uppercase tracking-[0.22em] text-[#050B06]/60 mt-2">
                Days
              </div>
            </div>
            <div className="group">
              <div className="font-display text-[clamp(3rem,6vw,5rem)] font-bold leading-none text-[#00592D]">
                {String(timeLeft.hours).padStart(2, "0")}
              </div>
              <div className="font-rounded text-[10px] font-bold uppercase tracking-[0.22em] text-[#050B06]/60 mt-2">
                Hours
              </div>
            </div>
            <div className="group">
              <div className="font-display text-[clamp(3rem,6vw,5rem)] font-bold leading-none text-[#00592D]">
                {String(timeLeft.minutes).padStart(2, "0")}
              </div>
              <div className="font-rounded text-[10px] font-bold uppercase tracking-[0.22em] text-[#050B06]/60 mt-2">
                Minutes
              </div>
            </div>
            <div className="group">
              <div className="font-display text-[clamp(3rem,6vw,5rem)] font-bold leading-none text-[#00592D]">
                {String(timeLeft.seconds).padStart(2, "0")}
              </div>
              <div className="font-rounded text-[10px] font-bold uppercase tracking-[0.22em] text-[#050B06]/60 mt-2">
                Seconds
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 text-center md:text-left max-w-2xl mx-auto mb-12">
            <div className="flex items-center gap-3">
              <svg className="w-6 h-6 text-[#00592D] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <div>
                <p className="font-rounded text-sm text-[#050B06]/60">Venue</p>
                <p className="font-display text-lg font-bold text-[#050B06]">Ogbor Hill, Aba, Abia State</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <svg className="w-6 h-6 text-[#00592D] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p className="font-rounded text-sm text-[#050B06]/60">Expected Participants</p>
                <p className="font-display text-lg font-bold text-[#050B06]">1,000+</p>
              </div>
            </div>
          </div>

          {/* Note */}
          <p className="font-rounded text-base text-[#050B06]/70 max-w-md mx-auto">
            Venue and event time will be communicated to registered participants.
          </p>

          {/* CTA Buttons */}
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#get-involved"
              className="inline-flex items-center justify-center rounded-sm bg-[#050B06] px-8 py-4 font-rounded font-bold text-lg text-white shadow-sm transition-all duration-200 hover:bg-[#00592D] hover:shadow-[0_10px_30px_-10px_rgba(5,11,6,0.4)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#00592D]"
            >
              Register Now
            </a>
            <a
              href="#programme"
              className="inline-flex items-center justify-center rounded-sm border-2 border-[#050B06] px-8 py-4 font-rounded font-bold text-lg text-[#050B06] transition-all duration-200 hover:bg-[#050B06]/5 hover:text-[#00592D] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#00592D]"
            >
              View Programme
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}