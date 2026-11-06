"use client";

const faqs = [
  {
    q: "Is registration free?",
    a: "The registration policy will be confirmed when participant registration opens. Please check back for updates.",
  },
  {
    q: "Who can attend?",
    a: "Students, graduates, corps members, young entrepreneurs, professionals and anyone interested in technology and innovation.",
  },
  {
    q: "Where will the event take place?",
    a: "Ogbor Hill, Aba, Abia State. The specific venue will be announced.",
  },
  {
    q: "Can I participate as an exhibitor?",
    a: "Yes. Businesses, startups, technology organisations and innovators can apply through the exhibition application link in the Get Involved section.",
  },
  {
    q: "Can I volunteer?",
    a: "Yes. Interested individuals can apply through the volunteer registration link in the Get Involved section.",
  },
  {
    q: "Will there be networking opportunities?",
    a: "Yes. Participants will have opportunities to connect with other young people, professionals, organisations and industry stakeholders.",
  },
  {
    q: "Will there be opportunities after the event?",
    a: "The event aims to create pathways to further training, mentorship, internships and business development opportunities. Specific programmes and eligibility requirements will be communicated as they are confirmed.",
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="py-20 md:py-32 px-6 md:px-12 lg:px-20 bg-[#f5f3eb]">
      <div className="max-w-7xl mx-auto">
        {/* Section kicker */}
        <div className="flex items-center justify-between gap-4 mb-10 pb-4 border-b border-[#171912]/18">
          <span className="text-xs font-extrabold tracking-[0.13em] uppercase text-[#66685f]">
            07 / GOOD TO KNOW
          </span>
          <span className="text-xs font-extrabold tracking-[0.13em] uppercase text-[#66685f]">
            QUESTIONS, ANSWERED
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-[10%] pt-10">
          {/* Left: Title */}
          <div>
            <h2 className="font-[950] leading-[0.86] tracking-[-0.085em] text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
              THE
              <br />
              <span className="text-[#989c8b]">DETAILS.</span>
            </h2>
          </div>

          {/* Right: FAQ list */}
          <div>
            <dl className="space-y-0">
              {faqs.map((faq, index) => (
                <div key={index} className="border-t border-[#171912]/18">
                  <details className="group">
                    <summary className="flex items-center justify-between py-4 cursor-pointer list-none text-sm font-extrabold text-[#171912]">
                      {faq.q}
                      <span className="text-2xl text-[#005536] transition-transform duration-200 group-open:rotate-45">+</span>
                    </summary>
                    <div className="pb-4">
                      <p className="text-sm leading-[1.7] text-[#66685f] max-w-[480px]">
                        {faq.a}
                      </p>
                    </div>
                  </details>
                </div>
              ))}
              {/* Bottom border */}
              <div className="border-b border-[#171912]/18" />
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}