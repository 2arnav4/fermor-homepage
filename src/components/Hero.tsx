const spend = [
  { label: "Rent", pct: 36, color: "bg-ink" },
  { label: "EMIs", pct: 14, color: "bg-forest" },
  { label: "Food", pct: 19, color: "bg-saffron" },
  { label: "Travel", pct: 9, color: "bg-forest-2" },
  { label: "Other", pct: 22, color: "bg-line" },
];

const facts = [
  "Calculators are free, no account needed",
  "SIPs from ₹500 a month",
  "Stocks, mutual funds and ETFs in one place",
];

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="mx-auto grid max-w-6xl gap-14 px-5 pt-12 pb-16 sm:px-8 md:pt-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-10 lg:pb-24">
        <div>
          <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-line px-3 py-1 text-xs text-ink-2">
            <span className="h-1.5 w-1.5 rounded-full bg-forest-2" />
            Personal finance, built for India
          </p>
          <h1 className="font-serif text-[2.9rem] leading-[1.02] tracking-[-0.01em] sm:text-6xl lg:text-[4.4rem]">
            Money gets easier when you can{" "}
            <em className="text-forest">see all of it.</em>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-2">
            Fermor puts your spending, savings and investments in one picture,
            tells you what it means in plain language, and helps you take the
            next step. SIPs, EMIs, PPF and the tax regime you picked included.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href="#waitlist"
              className="rounded-full bg-ink px-6 py-3.5 text-center font-medium text-paper transition-colors hover:bg-forest"
            >
              Join the waitlist
            </a>
            <a
              href="#forecast"
              className="group rounded-full px-6 py-3.5 text-center font-medium text-ink ring-1 ring-line transition hover:ring-ink"
            >
              Try the SIP forecast{" "}
              <span className="inline-block transition-transform group-hover:translate-x-0.5">
                →
              </span>
            </a>
          </div>
        </div>

        <SnapshotCard />
      </div>

      <div className="border-y border-line">
        <ul className="mx-auto grid max-w-6xl divide-line px-5 text-sm text-ink-2 sm:grid-cols-3 sm:divide-x sm:px-8">
          {facts.map((f) => (
            <li key={f} className="flex items-center gap-3 py-4 sm:justify-center sm:px-4">
              <svg viewBox="0 0 16 16" className="h-4 w-4 shrink-0 text-forest" aria-hidden="true">
                <path d="M3 8.5l3 3 7-7" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {f}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function SnapshotCard() {
  return (
    <figure
      className="relative mx-auto w-full max-w-md lg:mr-0"
      aria-label="Example of a Fermor monthly snapshot"
    >
      {/* Offset sheet behind the card gives depth without a drop-shadow stack */}
      <div className="absolute inset-0 translate-x-3 translate-y-3 rounded-[1.75rem] bg-mint" aria-hidden="true" />

      <div className="relative rounded-[1.75rem] border border-ink/10 bg-white p-6 sm:p-7">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.14em] text-muted">Net worth · October</p>
            <p className="num mt-2 text-[2rem] font-semibold tracking-tight">₹6,42,180</p>
            <p className="num mt-1 text-sm text-forest">+₹18,400 since September</p>
          </div>
          <span className="rounded-full bg-paper px-2.5 py-1 text-[11px] text-muted">Sample data</span>
        </div>

        <svg viewBox="0 0 300 70" className="mt-5 h-16 w-full" aria-hidden="true" preserveAspectRatio="none">
          <defs>
            <linearGradient id="nw" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="#1d5c43" stopOpacity="0.18" />
              <stop offset="1" stopColor="#1d5c43" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M0 58 L30 55 L60 57 L90 48 L120 50 L150 41 L180 43 L210 33 L240 30 L270 22 L300 14 L300 70 L0 70Z" fill="url(#nw)" />
          <path d="M0 58 L30 55 L60 57 L90 48 L120 50 L150 41 L180 43 L210 33 L240 30 L270 22 L300 14" fill="none" stroke="#1d5c43" strokeWidth="2" vectorEffect="non-scaling-stroke" />
        </svg>

        <div className="mt-6">
          <div className="flex items-baseline justify-between text-sm">
            <p className="font-medium">Where ₹58,200 went</p>
            <p className="text-muted">this month</p>
          </div>
          <div className="mt-3 flex h-2.5 overflow-hidden rounded-full">
            {spend.map((s) => (
              <span key={s.label} className={s.color} style={{ width: `${s.pct}%` }} />
            ))}
          </div>
          <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-ink-2">
            {spend.map((s) => (
              <li key={s.label} className="flex items-center gap-1.5">
                <span className={`h-2 w-2 rounded-full ${s.color}`} />
                {s.label} <span className="num text-muted">{s.pct}%</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6 rounded-2xl bg-paper p-4 text-sm leading-relaxed">
          <p className="font-medium">Food delivery is up 22% on last month.</p>
          <p className="mt-1 text-ink-2">
            Moving <span className="num">₹2,000</span> of it into your SIP could
            add about <span className="num font-medium text-ink">₹4.6 L</span>{" "}
            over 10 years at 12%.
          </p>
        </div>
      </div>
    </figure>
  );
}
