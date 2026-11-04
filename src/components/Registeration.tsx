"use client";
import { BiArrowToRight } from "react-icons/bi";

export default function Registeration() {
  return (
    <section className="involved section-pad" id="get-involved">
      <div className="section-kicker">
        <span>05 / YOUR NEXT MOVE</span>
        <span>THERE’S A PLACE FOR YOU HERE</span>
      </div>
      <h2 className="section-title">
        MAKE IT <span>HAPPEN.</span>
      </h2>
      <div className="involve-grid">
        {/* Attend Registration */}
        <article
          className="involve-card attend cursor-pointer"
          onClick={() =>
            (window.location.href = "https://forms.gle/3RqAGVhxS6Vzsg2Z6")
          }
        >
          <div className="involve-index">01 / ATTEND</div>
          <span className="involve-icon">↗</span>
          <h3>
            Be in the
            <br />
            room.
          </h3>
          <p>
            Join 1,000 young people exploring technology, innovation and new
            opportunities.
          </p>
          <a href="https://forms.gle/3RqAGVhxS6Vzsg2Z6">
            Register to attend <span>↗</span>
          </a>
        </article>

        {/* Volunteer Registeration */}
        <article
          className="involve-card volunteer cursor-pointer"
          onClick={() =>
            (window.location.href = "https://forms.gle/6sgZ4orcfiC254oFA")
          }
        >
          <div className="involve-index">02 / VOLUNTEER</div>
          <span className="involve-icon">✳</span>
          <h3>
            Help shape
            <br />
            the day.
          </h3>
          <p>
            Bring your energy, skills and ideas to a team building something
            meaningful.
          </p>
          <a href="https://forms.gle/6sgZ4orcfiC254oFA">
            Become a volunteer <span className="">↗</span>
          </a>

          {/*  */}
        </article>
        <article
          className="involve-card exhibit cursor-pointer"
          onClick={() => "https://forms.gle/F4cdQV1ChMa9Czj68"}
        >
          <div className="involve-index">03 / EXHIBIT</div>
          <span className="involve-icon">◎</span>
          <h3>
            Show them
            <br />
            what’s possible.
          </h3>
          <p>
            Put your product, service or innovation in front of future customers
            and collaborators.
          </p>
          <a href="https://forms.gle/F4cdQV1ChMa9Czj68">
            Book exhibition space <span>↗</span>
          </a>
        </article>
      </div>
      <p className="form-note">
        Application links are being prepared. Email DP Hub to register your
        interest.
      </p>
    </section>
  );
}
