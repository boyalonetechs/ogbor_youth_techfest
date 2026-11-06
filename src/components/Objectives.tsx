"use client";

const objectives = [
  {
    n: "01",
    title: "Digital Empowerment",
    body: "Expose young people to relevant digital skills and emerging technologies.",
    icon: "⌘",
  },
  {
    n: "02",
    title: "Innovation & Creativity",
    body: "Encourage young minds to develop solutions to real-world challenges.",
    icon: "✳",
  },
  {
    n: "03",
    title: "Entrepreneurship",
    body: "Connect digital knowledge with business creation and economic opportunities.",
    icon: "↗",
  },
  {
    n: "04",
    title: "Networking & Opportunities",
    body: "Connect participants with mentors, organisations, employers and industry professionals.",
    icon: "◎",
  },
];

export default function Objectives() {
  return (
    <section className="py-20 md:py-32 px-6 md:px-12 lg:px-20 bg-[#f5f3eb]">
      <div className="max-w-7xl mx-auto">
        {/* Section kicker */}
        <div className="flex items-center justify-between gap-4 mb-6 pb-4 border-b border-[#171912]/18">
          <span className="text-xs font-extrabold tracking-[0.13em] uppercase text-[#66685f]">
            02 / THE MISSION
          </span>
          <span className="text-xs font-extrabold tracking-[0.13em] uppercase text-[#66685f]">
            FOUR WAYS WE MOVE FORWARD
          </span>
        </div>

        {/* Section title */}
        <h2 className="font-[950] leading-[0.86] tracking-[-0.085em] text-4xl md:text-5xl lg:text-6xl xl:text-7xl mb-10">
          POTENTIAL, <span className="text-[#989c8b]">UNLOCKED.</span>
        </h2>

        {/* Objectives grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {objectives.map((item) => (
            <article
              key={item.n}
              className="relative min-h-[212px] border border-[#171912]/18 p-5 hover:bg-[#e9e8df] hover:-translate-y-1 transition-all duration-200"
            >
              <div className="flex justify-between text-xs font-extrabold text-[#76786e] mb-8">
                <span>{item.n}</span>
                <span className="text-3xl text-[#005536]">{item.icon}</span>
              </div>
              <h3 className="text-lg font-extrabold leading-[1.02] tracking-[-0.05em] uppercase mb-3">
                {item.title}
              </h3>
              <p className="text-xs leading-[1.65] text-[#66685f] max-w-[195px]">
                {item.body}
              </p>
              <span className="absolute bottom-5 right-5 text-xl">↗</span>
            </article>
          ))}
        </div>

        {/* Audience */}
        <div className="pt-6 border-t border-[#171912]/18">
          <span className="text-xs font-extrabold tracking-[0.11em] uppercase text-[#717269] block mb-2">
            YOU'RE IN THE RIGHT ROOM IF YOU'RE A...
          </span>
          <p className="text-sm font-bold text-[#171912]">
            Student <i className="text-[#005536] not-italic mx-2">·</i> Graduate <i className="text-[#005536] not-italic mx-2">·</i> Corps member <i className="text-[#005536] not-italic mx-2">·</i> Founder <i className="text-[#005536] not-italic mx-2">·</i> Freelancer <i className="text-[#005536] not-italic mx-2">·</i> Curious mind
          </p>
        </div>
      </div>
    </section>
  );
}