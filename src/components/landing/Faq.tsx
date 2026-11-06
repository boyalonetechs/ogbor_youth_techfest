import SectionKicker from "./SectionKicker";
import { faqs } from "./content";

export default function Faq() {
  return (
    <section className="oytf-section oytf-faq" id="faq">
      <SectionKicker
        index="07"
        label="GOOD TO KNOW"
        right="QUESTIONS, ANSWERED"
      />

      <div className="oytf-faq-grid">
        <h2 className="oytf-display">
          THE
          <br />
          <span>DETAILS.</span>
        </h2>

        <div className="oytf-faq-list">
          {faqs.map((faq) => (
            <details key={faq.q}>
              <summary>
                {faq.q}
                <span aria-hidden="true">+</span>
              </summary>
              <p>{faq.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
