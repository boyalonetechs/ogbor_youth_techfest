"use client";

import { useEffect, useState } from "react";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#programme", label: "Programme" },
  { href: "#get-involved", label: "Get involved" },
  { href: "#partners", label: "Partners" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    const handleResize = () => {
      if (window.innerWidth > 850) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <header className="topbar">
      <a
        className="wordmark"
        href="#home"
        aria-label="Ogbor Youth Tech Fest home"
      >
        <img src="/ogbor.png" alt="" className="wordmark-logo" />
      </a>

      <nav
        id="primary-navigation"
        aria-label="Main navigation"
        className={menuOpen ? "is-open" : undefined}
      >
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={() => setMenuOpen(false)}
          >
            {link.label}
          </a>
        ))}
        <a
          className="nav-menu-cta"
          href="#get-involved"
          onClick={() => setMenuOpen(false)}
        >
          REGISTER NOW <span aria-hidden="true">↗</span>
        </a>
      </nav>

      <a className="nav-cta" href="#get-involved">
        REGISTER NOW <span aria-hidden="true">↗</span>
      </a>

      <button
        type="button"
        className={`nav-toggle${menuOpen ? " is-open" : ""}`}
        aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={menuOpen}
        aria-controls="primary-navigation"
        onClick={() => setMenuOpen((open) => !open)}
      >
        <span />
        <span />
        <span />
      </button>
    </header>
  );
}
