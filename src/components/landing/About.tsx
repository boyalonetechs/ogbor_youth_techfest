import SectionKicker from "./SectionKicker";
import { attendeeRoles } from "./content";

export default function About() {
  return (
    <section className="oytf-section oytf-about" id="about">
      <SectionKicker
        index="01"
        label="ABOUT THE EVENT"
        right="AN INITIATIVE BY DP HUB & TECH BY LEADPATH"
      />

      <div className="oytf-intro-grid">
        <h2 className="oytf-display">
          MORE THAN
          <br />A TECH <span>EVENT.</span>
        </h2>

        <div className="oytf-intro-copy">
          <p className="oytf-big-copy">
            The future is evolving, and opportunities are expanding.
          </p>
          <p className="oytf-body">
            Ogbor Youth Tech Fest is a youth-focused technology, innovation and
            empowerment initiative organised by DP Hub &amp; Tech by Leadpath.
            We are here to bridge the gap between youthful potential and the
            opportunities available in the digital economy.
          </p>
          <p className="oytf-body">
            Through insightful conversations, practical demonstrations,
            expert-led sessions, networking and exhibitions, participants will
            gain exposure to emerging technologies, digital skills,
            entrepreneurship and innovative ways of solving real-world
            problems.
          </p>
          <p className="oytf-body">
            Our goal is to inspire young people to move beyond consuming
            technology to creating value, building solutions and exploring
            opportunities locally and globally.
          </p>
          <a className="oytf-text-link" href="#programme">
            EXPLORE THE PROGRAMME <span aria-hidden="true">↓</span>
          </a>
        </div>
      </div>

      <div className="oytf-audience">
        <span className="oytf-audience-label">WHO SHOULD ATTEND?</span>
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
