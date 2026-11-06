"use client";

const panels = [
  {
    n: "PANEL 01",
    title: "Digital Marketing as a Growth Engine for SMEs",
    sub: "Leveraging Digital Platforms to Build Brands, Reach Customers and Drive Business Growth.",
    tags: [
      "Digital marketing strategies for small businesses",
      "Social media, content creation and brand positioning",
      "Customer acquisition and online sales",
      "AI tools for business marketing and productivity",
    ],
  },
  {
    n: "PANEL 02",
    title: "Unlocking Opportunities in the Digital Economy",
    sub: "From Digital Skills to Income, Careers and Global Opportunities.",
    tags: [
      "Emerging opportunities in the digital space",
      "Remote work, freelancing and digital entrepreneurship",
      "Building relevant skills for the future",
      "Accessing local and global opportunities",
    ],
  },
  {
    n: "PANEL 03",
    title: "Building the Nexus Between Youth and Innovation",
    sub: "Harnessing Youthful Energy, Creativity and Technology to Solve Real-World Problems.",
    tags: [
      "Youth participation in innovation",
      "Transforming ideas into practical solutions",
      "AI and emerging technologies",
      "Building sustainable and scalable innovations",
    ],
  },
];

export default function Programme() {
  return (
    <section id="programme" className="py-20 md:py-32 px-6 md:px-12 lg:px-20 bg-[#20221b] text-[#f5f3eb]">
      <div className="max-w-7xl mx-auto">
        {/* Section kicker */}
        <div className="flex items-center justify-between gap-4 mb-10 pb-4 border-b border-[#ffffff32]">
          <span className="text-xs font-extrabold tracking-[0.13em] uppercase text-[#b9baae]">
            03 / ON THE AGENDA
          </span>
          <span className="text-xs font-extrabold tracking-[0.13em] uppercase text-[#b9baae]">
            CONVERSATIONS THAT MOVE US
          </span>
        </div>

        {/* Programme heading */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
          <h2 className="font-[950] leading-[0.86] tracking-[-0.085em] text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
            BIG QUESTIONS.
            <br />
            <span className="text-[#a0a397]">REAL POSSIBILITIES.</span>
          </h2>
          <p className="text-sm leading-[1.7] text-[#c1c1b9] max-w-[220px]">
            Three conversations about what's next—and how we can build it together.
          </p>
        </div>

        {/* Panel list */}
        <div className="border-t border-[#ffffff35]">
          {panels.map((panel, index) => (
            <article
              key={panel.n}
              className="grid grid-cols-[130px_1fr_35px] gap-8 py-7 border-b border-[#ffffff35] items-start"
            >
              <div className="text-xs font-extrabold tracking-[0.12em] text-[#bec0b4] flex flex-col gap-5">
                <span>{panel.n}</span>
                <span className="text-3xl text-[#f5f3eb]">✳</span>
              </div>
              <div className="panel-main">
                <h3 className="text-2xl md:text-3xl font-extrabold leading-[1] tracking-[-0.06em] uppercase mb-3 max-w-[550px]">
                  {panel.title}
                </h3>
                <p className="text-sm text-[#b9baaf] mb-5">{panel.sub}</p>
                <div className="flex flex-wrap gap-3">
                  {panel.tags.map((tag) => (
                    <span
                      key={tag}
                      className="border border-[#ffffff45] rounded-full px-3 py-2 text-xs text-[#dfdfd8]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <span className="text-2xl text-[#f5f3eb] self-start">↗</span>
            </article>
          ))}
        </div>

        <p className="text-xs text-[#999b8f] mt-6 text-center">
          More programme details will be announced soon.
        </p>
      </div>
    </section>
  );
}