"use client";
import Navbar from "@/components/Navbar";
import Registration from "@/components/Registration";

const objectives = [
  {
    n: "01",
    title: "Digital empowerment",
    body: "Get hands-on exposure to relevant digital skills and the technologies shaping what comes next.",
    icon: "⌘",
  },
  {
    n: "02",
    title: "Innovation & creativity",
    body: "Turn bold ideas into practical solutions for the challenges in our communities.",
    icon: "✳",
  },
  {
    n: "03",
    title: "Entrepreneurship",
    body: "Connect digital knowledge to business creation, new income and opportunity.",
    icon: "↗",
  },
  {
    n: "04",
    title: "People & possibility",
    body: "Meet mentors, organisations, employers and fellow builders ready to move forward.",
    icon: "◎",
  },
];

const panels = [
  {
    n: "PANEL 01",
    title: "Digital marketing as a growth engine for SMEs",
    sub: "Build brands, reach customers and grow businesses with digital platforms.",
    tags: [
      "Social media & content",
      "Brand positioning",
      "AI for marketing",
      "Online sales",
    ],
  },
  {
    n: "PANEL 02",
    title: "Unlocking opportunities in the digital economy",
    sub: "From digital skills to income, careers and global opportunities.",
    tags: [
      "Remote work",
      "Freelancing",
      "Future ready skills",
      "Digital careers",
    ],
  },
  {
    n: "PANEL 03",
    title: "Building the nexus between youth and innovation",
    sub: "Harness youthful energy and technology to solve real-world problems.",
    tags: [
      "Youth in innovation",
      "AI & emerging tech",
      "From idea to impact",
      "Scalable solutions",
    ],
  },
];

