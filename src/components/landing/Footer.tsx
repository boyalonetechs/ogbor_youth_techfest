import Image from "next/image";
import Link from "next/link";

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export default function Footer() {
  return (
    <footer className="oytf-footer" id="contact">
      <div className="oytf-footer-top">
        <div>
          <Link className="oytf-footer-mark" href="/" aria-label="Ogbor Youth Tech Fest home">
            <Image src="/l.png" alt="Ogbor Youth Tech Fest" width={1586} height={518} style={{ height: 40, width: "auto" }} />
          </Link>
          <p>
            Unlocking a new digital era.
            <br />
            Empowering youths. Inspiring innovation.
            <br />
            Creating opportunities.
          </p>
          <p className="oytf-footer-meta">
            Organised by DP Hub &amp; Tech by Leadpath
            <br />
            Ogbor Hill, Aba, Abia State.
          </p>
        </div>

        <div className="oytf-footer-contact">
          <span className="oytf-footer-label">LET’S TALK</span>
          <a href="mailto:ogboryouthtechfest@gmail.com">
            ogboryouthtechfest@gmail.com <Arrow />
          </a>
          <a href="tel:+2348063917367">
            08063917367 <Arrow />
          </a>
          <small>
            Have questions or want to partner with us?
            <br />
            We would love to hear from you.
          </small>
        </div>

        <div className="oytf-footer-links">
          <span className="oytf-footer-label">FOLLOW THE JOURNEY</span>
          <a href="https://www.instagram.com/dphubandtech?rpxt=NTBnbmowY3Frdmdp&utm_source=qr" target="_blank" rel="noopener noreferrer">Instagram <Arrow /></a>
          <a href="https://www.facebook.com/share/1BpzL4bmZ4/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer">Facebook <Arrow /></a>
          <a href="https://www.tiktok.com/@dphubandtech" target="_blank" rel="noopener noreferrer">TikTok <Arrow /></a>
        </div>
      </div>

      <div className="oytf-footer-bottom">
        <span>© 2026 OGBOR YOUTH TECH FEST</span>
        <span>ORGANISED BY DP HUB &amp; TECH BY LEADPATH</span>
        <a href="#home">BACK TO TOP ↑</a>
      </div>
    </footer>
  );
}
