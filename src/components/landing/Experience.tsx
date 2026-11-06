import SectionKicker from "./SectionKicker";
import { experienceItems } from "./content";

export default function Experience() {
  return (
    <section className="oytf-section oytf-experience" id="experience">
      <div className="oytf-experience-left">
        <SectionKicker index="04" label="THE EXPERIENCE" />

        <h2 className="oytf-display oytf-display--green">
          COME CURIOUS.
          <br />
          <span>LEAVE CHARGED.</span>
        </h2>

        <p>
          A full day of ideas, hands-on discovery and the kind of conversations
          that stick with you.
        </p>

        <a className="oytf-button" href="#get-involved">
          Save your spot <span aria-hidden="true">↗</span>
        </a>
      </div>

      <div className="oytf-experience-right">
        <div className="oytf-stat">
          <strong>1,000</strong>
          <span>
            EXPECTED
            <br />
            PARTICIPANTS
          </span>
        </div>

        <ul>
          {experienceItems.map((item, index) => (
            <li key={item}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              {item}
            </li>
          ))}
        </ul>

        <small>
          Specific speakers, prizes and confirmed opportunities will be
          announced once secured.
        </small>
      </div>
    </section>
  );
}