const faqs = [
  [
    "Is registration free?",
    "The registration policy will be confirmed when participant registration opens.",
  ],
  [
    "Who can attend?",
    "Students, graduates, corps members, young entrepreneurs, professionals and anyone interested in technology and innovation.",
  ],
  [
    "Where will the event take place?",
    "Ogbor Hill, Aba, Abia State. The specific venue will be announced.",
  ],
  [
    "Can I exhibit or volunteer?",
    "Yes. Businesses, startups, innovators and interested volunteers will be able to apply through the links published here.",
  ],
  [
    "Will there be networking opportunities?",
    "Yes. You will have opportunities to connect with young people, professionals, organisations and industry stakeholders.",
  ],
  [
    "Will there be opportunities after the event?",
    "The event aims to create pathways to training, mentorship, internships and business development. Confirmed programmes and eligibility will be shared as they are secured.",
  ],
];

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export default function HomePage() {
  return (
    <main>
      <section className="intro section-pad" id="about">
        <div className="section-kicker">
          <span>01 / THE WHY</span>
          <span>AN INITIATIVE BY DP HUB & TECH BY LEADPATH</span>
        </div>
        <div className="intro-grid">
          <h2>
            MORE THAN
            <br />A TECH <span>EVENT.</span>
          </h2>
          <div className="intro-copy">
            <p className="big-copy">
              A room full of possibility. A community ready to make things
              happen.
            </p>
            <p>
              Ogbor Youth Tech Fest is a youth-focused technology, innovation
              and empowerment initiative. We’re here to bridge the gap between
              youthful potential and the opportunities of the digital economy.
            </p>
            <p>
              Through practical demonstrations, expert-led conversations and new
              connections, we want young people to move beyond consuming
              technology—to creating value with it.
            </p>
            <a className="text-link dark-link" href="#programme">
              WHAT WE’RE BUILDING <span>↓</span>
            </a>
          </div>
        </div>
      </section>

      <section className="objectives section-pad">
        <div className="section-kicker">
          <span>02 / THE MISSION</span>
          <span>FOUR WAYS WE MOVE FORWARD</span>
        </div>
        <h2 className="section-title">
          POTENTIAL, <span>UNLOCKED.</span>
        </h2>
        <div className="objective-grid">
          {objectives.map((item) => (
            <article className="objective-card" key={item.n}>
              <div className="card-top">
                <span>{item.n}</span>
                <span className="card-icon">{item.icon}</span>
              </div>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
              <span className="card-arrow">↗</span>
            </article>
          ))}
        </div>
        <div className="audience">
          <span>YOU’RE IN THE RIGHT ROOM IF YOU’RE A…</span>
          <p>
            Student <i>·</i> Graduate <i>·</i> Corps member <i>·</i> Founder{" "}
            <i>·</i> Freelancer <i>·</i> Curious mind
          </p>
        </div>
      </section>

      <section className="programme section-pad" id="programme">
        <div className="section-kicker">
          <span>03 / ON THE AGENDA</span>
          <span>CONVERSATIONS THAT MOVE US</span>
        </div>
        <div className="programme-heading">
          <h2 className="section-title">
            BIG QUESTIONS.
            <br />
            <span>REAL POSSIBILITIES.</span>
          </h2>
          <p>
            Three conversations about what’s next—and how we can build it
            together.
          </p>
        </div>
        <div className="panel-list">
          {panels.map((panel) => (
            <article className="panel-row" key={panel.n}>
              <div className="panel-number">
                {panel.n}
                <span>✳</span>
              </div>
              <div className="panel-main">
                <h3>{panel.title}</h3>
                <p>{panel.sub}</p>
                <div className="tags">
                  {panel.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
              <span className="panel-arrow">↗</span>
            </article>
          ))}
        </div>
        <p className="programme-note">
          More programme details will be announced soon.
        </p>
      </section>

      <section className="expect section-pad">
        <div className="expect-left">
          <div className="section-kicker">
            <span>04 / THE EXPERIENCE</span>
          </div>
          <h2>
            COME CURIOUS.
            <br />
            <span>LEAVE CHARGED.</span>
          </h2>
          <p>
            A full day of ideas, hands-on discovery and the kind of
            conversations that stick with you.
          </p>
          <a className="button button-lime" href="#get-involved">
            Save your spot <Arrow />
          </a>
        </div>
        <div className="expect-right">
          <div className="expect-stat">
            <strong>1,000</strong>
            <span>
              YOUNG PEOPLE
              <br />
              IN ONE ROOM
            </span>
          </div>
          <ul>
            <li>
              <span>01</span> Inspiring keynote presentations
            </li>
            <li>
              <span>02</span> Industry-led panel discussions
            </li>
            <li>
              <span>03</span> AI & emerging tech demonstrations
            </li>
            <li>
              <span>04</span> Practical digital skills exposure
            </li>
            <li>
              <span>05</span> Technology & innovation exhibits
            </li>
            <li>
              <span>06</span> Business, mentorship & networking
            </li>
            <li>
              <span>07</span> Innovation challenges & talent discovery
            </li>
          </ul>
          <small>
            Specific speakers and opportunities will be announced once
            confirmed.
          </small>
        </div>
      </section>

      <Registration />

      <section className="partners section-pad" id="partners">
        <div className="section-kicker">
          <span>06 / BETTER TOGETHER</span>
          <span>PARTNERSHIPS & SPONSORSHIP</span>
        </div>
        <div className="partners-grid">
          <div>
            <h2>
              INVEST IN
              <br />
              <span>WHAT’S NEXT.</span>
            </h2>
            <p>
              Help connect young people with the skills, tools and opportunities
              to thrive in the digital economy.
            </p>
            <a
              className="button button-dark"
              href="mailto:ogboryouthtechfest@gmail.com?subject=Partner%20with%20Ogbor%20Youth%20Tech%20Fest"
            >
              Partner with us <Arrow />
            </a>
          </div>
          <div className="partner-side">
            <div className="partner-orbit">
              <span>✳</span>
              <i>
                OGBOR
                <br />
                YOUTH TECH
                <br />
                FEST 2026
              </i>
            </div>
            <div className="partner-copy">
              <span>LET’S BUILD SOMETHING THAT LASTS</span>
              <p>
                We welcome organisations, businesses and individuals who believe
                in the potential of young people.
              </p>
              <div>
                SPONSORS & STRATEGIC PARTNERS
                <br />
                <small>Confirmed partners will be featured here.</small>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="date-banner">
        <div className="date-top">
          <span>SAVE THE DATE</span>
          <span>OGBOR HILL, ABA · ABIA STATE</span>
        </div>
        <div className="date-main">
          <h2>
            30<span>·</span>11<span>·</span>26
          </h2>
          <div>
            <span>MONDAY</span>
            <strong>
              ONE DAY.
              <br />A WORLD OF POSSIBILITY.
            </strong>
          </div>
        </div>
        <div className="date-bottom">
          <span>MONDAY, 30 NOVEMBER 2026</span>
          <span>VENUE & EVENT TIME TO BE ANNOUNCED</span>
          <span>1,000 EXPECTED PARTICIPANTS</span>
        </div>
      </section>

      <section className="faq section-pad">
        <div className="section-kicker">
          <span>07 / GOOD TO KNOW</span>
          <span>QUESTIONS, ANSWERED</span>
        </div>
        <div className="faq-grid">
          <h2>
            THE
            <br />
            <span>DETAILS.</span>
          </h2>
          <div className="faq-list">
            {faqs.map(([q, a]) => (
              <details key={q}>
                <summary>
                  {q}
                  <span>+</span>
                </summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <footer id="contact">
        <div className="footer-top">
          <div>
            <a className="wordmark footer-mark" href="#home">
              OGBOR YOUTH TECH FEST<span>✳</span>
            </a>
            <p>
              Unlocking a new digital era.
              <br />
              Empowering youths. Inspiring innovation.
              <br />
              Creating opportunities.
            </p>
          </div>
          <div className="footer-contact">
            <span>LET’S TALK</span>
            <a href="mailto:ogboryouthtechfest@gmail.com">
              ogboryouthtechfest@gmail.com <Arrow />
            </a>
            <a href="tel:+2348063917367">
              08063917367
              <Arrow />
            </a>
            <small>Ogbor Hill, Aba, Abia State</small>
          </div>
          <div className="footer-links">
            <span>FOLLOW THE JOURNEY</span>
            <a href="#contact">Instagram ↗</a>
            <a href="#contact">Facebook ↗</a>
            <a href="#contact">LinkedIn ↗</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 OGBOR YOUTH TECH FEST</span>
          <span>ORGANISED BY DP HUB & TECH BY LEADPATH</span>
          <a href="#home">BACK TO TOP ↑</a>
        </div>
      </footer>

      <style jsx global>{`
        @import "tailwindcss";

        :root {
          --ink: #171912;
          --paper: #f5f3eb;
          --lime: #d7f35a;
          --muted: #77786f;
          --line: rgba(23, 25, 18, 0.18);
        }

        * {
          box-sizing: border-box;
          scrollbar-width: none;
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          margin: 0;
          background: var(--paper);
          color: var(--ink);
          font-family: Arial, Helvetica, sans-serif;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        main {
          overflow: hidden;
        }

        .topbar {
          height: 72px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 5.25%;
          border-bottom: 1px solid var(--line);
          background: var(--paper);
          position: relative;
          z-index: 5;
        }

        .wordmark {
          font-weight: 950;
          font-size: 19px;
          letter-spacing: -1.4px;
        }

        .wordmark span {
          color: #005536;
          margin-left: 3px;
        }

        .topbar nav {
          display: flex;
          gap: 34px;
          margin-left: auto;
          margin-right: 42px;
        }

        .topbar nav a {
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          font-weight: 700;
        }

        .topbar nav a:hover,
        .text-link:hover {
          color: #005536;
        }

        .nav-cta,
        .mobile-cta {
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.06em;
          background: var(--lime);
          padding: 13px 17px;
          border-radius: 30px;
        }

        .nav-cta span,
        .button span {
          margin-left: 15px;
        }

        .mobile-cta {
          display: none;
        }

        .hero {
          min-height: 590px;
          display: grid;
          grid-template-columns: 51% 49%;
          position: relative;
          padding-bottom: 24px;
        }

        .hero-copy {
          padding: 70px 5vw 40px 10.5%;
          position: relative;
          z-index: 2;
        }

        .eyebrow,
        .section-kicker {
          font-size: 9px;
          letter-spacing: 0.13em;
          font-weight: 800;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .live-dot {
          height: 7px;
          width: 7px;
          border-radius: 50%;
          background: #005536;
          box-shadow: 0 0 0 4px #00553655;
        }

        .eyebrow-line {
          height: 1px;
          width: 36px;
          background: var(--line);
        }

        h1 {
          font-size: clamp(60px, 8.5vw, 112px);
          letter-spacing: -0.095em;
          line-height: 0.79;
          margin: 42px 0 25px;
          font-weight: 950;
        }

        .hero h1 > span:first-of-type {
          color: #71756b;
        }

        .lime-dot {
          color: #005536;
        }

        .hero-sub {
          font-size: 16px;
          line-height: 1.35;
          font-weight: 800;
          max-width: 310px;
          margin: 0 0 13px;
          letter-spacing: -0.025em;
        }

        .hero-body {
          font-size: 12px;
          line-height: 1.75;
          color: #606158;
          max-width: 365px;
          margin: 0;
        }

        .hero-actions {
          display: flex;
          align-items: center;
          gap: 27px;
          margin-top: 27px;
        }

        .button {
          display: inline-flex;
          align-items: center;
          padding: 15px 19px;
          border-radius: 2px;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.03em;
        }

        .button-dark {
          background: var(--ink);
          color: #fff;
        }

        .button-dark:hover {
          background: #46483d;
        }

        .text-link {
          font-size: 9px;
          text-transform: uppercase;
          font-weight: 800;
          letter-spacing: 0.09em;
        }

        .text-link span {
          font-size: 15px;
          margin-left: 8px;
        }

        .hero-foot {
          position: absolute;
          bottom: 26px;
          left: 10.5%;
          right: 8%;
          display: flex;
          justify-content: space-between;
          font-size: 8px;
          letter-spacing: 0.1em;
          font-weight: 700;
          color: #6d6e66;
        }

        .hero-art {
          margin: 28px 5.5% 42px 0;
          position: relative;
          min-height: 480px;
          background: linear-gradient(150deg, #184747, #56a2a4 54%, #c4d29a);
          overflow: hidden;
        }

        .section-pad {
          padding: 88px 10.5%;
        }

        .intro {
          background: #e9e8df;
        }

        .section-kicker {
          padding-bottom: 15px;
          border-bottom: 1px solid var(--line);
          justify-content: space-between;
          color: #66685f;
        }

        .intro-grid {
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: 8%;
          padding-top: 43px;
        }

        .intro h2,
        .section-title,
        .expect h2,
        .partners h2,
        .faq h2 {
          font-size: clamp(42px, 6vw, 76px);
          line-height: 0.86;
          letter-spacing: -0.085em;
          margin: 0;
          font-weight: 950;
        }

        .intro h2 span,
        .section-title span,
        .expect h2 span,
        .partners h2 span,
        .faq h2 span {
          color: #989c8b;
        }

        .intro-copy {
          padding-top: 5px;
          max-width: 390px;
        }

        .intro-copy p {
          font-size: 12px;
          line-height: 1.8;
          color: #62645c;
          margin: 14px 0;
        }

        .intro-copy .big-copy {
          font-size: 19px;
          font-weight: 800;
          line-height: 1.25;
          color: var(--ink);
          letter-spacing: -0.04em;
          margin: 0 0 20px;
        }

        .dark-link {
          display: inline-block;
          margin-top: 12px;
        }

        .objectives {
          background: var(--paper);
        }

        .section-title {
          margin: 40px 0 34px;
        }

        .objective-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 10px;
        }

        .objective-card {
          min-height: 212px;
          border: 1px solid var(--line);
          padding: 19px;
          position: relative;
          transition:
            background 0.2s,
            transform 0.2s;
        }

        .objective-card:hover {
          background: #e9e8df;
          transform: translateY(-3px);
        }

        .card-top {
          display: flex;
          justify-content: space-between;
          font-size: 9px;
          font-weight: 800;
          color: #76786e;
        }

        .card-icon {
          font-size: 22px;
          color: #005536;
        }

        .objective-card h3 {
          font-size: 17px;
          line-height: 1.02;
          letter-spacing: -0.05em;
          margin: 35px 0 9px;
          text-transform: uppercase;
        }

        .objective-card p {
          font-size: 10px;
          line-height: 1.65;
          color: #66685f;
          max-width: 195px;
        }

        .card-arrow {
          position: absolute;
          bottom: 17px;
          right: 18px;
          font-size: 15px;
        }

        .audience {
          margin-top: 24px;
          border-top: 1px solid var(--line);
          padding-top: 17px;
        }

        .audience span {
          font-size: 8px;
          letter-spacing: 0.11em;
          font-weight: 800;
          color: #717269;
        }

        .audience p {
          font-size: 12px;
          font-weight: 700;
        }

        .audience i {
          color: #005536;
          font-style: normal;
          margin: 0 5px;
        }

        .programme {
          background: #20221b;
          color: var(--paper);
        }

        .programme .section-kicker {
          border-color: #ffffff32;
          color: #b9baae;
        }

        .programme-heading {
          display: flex;
          align-items: end;
          justify-content: space-between;
          margin: 38px 0 38px;
        }

        .programme .section-title {
          margin: 0;
        }

        .programme .section-title span {
          color: #a0a397;
        }

        .programme-heading > p {
          max-width: 220px;
          font-size: 11px;
          line-height: 1.7;
          color: #c1c1b9;
        }

        .panel-row {
          display: grid;
          grid-template-columns: 130px 1fr 35px;
          gap: 30px;
          padding: 27px 0;
          border-top: 1px solid #ffffff35;
          align-items: start;
        }

        .panel-row:last-child {
          border-bottom: 1px solid #ffffff35;
        }

        .panel-number {
          font-size: 9px;
          font-weight: 800;
          letter-spacing: 0.12em;
          color: #bec0b4;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .panel-number span {
          font-size: 24px;
          color: var(--paper);
        }

        .panel-main h3 {
          font-size: 24px;
          line-height: 1;
          letter-spacing: -0.06em;
          text-transform: uppercase;
          margin: 0 0 10px;
          max-width: 550px;
        }

        .panel-main > p {
          font-size: 11px;
          color: #b9baaf;
          margin: 0 0 17px;
        }

        .tags {
          display: flex;
          gap: 7px;
          flex-wrap: wrap;
        }

        .tags span {
          border: 1px solid #ffffff45;
          border-radius: 30px;
          padding: 7px 10px;
          font-size: 8px;
          color: #dfdfd8;
        }

        .panel-arrow {
          color: var(--paper);
          font-size: 20px;
        }

        .programme-note {
          font-size: 9px;
          color: #999b8f;
          margin-top: 18px;
        }

        .expect {
          background: var(--lime);
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 11%;
          padding-top: 76px;
          padding-bottom: 76px;
        }

        .expect .section-kicker {
          border: 0;
          color: #44483a;
          padding: 0;
        }

        .expect h2 {
          font-size: clamp(38px, 5vw, 64px);
          margin: 44px 0 19px;
        }

        .expect h2 span {
          color: #005536;
        }

        .expect-left > p {
          font-size: 12px;
          line-height: 1.7;
          max-width: 280px;
          color: #45483b;
          margin-bottom: 26px;
        }

        .button-lime {
          background: var(--ink);
          color: #fff;
        }

        .expect-right {
          border-left: 1px solid #00553645;
          padding-left: 28px;
        }

        .expect-stat {
          display: flex;
          align-items: center;
          gap: 15px;
          margin-bottom: 22px;
        }

        .expect-stat strong {
          font-size: 50px;
          line-height: 1;
          letter-spacing: -0.09em;
        }

        .expect-stat span {
          font-size: 8px;
          line-height: 1.4;
          font-weight: 900;
          letter-spacing: 0.1em;
        }

        .expect-right ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .expect-right li {
          border-top: 1px solid #00553645;
          padding: 12px 0;
          font-size: 11px;
          font-weight: 700;
        }

        .expect-right li span {
          font-size: 8px;
          color: #005536;
          margin-right: 17px;
        }

        .expect-right small {
          font-size: 8px;
          color: #005536;
        }

        .involved {
          background: #f0efe8;
        }

        .involved .section-title {
          margin-top: 40px;
        }

        .involve-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
        }

        .involve-card {
          min-height: 330px;
          padding: 23px;
          position: relative;
          color: var(--ink);
          display: flex;
          flex-direction: column;
        }

        .attend {
          background: #d9ec79;
        }

        .volunteer {
          background: #dfe1d5;
        }

        .exhibit {
          background: #c5d8d1;
        }

        .involve-index {
          font-size: 8px;
          font-weight: 900;
          letter-spacing: 0.12em;
        }

        .involve-icon {
          position: absolute;
          top: 17px;
          right: 20px;
          font-size: 30px;
        }

        .involve-card h3 {
          font-size: 36px;
          line-height: 0.86;
          letter-spacing: -0.075em;
          text-transform: uppercase;
          margin: 55px 0 12px;
        }

        .involve-card p {
          font-size: 10px;
          line-height: 1.7;
          max-width: 230px;
          color: #4f5147;
        }

        .involve-card > a {
          margin-top: auto;
          border-top: 1px solid #20221b55;
          padding-top: 13px;
          font-size: 9px;
          font-weight: 900;
          display: flex;
          justify-content: space-between;
        }

        .form-note {
          font-size: 9px;
          color: #75766e;
        }

        .partners {
          background: #e6e6dd;
        }

        .partners-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10%;
          padding-top: 43px;
        }

        .partners h2 {
          font-size: clamp(46px, 6vw, 75px);
        }

        .partners-grid > div:first-child > p {
          font-size: 12px;
          line-height: 1.7;
          color: #65675e;
          max-width: 300px;
          margin: 22px 0;
        }

        .partner-side {
          display: flex;
          align-items: center;
          gap: 30px;
        }

        .partner-orbit {
          width: 160px;
          height: 160px;
          border-radius: 50%;
          border: 1px solid #a6aa9d;
          display: grid;
          place-content: center;
          text-align: center;
          position: relative;
          flex: none;
        }

        .partner-orbit:before,
        .partner-orbit:after {
          content: "";
          position: absolute;
          border: 1px solid #a6aa9d;
          border-radius: 50%;
          inset: 14px;
          transform: rotate(45deg) scaleX(0.48);
        }

        .partner-orbit:after {
          transform: rotate(-45deg) scaleX(0.48);
        }

        .partner-orbit span {
          font-size: 23px;
          color: #005536;
        }

        .partner-orbit i {
          font-style: normal;
          font-size: 9px;
          font-weight: 900;
          line-height: 1.3;
          margin-top: 5px;
        }

        .partner-copy > span,
        .partner-copy > div {
          font-size: 8px;
          font-weight: 900;
          letter-spacing: 0.08em;
        }

        .partner-copy p {
          font-size: 10px;
          line-height: 1.6;
          color: #696b62;
        }

        .partner-copy > div {
          border-top: 1px solid var(--line);
          padding-top: 13px;
          margin-top: 20px;
        }

        .partner-copy small {
          display: block;
          font-size: 9px;
          color: #77796f;
          font-weight: 400;
          letter-spacing: 0;
          margin-top: 7px;
        }

        .date-banner {
          background: var(--lime);
          padding: 31px 10.5% 25px;
        }

        .date-top,
        .date-bottom {
          display: flex;
          justify-content: space-between;
          font-size: 8px;
          font-weight: 900;
          letter-spacing: 0.13em;
        }

        .date-main {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 18px 0 12px;
        }

        .date-main h2 {
          font-size: clamp(80px, 15vw, 190px);
          letter-spacing: -0.11em;
          line-height: 0.8;
          margin: 0;
          font-weight: 950;
        }

        .date-main h2 span {
          color: #005536;
        }

        .date-main > div {
          display: flex;
          flex-direction: column;
          gap: 10px;
          text-align: right;
        }

        .date-main > div span {
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 0.15em;
        }

        .date-main > div strong {
          font-size: 13px;
          line-height: 1.1;
        }

        .date-bottom {
          border-top: 1px solid #00553655;
          padding-top: 13px;
        }

        .faq {
          background: var(--paper);
        }

        .faq-grid {
          display: grid;
          grid-template-columns: 0.8fr 1.2fr;
          gap: 10%;
          padding-top: 43px;
        }

        .faq h2 {
          font-size: 64px;
        }

        .faq-list details {
          border-top: 1px solid var(--line);
          padding: 15px 0;
        }

        .faq-list details:last-child {
          border-bottom: 1px solid var(--line);
        }

        .faq-list summary {
          list-style: none;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          font-size: 12px;
          font-weight: 800;
        }

        .faq-list summary::-webkit-details-marker {
          display: none;
        }

        .faq-list summary span {
          font-size: 18px;
          color: #005536;
        }

        .faq-list details[open] summary span {
          transform: rotate(45deg);
        }

        .faq-list p {
          font-size: 11px;
          line-height: 1.7;
          color: #66685f;
          max-width: 480px;
        }

        footer {
          background: #20221b;
          color: var(--paper);
          padding: 45px 10.5% 17px;
        }

        .footer-top {
          display: grid;
          grid-template-columns: 1.3fr 1fr 0.7fr;
          gap: 8%;
          padding-bottom: 44px;
        }

        .footer-mark {
          font-size: 24px;
        }

        .footer-top > div:first-child p {
          font-size: 10px;
          line-height: 1.8;
          color: #b7b8af;
          margin-top: 18px;
        }

        .footer-contact,
        .footer-links {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 10px;
        }

        .footer-contact > span,
        .footer-links > span {
          font-size: 8px;
          letter-spacing: 0.14em;
          color: #a8aa9f;
          font-weight: 800;
          margin-bottom: 8px;
        }

        .footer-contact > a {
          font-size: 14px;
          font-weight: 800;
        }

        .footer-contact > a span {
          color: var(--paper);
          margin-left: 7px;
        }

        .footer-contact small {
          font-size: 9px;
          color: #a8aa9f;
          margin-top: 8px;
        }

        .footer-links a {
          font-size: 10px;
        }

        .footer-bottom {
          border-top: 1px solid #ffffff35;
          padding-top: 14px;
          display: flex;
          justify-content: space-between;
          font-size: 7px;
          color: #a8aa9f;
          letter-spacing: 0.1em;
          font-weight: 700;
        }

        @media (max-width: 850px) {
          .topbar {
            padding: 0 5%;
            height: 64px;
          }

          .topbar nav {
            gap: 17px;
            margin-right: 20px;
          }

          .topbar nav a {
            font-size: 8px;
          }

          .nav-cta {
            font-size: 8px;
            padding: 11px;
          }

          .hero {
            grid-template-columns: 1fr 1fr;
            min-height: 520px;
          }

          .hero-copy {
            padding-left: 8%;
            padding-top: 65px;
          }

          .hero-foot {
            left: 8%;
            font-size: 7px;
          }

          .hero-art {
            min-height: 420px;
            margin-right: 5%;
          }

          .section-pad {
            padding-left: 8%;
            padding-right: 8%;
          }

          .objective-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .objective-card {
            min-height: 180px;
          }

          .expect {
            gap: 7%;
          }

          .involve-card {
            padding: 17px;
            min-height: 310px;
          }

          .involve-card h3 {
            font-size: 30px;
          }

          .partners-grid {
            gap: 5%;
          }

          .partner-side {
            gap: 15px;
          }

          .partner-orbit {
            width: 125px;
            height: 125px;
          }
        }

        @media (max-width: 620px) {
          .topbar nav {
            display: none;
          }

          .mobile-cta {
            display: block;
            font-size: 8px;
          }

          .nav-cta {
            display: none;
          }

          .hero {
            display: flex;
            flex-direction: column;
            padding-bottom: 25px;
          }

          .hero-copy {
            padding: 48px 7% 72px;
          }

          .hero h1 {
            font-size: clamp(66px, 18vw, 100px);
            margin: 33px 0 20px;
          }

          .hero-sub {
            font-size: 15px;
          }

          .hero-body {
            font-size: 11px;
          }

          .hero-art {
            margin: 0 7%;
            min-height: 360px;
          }

          .hero-foot {
            left: 7%;
            right: 7%;
            bottom: 38px;
            font-size: 6px;
          }

          .art-sticker {
            width: 76px;
            height: 76px;
            font-size: 10px;
          }

          .section-pad {
            padding: 62px 7%;
          }

          .section-kicker {
            font-size: 7px;
          }

          .intro-grid,
          .partners-grid,
          .faq-grid {
            grid-template-columns: 1fr;
            gap: 28px;
          }

          .intro-grid {
            padding-top: 30px;
          }

          .intro h2 {
            font-size: 58px;
          }

          .intro-copy .big-copy {
            font-size: 17px;
          }

          .section-title {
            font-size: 48px;
            margin: 32px 0 25px;
          }

          .objective-grid {
            gap: 8px;
          }

          .objective-card {
            padding: 14px;
            min-height: 190px;
          }

          .objective-card h3 {
            font-size: 15px;
            margin-top: 28px;
          }

          .objective-card p {
            font-size: 9px;
          }

          .audience p {
            line-height: 1.8;
          }

          .programme-heading {
            display: block;
            margin: 32px 0;
          }

          .programme-heading > p {
            margin-top: 18px;
          }

          .programme .section-title {
            font-size: 43px;
          }

          .panel-row {
            grid-template-columns: 68px 1fr 20px;
            gap: 10px;
            padding: 22px 0;
          }

          .panel-number {
            font-size: 7px;
          }

          .panel-main h3 {
            font-size: 18px;
          }

          .panel-main > p {
            font-size: 10px;
            line-height: 1.5;
          }

          .tags span {
            font-size: 7px;
            padding: 6px 8px;
          }

          .expect {
            grid-template-columns: 1fr;
            gap: 34px;
          }

          .expect h2 {
            font-size: 46px;
            margin: 34px 0 16px;
          }

          .expect-right {
            border-left: 0;
            padding-left: 0;
          }

          .expect-stat strong {
            font-size: 45px;
          }

          .involve-grid {
            grid-template-columns: 1fr;
          }

          .involve-card {
            min-height: 290px;
            padding: 22px;
          }

          .involve-card h3 {
            font-size: 38px;
            margin-top: 50px;
          }

          .partners-grid {
            padding-top: 30px;
          }

          .partners h2 {
            font-size: 59px;
          }

          .partner-side {
            justify-content: space-between;
          }

          .partner-orbit {
            width: 138px;
            height: 138px;
          }

          .date-banner {
            padding: 26px 7% 20px;
          }

          .date-top,
          .date-bottom {
            font-size: 6px;
            letter-spacing: 0.07em;
          }

          .date-main {
            align-items: flex-end;
          }

          .date-main h2 {
            font-size: clamp(69px, 18vw, 115px);
          }

          .date-main > div strong {
            font-size: 10px;
          }

          .date-main > div span {
            font-size: 8px;
          }

          .faq-grid {
            padding-top: 32px;
          }

          .faq h2 {
            font-size: 53px;
          }

          .faq-list summary {
            font-size: 11px;
          }

          footer {
            padding: 38px 7% 15px;
          }

          .footer-top {
            grid-template-columns: 1fr 1fr;
            gap: 28px 15px;
          }

          .footer-top > div:first-child {
            grid-column: 1/-1;
          }

          .footer-contact > a {
            font-size: 12px;
          }

          .footer-bottom {
            font-size: 6px;
            gap: 10px;
            flex-wrap: wrap;
          }

          .footer-bottom span:nth-child(2) {
            display: none;
          }
        }

        /* Editorial event hero inspired by the supplied reference. */
        .topbar {
          background: #fff;
          border-bottom-color: #e5e5e2;
          padding-left: max(5%, calc((100% - 1120px) / 2));
          padding-right: max(5%, calc((100% - 1120px) / 2));
        }

        .hero {
          display: flex;
          flex-direction: column;
          min-height: 0;
          padding: 0 max(5%, calc((100% - 1120px) / 2)) 0;
          background: #fff;
        }

        .hero-copy {
          padding: 56px 12px 34px;
          position: static;
        }

        .hero-copy > .eyebrow {
          font-size: 9px;
          letter-spacing: 0.16em;
          color: #5b5d55;
        }

        .hero-heading-row {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 40px;
          margin-top: 30px;
        }

        .hero h1 {
          font-size: clamp(56px, 8vw, 112px);
          line-height: 0.82;
          letter-spacing: -0.075em;
          margin: 0;
          font-weight: 950;
          color: #121310;
        }

        .hero h1 span:first-child {
          color: #005536;
        }

        .hero-sub {
          position: relative;
          max-width: 320px;
          padding-top: 14px;
          text-align: right;
          font-size: 14px;
          line-height: 1.65;
          font-weight: 600;
          letter-spacing: -0.01em;
          color: #3c4c44;
          margin: 0 5px 7px 0;
          text-wrap: balance;
        }

        .hero-sub::before {
          content: "";
          position: absolute;
          top: 0;
          right: 0;
          width: 56px;
          height: 2px;
          background: #005536;
        }

        .hero-art {
          margin: 18px 12px 0;
          min-height: clamp(390px, 43vw, 590px);
          height: auto;
          position: relative;
          border-radius: 20px;
          overflow: hidden;
          background: #2d7581;
        }

        .art-image {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(180deg, #10292518, #10292510 55%, #10292540),
            url("https://i.pinimg.com/1200x/2a/0c/4b/2a0c4ba920bdbce1a92ee91d0cfe7a8e.jpg")
              center 49% / cover no-repeat;
        }

        .art-grid {
          display: none;
        }

        .sun-disc {
          display: none;
        }

        .art-caption {
          z-index: 1;
          top: 20px;
          left: 20px;
          right: 20px;
          font-size: 8px;
          letter-spacing: 0.12em;
        }

        .event-card {
          position: absolute;
          z-index: 2;
          top: 20px;
          right: 20px;
          background: #182824ef;
          color: #fff;
          border-radius: 14px;
          padding: 17px 19px;
          min-width: 235px;
          box-shadow: 0 8px 24px #0002;
        }

        .event-card > span {
          font-size: 7px;
          font-weight: 900;
          letter-spacing: 0.14em;
          color: var(--paper);
          display: block;
          margin-bottom: 10px;
        }

        .event-card strong {
          display: block;
          font-size: 16px;
          letter-spacing: -0.03em;
          margin-bottom: 13px;
        }

        .event-card div {
          display: flex;
          gap: 16px;
          border-top: 1px solid #ffffff35;
          padding-top: 9px;
        }

        .event-card b {
          font-size: 7px;
          letter-spacing: 0.08em;
        }

        .hero-ticker {
          height: 44px;
          margin: 22px 12px 0;
          display: flex;
          align-items: center;
          overflow: hidden;
          white-space: nowrap;
          border-top: 1px solid #e2e2dd;
          border-bottom: 1px solid #e2e2dd;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.04em;
        }

        .hero-ticker span {
          flex: none;
          animation: heroTicker 28s linear infinite;
        }

        @keyframes heroTicker {
          to {
            transform: translateX(-100%);
          }
        }

        @media (max-width: 850px) {
          .hero {
            min-height: 0;
            grid-template-columns: 1fr;
          }

          .hero-copy {
            padding: 44px 10px 28px;
          }

          .hero-heading-row {
            gap: 26px;
            margin-top: 26px;
          }

          .hero-art {
            margin: 15px 10px 0;
            min-height: 400px;
          }

          .hero h1 {
            font-size: clamp(52px, 8.5vw, 88px);
            line-height: 0.84;
          }

          .hero-sub {
            max-width: 230px;
            font-size: 12px;
          }

          .hero-ticker {
            margin: 20px 10px 0;
          }
        }

        @media (max-width: 620px) {
          .hero {
            display: flex;
            flex-direction: column;
            padding: 0 4%;
          }

          .hero-copy {
            padding: 36px 5px 22px;
          }

          .hero-heading-row {
            display: block;
            margin-top: 24px;
          }

          .hero h1 {
            font-size: clamp(42px, 11.5vw, 70px);
            line-height: 0.86;
            letter-spacing: -0.06em;
            margin: 0;
          }

          .hero-sub {
            text-align: left;
            font-size: 12.5px;
            line-height: 1.65;
            max-width: 280px;
            margin: 20px 0 0;
            padding-top: 12px;
          }

          .hero-sub::before {
            right: auto;
            left: 0;
            width: 44px;
          }

          .hero-art {
            margin: 12px 0 0;
            min-height: 350px;
            border-radius: 14px;
          }

          .art-image {
            background-position: center;
            background-size: cover;
          }

          .art-caption {
            top: 13px;
            left: 13px;
            right: 13px;
            font-size: 7px;
          }

          .event-card {
            top: auto;
            right: 12px;
            bottom: 12px;
            min-width: 0;
            width: 220px;
            padding: 13px 14px;
          }

          .event-card strong {
            font-size: 14px;
          }

          .hero-ticker {
            margin: 18px 0 0;
            height: 38px;
            font-size: 8px;
          }

          .hero-ticker span {
            animation-duration: 22s;
          }
        }

        /* Compact navigation */
        .topbar {
          height: 60px;
        }

        .wordmark-logo {
          display: block;
          width: 40px;
          height: 40px;
          object-fit: contain;
        }

        .topbar nav {
          gap: 26px;
          margin-right: 30px;
        }

        .topbar nav a {
          font-size: 9px;
        }

        .nav-cta {
          font-size: 9px;
          padding: 10px 14px;
        }

        .nav-toggle {
          display: none;
          width: 38px;
          height: 38px;
          padding: 0;
          border: 1px solid var(--line);
          border-radius: 50%;
          background: transparent;
          color: var(--ink);
          cursor: pointer;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          gap: 4px;
        }

        .nav-toggle:focus-visible {
          outline: 2px solid #005536;
          outline-offset: 3px;
        }

        .nav-toggle span {
          display: block;
          width: 16px;
          height: 1.5px;
          background: currentColor;
          transition:
            transform 0.2s ease,
            opacity 0.2s ease;
        }

        .nav-toggle.is-open span:nth-child(1) {
          transform: translateY(5.5px) rotate(45deg);
        }

        .nav-toggle.is-open span:nth-child(2) {
          opacity: 0;
        }

        .nav-toggle.is-open span:nth-child(3) {
          transform: translateY(-5.5px) rotate(-45deg);
        }

        @media (max-width: 850px) {
          .topbar {
            height: 58px;
          }

          .wordmark-logo {
            width: 36px;
            height: 36px;
          }

          .topbar nav {
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            display: none;
            flex-direction: column;
            gap: 0;
            margin: 0;
            padding: 8px 5% 22px;
            background: #fff;
            border-bottom: 1px solid var(--line);
          }

          .topbar nav.is-open {
            display: flex;
          }

          .topbar nav a {
            padding: 14px 0;
            border-top: 1px solid #ecece7;
            font-size: 11px;
          }

          .topbar nav a:first-child {
            border-top: 0;
          }

          .nav-cta {
            display: inline-flex;
            margin-left: auto;
            padding: 9px 12px;
            font-size: 8px;
          }

          .nav-cta span {
            margin-left: 8px;
          }

          .nav-toggle {
            display: inline-flex;
            margin-left: 8px;
          }
        }
      `}</style>
    </main>
  );
}
