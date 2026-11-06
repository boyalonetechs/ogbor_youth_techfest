"use client";

export default function DateBanner() {
  return (
    <section className="py-10 md:py-16 px-6 md:px-12 lg:px-20 bg-[#d7f35a]">
      <div className="max-w-7xl mx-auto">
        {/* Top row */}
        <div className="flex flex-col md:flex-row justify-between gap-4 text-xs font-extrabold tracking-[0.13em] uppercase text-[#171912] mb-8">
          <span>SAVE THE DATE</span>
          <span>OGBOR HILL, ABA · ABIA STATE</span>
        </div>

        {/* Main date */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 py-6 md:py-8 border-t border-[#00553655] border-b border-[#00553655] mb-6">
          <div className="flex-1">
            <h2 className="font-[950] leading-[0.8] tracking-[-0.11em] text-6xl md:text-8xl lg:text-9xl xl:text-[12rem]">
              30<span className="text-[#005536]">·</span>11
              <span className="text-[#005536]">·</span>26
            </h2>
          </div>
          <div className="flex flex-col items-start md:items-end gap-3 text-right">
            <span className="text-xs font-extrabold tracking-[0.15em] uppercase text-[#171912]">
              MONDAY
            </span>
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex flex-wrap md:flex-nowrap justify-between gap-4 text-xs font-extrabold tracking-[0.13em] uppercase pt-4 border-t border-[#00553655]">
          <span>MONDAY, 30 NOVEMBER 2026</span>
          <span>VENUE & EVENT TIME TO BE ANNOUNCED</span>
          <span>1,000 EXPECTED PARTICIPANTS</span>
        </div>
      </div>
    </section>
  );
}
