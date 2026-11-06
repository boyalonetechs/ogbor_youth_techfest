import Image from "next/image";
import SectionKicker from "./SectionKicker";
import { panels } from "./content";

export default function Programme() {
  return (
    <section className="oytf-section oytf-programme" id="programme">
      <SectionKicker
        index="03"
        label="ON THE AGENDA"
        right="CONVERSATIONS THAT MOVE US"
      />

      <div className="oytf-programme-heading">
        <h2 className="oytf-display oytf-display--paper">
          BIG QUESTIONS.
          <br />
          <span>REAL POSSIBILITIES.</span>
        </h2>
        <p>
          Three conversations about what’s next — and how we can build it
          together. Speakers and session times will be announced soon.
        </p>
      </div>

      <div className="oytf-panel-list">
        {panels.map((panel) => (
          <article className="oytf-panel-row" key={panel.n}>
            <div className="oytf-panel-index">
              <div className="oytf-panel-thumb">
                <Image
                  src={panel.image}
                  alt=""
                  width={240}
                  height={160}
                  sizes="(max-width: 620px) 76px, 132px"
                />
              </div>
              <div className="oytf-panel-number">
                {panel.n}
                <span aria-hidden="true">✳</span>
              </div>
            </div>

            <div className="oytf-panel-main">
              <h3>{panel.title}</h3>
              <p>{panel.sub}</p>
              <div className="oytf-tags">
                {panel.tags.map((tag) => (
                  <span className="oytf-tag" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <span className="oytf-panel-arrow" aria-hidden="true">
              ↗
            </span>
          </article>
        ))}
      </div>

      <p className="oytf-programme-note">
        More programme details and confirmed speakers will be announced soon.
      </p>
    </section>
  );
}
