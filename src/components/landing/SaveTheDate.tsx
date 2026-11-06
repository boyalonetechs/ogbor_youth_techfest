import Countdown from "./Countdown";

export default function SaveTheDate() {
  return (
    <section className="oytf-date" id="save-the-date">
      <div className="oytf-date-top">
        <span>SAVE THE DATE</span>
        <span>OGBOR HILL, ABA · ABIA STATE</span>
      </div>

      <div className="oytf-date-main">
        <h2>
          30<span>·</span>11<span>·</span>26
        </h2>

        <div className="oytf-date-side">
          <span>MONDAY · 30 NOVEMBER 2026</span>
          <Countdown />
        </div>
      </div>

      <div className="oytf-date-bottom">
        <span>MONDAY, 30 NOVEMBER 2026</span>
        <span>VENUE &amp; EVENT TIME TO BE ANNOUNCED</span>
        <span>1,000 EXPECTED PARTICIPANTS</span>
      </div>
    </section>
  );
}
