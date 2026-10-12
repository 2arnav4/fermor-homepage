import { Logo } from "./Logo";

const columns = [
  {
    title: "Product",
    links: [
      { label: "How it works", href: "#how" },
      { label: "Ask Fermor", href: "#ask" },
      { label: "SIP forecast", href: "#forecast" },
      { label: "FAQ", href: "#faq" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Current site", href: "https://fermor.in" },
      { label: "Join the waitlist", href: "#waitlist" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mx-auto max-w-6xl px-5 pt-16 pb-10 sm:px-8">
      <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-2">
            Smart financial decisions for India. Understand your money, act on
            it, and watch it grow.
          </p>
        </div>
        {columns.map((c) => (
          <div key={c.title}>
            <p className="text-sm font-medium">{c.title}</p>
            <ul className="mt-4 space-y-2.5 text-sm text-ink-2">
              {c.links.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="hover:text-ink">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-14 border-t border-line pt-6 text-xs leading-relaxed text-muted">
        <p className="max-w-3xl">
          Fermor is not a SEBI-registered investment adviser. Information and
          tools on this site are for educational purposes and are not
          investment, tax or legal advice. Investments in securities are subject
          to market risks; read all related documents carefully before
          investing. Figures shown on this page are sample data.
        </p>
        <p className="mt-4">© 2026 Fermor Technologies Pvt. Ltd.</p>
      </div>
    </footer>
  );
}
