import SectionKicker from "./SectionKicker";
import { attendeeRoles } from "./content";

const highlights = [
  { value: "1,000", label: "Expected participants" },
  { value: "30 Nov 2026", label: "Ogbor Hill, Aba, Abia State" },
  { value: "3 tracks", label: "Digital skills, innovation, entrepreneurship" },
];

export default function About() {
  return (
    <section className="oytf-section oytf-about" id="about">
      <SectionKicker
        index="01"
        label="ABOUT THE EVENT"
        right="DP HUB & TECH BY LEADPATH"
      />

      <div className="oytf-about-layout">
        <div className="oytf-about-lead">
          <p className="oytf-about-eyebrow">Ogbor Youth Tech Fest 2026</p>
          <h2 className="oytf-display oytf-about-title">
            Practical technology,
            <br />
            real opportunity,
            <br />
            <span>built in Aba.</span>
          </h2>
          <p className="oytf-about-statement">
            A focused gathering where young people learn relevant digital skills,
            meet practitioners, and connect ideas to work, business, and
            innovation.
          </p>

          <div className="oytf-about-highlights" aria-label="Event highlights">
            {highlights.map((item) => (
              <div className="oytf-about-highlight" key={item.label}>
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="oytf-about-content">
          <div className="oytf-about-card">
            <h3>Why it matters</h3>
            <p>
              Ogbor Youth Tech Fest is organised by DP Hub &amp; Tech by
              Leadpath to bridge the gap between youthful potential and
              opportunities in the digital economy. The programme combines
              expert-led conversations, practical demonstrations, exhibitions,
              and networking.
            </p>
          </div>

          <div className="oytf-about-card">
            <h3>What participants gain</h3>
            <p>
              Exposure to emerging technologies, digital skills,
              entrepreneurship, and practical ways to solve real problems.
              Participants are encouraged to move beyond consuming technology to
              creating value, building solutions, and exploring opportunities
              locally and globally.
            </p>
          </div>

          <a className="oytf-text-link oytf-about-link" href="#programme">
            Explore the programme <span aria-hidden="true">↓</span>
          </a>
        </div>
      </div>

      <div className="oytf-audience oytf-about-audience">
        <div className="oytf-audience-head">
          <span className="oytf-audience-label">Who should attend</span>
          <p>
            Students, early-career professionals, founders, and anyone ready to
            grow in the digital economy.
          </p>
        </div>
        <div className="oytf-chips">
          {attendeeRoles.map((role) => (
            <span className="oytf-chip" key={role}>
              {role}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
