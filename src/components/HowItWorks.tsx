import type { ReactNode } from "react";

type Step = {
  n: string;
  verb: string;
  title: string;
  body: string;
  visual: ReactNode;
};

const steps: Step[] = [
  {
    n: "01",
    verb: "Understand",
    title: "Know where you stand",
    body: "Add your accounts, cards and investments. Fermor sorts every rupee into one view and runs a health check on the numbers that matter.",
    visual: <HealthCheck />,
  },
  {
    n: "02",
    verb: "Act",
    title: "Ask, then decide",
    body: "Ask questions the way you would ask a friend who is good with money. Answers use your own numbers, not generic rules of thumb.",
    visual: <AskBubble />,
  },
  {
    n: "03",
    verb: "Grow",
    title: "See where it leads",
    body: "Start a SIP from ₹500, then watch how today's choices play out over 2, 5, 10 or 15 years, against the goals you set.",
    visual: <GrowthBars />,
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="mx-auto max-w-6xl px-5 py-20 sm:px-8 md:py-28">
      <div className="grid gap-6 md:grid-cols-[1fr_1.2fr] md:items-end">
        <h2 className="font-serif text-4xl leading-[1.05] sm:text-5xl">
          Most money apps show you numbers. Fermor tells you what to do with them.
        </h2>
        <p className="max-w-md text-ink-2 md:justify-self-end">
          Three steps, in the order people actually need them. You can stop at
          any one: plenty of people only want the first.
        </p>
      </div>

      <ol className="mt-14 grid gap-5 md:grid-cols-3">
        {steps.map((s) => (
          <li
            key={s.n}
            className="flex flex-col rounded-3xl border border-line bg-white/60 p-6 sm:p-7"
          >
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-forest">{s.verb}</span>
              <span className="num text-muted">{s.n}</span>
            </div>
            <div className="mt-6 min-h-36">{s.visual}</div>
            <h3 className="mt-6 text-xl font-semibold tracking-tight">{s.title}</h3>
            <p className="mt-2 leading-relaxed text-ink-2">{s.body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

function HealthCheck() {
  const rows = [
    { label: "Emergency fund", value: "3.2 of 6 months", pct: 53, tone: "bg-saffron" },
    { label: "Savings rate", value: "21%", pct: 70, tone: "bg-forest" },
    { label: "EMIs vs income", value: "18%", pct: 82, tone: "bg-forest" },
  ];
  return (
    <ul className="space-y-4" aria-label="Example health check">
      {rows.map((r) => (
        <li key={r.label}>
          <div className="flex justify-between text-sm">
            <span className="text-ink-2">{r.label}</span>
            <span className="num font-medium">{r.value}</span>
          </div>
          <div className="mt-1.5 h-1.5 rounded-full bg-paper-2">
            <div className={`h-full rounded-full ${r.tone}`} style={{ width: `${r.pct}%` }} />
          </div>
        </li>
      ))}
    </ul>
  );
}

function AskBubble() {
  return (
    <div className="space-y-2.5 text-sm" aria-hidden="true">
      <p className="ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-md bg-ink px-4 py-2.5 text-paper">
        Can I afford a ₹12L car loan?
      </p>
      <p className="w-fit max-w-[90%] rounded-2xl rounded-bl-md bg-paper-2 px-4 py-2.5 leading-relaxed">
        Yes, but it would push your EMIs to 34% of take-home. A ₹3L larger down
        payment keeps you under 25%.
      </p>
    </div>
  );
}

function GrowthBars() {
  const bars = [
    { label: "2y", h: 14 },
    { label: "5y", h: 32 },
    { label: "10y", h: 62 },
    { label: "15y", h: 100 },
  ];
  return (
    <div className="flex h-36 items-end gap-3" aria-hidden="true">
      {bars.map((b) => (
        <div key={b.label} className="flex flex-1 flex-col items-center gap-2">
          <div
            className="w-full rounded-t-lg bg-mint"
            style={{ height: `${b.h * 1.1}px` }}
          >
            <div className="h-1 rounded-t-lg bg-forest" />
          </div>
          <span className="num text-xs text-muted">{b.label}</span>
        </div>
      ))}
    </div>
  );
}
