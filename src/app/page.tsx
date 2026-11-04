import Navbar from "@/components/Navbar";
import Registeration from "@/components/Registeration";

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

export default function Home() {
  return (
    <main>
      <Navbar />

      <section className="hero" id="home">
        <div className="hero-copy">
          <div className="eyebrow">
            <span className="live-dot" /> OGBOR HILL, ABA{" "}
            <span className="eyebrow-line" /> 30 NOV 2026
          </div>
          <div className="hero-heading-row">
            <h1>
              UNLOCKING
              <br />
              A NEW
              <br />
              <span>DIGITAL ERA.</span>
            </h1>
            <p className="hero-sub">
              Empowering youths, inspiring innovation and creating
              opportunities.
            </p>
          </div>
        </div>
        <div
          className="hero-art"
          role="img"
          aria-label="Ogbor Youth Tech Fest 2026 — a gathering of young innovators"
        >
          <div className="art-image" />
          <div className="art-grid" />
          <div className="art-caption">
            <span>
              OGBOR YOUTH
              <br />
              TECH FEST 2026
            </span>
            <span>
              ABA, NIGERIA
              <br />
              30 NOVEMBER · MONDAY
            </span>
          </div>
          <div className="event-card">
            <span>NEXT UP · OGBOR YOUTH TECH FEST</span>
            <strong>Monday · 30 November</strong>
            <div>
              <b>ABA, ABIA</b>
              <b>1,000 YOUNG MINDS</b>
            </div>
          </div>
        </div>
        <div className="hero-ticker">
          <span>
            YOUNG MINDS, BIG POSSIBILITIES. &nbsp;—&nbsp; LEARN. BUILD. CONNECT.
            &nbsp;—&nbsp; UNLOCKING A NEW DIGITAL ERA. &nbsp;—&nbsp;{" "}
          </span>
          <span>
            YOUNG MINDS, BIG POSSIBILITIES. &nbsp;—&nbsp; LEARN. BUILD. CONNECT.
            &nbsp;—&nbsp; UNLOCKING A NEW DIGITAL ERA. &nbsp;—&nbsp;{" "}
          </span>
        </div>
      </section>

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

      <Registeration />

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
              OGBOR<span>✳</span>
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
    </main>
  );
}
