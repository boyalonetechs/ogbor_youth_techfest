import SectionKicker from "./SectionKicker";
import { objectives } from "./content";

export default function Objectives() {
  return (
    <section className="oytf-section oytf-objectives" id="objectives">
      <SectionKicker
        index="02"
        label="EVENT OBJECTIVES"
        right="FOUR WAYS WE MOVE FORWARD"
      />

      <h2 className="oytf-display oytf-objectives-title">
        POTENTIAL, <span>UNLOCKED.</span>
      </h2>

      <div className="oytf-objective-grid">
        {objectives.map((item) => (
          <article className="oytf-objective-card" key={item.n}>
            <div className="oytf-objective-top">
              <span>{item.n}</span>
              <span className="oytf-objective-icon" aria-hidden="true">
                {item.icon}
              </span>
            </div>
            <h3>{item.title}</h3>
            <p>{item.body}</p>
            <span className="oytf-objective-arrow" aria-hidden="true">
              ↗
            </span>
          </article>
        ))}
      </div>
    </section>
  );
}
