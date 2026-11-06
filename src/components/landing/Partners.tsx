import SectionKicker from "./SectionKicker";

const partnerTypes = [
  "Corporate sponsors",
  "Technology companies",
  "Financial institutions",
  "Educational institutions",
  "Government agencies",
  "Media organisations",
  "Development organisations",
  "Individual supporters",
];

const sponsorMail =
  "mailto:ogboryouthtechfest@gmail.com?subject=Sponsorship%20enquiry%20%E2%80%94%20Ogbor%20Youth%20Tech%20Fest%202026";
const partnerMail =
  "mailto:ogboryouthtechfest@gmail.com?subject=Strategic%20partnership%20%E2%80%94%20Ogbor%20Youth%20Tech%20Fest%202026";
const proposalMail =
  "mailto:ogboryouthtechfest@gmail.com?subject=Sponsorship%20proposal%20request%20%E2%80%94%20Ogbor%20Youth%20Tech%20Fest%202026";

export default function Partners() {
  return (
    <section className="oytf-section oytf-partners" id="partners">
      <SectionKicker
        index="06"
        label="BETTER TOGETHER"
        right="PARTNERSHIPS & SPONSORSHIP"
      />

      <div className="oytf-partners-grid">
        <div>
          <h2 className="oytf-display">
            INVEST IN
            <br />
            <span>WHAT’S NEXT.</span>
          </h2>

          <p className="oytf-partners-lead">
            Partner with us. Ogbor Youth Tech Fest gives organisations and
            businesses a chance to contribute to youth development while
            connecting with emerging talent, entrepreneurs and the next
            generation of innovators.
          </p>

          <div className="oytf-partner-actions">
            <a className="oytf-button" href={sponsorMail}>
              Become a sponsor <span aria-hidden="true">↗</span>
            </a>
            <a
              className="oytf-button oytf-button--outline"
              href={partnerMail}
            >
              Become a strategic partner <span aria-hidden="true">↗</span>
            </a>
            <a
              className="oytf-button oytf-button--outline"
              href={proposalMail}
            >
              Request proposal <span aria-hidden="true">↗</span>
            </a>
          </div>

          <ul className="oytf-partner-list" aria-label="Who we welcome">
            {partnerTypes.map((type) => (
              <li key={type}>{type}</li>
            ))}
          </ul>
        </div>

        <div className="oytf-partner-side">
          <div className="oytf-partner-orbit" aria-hidden="true">
            <span>✳</span>
            <i>
              OGBOR
              <br />
              YOUTH TECH
              <br />
              FEST 2026
            </i>
          </div>

          <div className="oytf-partner-copy">
            <span>LET’S BUILD SOMETHING THAT LASTS</span>
            <p>
              We welcome organisations, businesses and individuals who believe
              in the potential of young people.
            </p>
            <div className="oytf-partner-placeholder">
              SPONSORS &amp; STRATEGIC PARTNERS
              <small>
                Confirmed partners will be featured here. No unconfirmed
                organisation is listed.
              </small>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
