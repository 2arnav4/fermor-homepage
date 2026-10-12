"use client";

import { useEffect, useState } from "react";
import { Logo } from "./Logo";

const links = [
  { href: "#how", label: "How it works" },
  { href: "#ask", label: "Ask" },
  { href: "#forecast", label: "Forecast" },
  { href: "#faq", label: "FAQ" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock page scroll while the mobile menu is open; close on Escape
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-40 transition-colors duration-200 ${
        scrolled || open
          ? "border-b border-line bg-paper/90 backdrop-blur"
          : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <a href="#top" aria-label="Fermor home" onClick={() => setOpen(false)}>
          <Logo />
        </a>

        <ul className="hidden items-center gap-8 text-sm text-ink-2 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="transition-colors hover:text-ink">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href="#waitlist"
            className="hidden rounded-full bg-ink px-4 py-2 text-sm font-medium text-paper transition-colors hover:bg-forest sm:inline-block"
          >
            Join the waitlist
          </a>
          <button
            type="button"
            className="-mr-2 grid h-10 w-10 place-items-center rounded-full md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              ) : (
                <path d="M4 8h16M4 16h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      <div
        id="mobile-menu"
        hidden={!open}
        className="h-[calc(100dvh-4rem)] border-t border-line bg-paper px-5 md:hidden"
      >
        <ul className="divide-y divide-line">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="block py-5 font-serif text-3xl"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#waitlist"
          onClick={() => setOpen(false)}
          className="mt-8 block rounded-full bg-ink py-3.5 text-center font-medium text-paper"
        >
          Join the waitlist
        </a>
      </div>
    </header>
  );
}
