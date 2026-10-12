"use client";

import { useRef, useState, type KeyboardEvent } from "react";

type Qa = {
  q: string;
  a: string[];
  uses: string[];
};

// Figures are consistent with the sample snapshot in the hero
const qas: Qa[] = [
  {
    q: "Where did my money go this month?",
    a: [
      "₹58,200 in total, ₹4,100 more than September.",
      "Most of the jump is food delivery (+₹2,600) and a ₹1,499 annual subscription that renewed on the 3rd. You haven't opened that app since June.",
    ],
    uses: ["Bank account", "Credit card", "Last 6 months"],
  },
  {
    q: "How long would my savings last if I lost my job?",
    a: [
      "About 3.2 months.",
      "Your essentials (rent, EMIs, groceries, bills) average ₹41,500 a month, and you have ₹1.33 L across savings and a liquid fund. Six months needs ₹1.16 L more. At ₹10,000 a month you'd get there in just under a year.",
    ],
    uses: ["Savings", "Liquid fund", "Recurring payments"],
  },
  {
    q: "Should I prepay my home loan or invest the extra?",
    a: [
      "Neither, yet.",
      "Prepaying earns a guaranteed 8.6%, your loan rate. Equity has historically done better over 10+ years, with real swings along the way. But your emergency fund covers only 3 months, so the first ₹1.16 L is better kept liquid. After that, the trade-off is worth a proper look.",
    ],
    uses: ["Home loan", "Emergency fund", "Risk profile"],
  },
  {
    q: "Will I have ₹15 L for a down payment by 2030?",
    a: [
      "Not at your current pace.",
      "₹18,000 a month at 7% gets you to about ₹10 L by late 2030. To hit ₹15 L on time you'd need roughly ₹27,000 a month. Keeping ₹18,000 and moving the date gets you there by mid-2032.",
    ],
    uses: ["Goal: Home", "Current SIPs", "Assumed 7% return"],
  },
];

export function AskDemo() {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  // Arrow keys move between questions, per the WAI-ARIA tabs pattern
  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    const delta =
      e.key === "ArrowDown" || e.key === "ArrowRight" ? 1
      : e.key === "ArrowUp" || e.key === "ArrowLeft" ? -1
      : 0;
    if (!delta) return;
    e.preventDefault();
    const next = (active + delta + qas.length) % qas.length;
    setActive(next);
    tabs.current[next]?.focus();
  }

  const current = qas[active];

  return (
    <section id="ask" className="bg-ink text-paper">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 sm:px-8 md:py-28 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div>
          <p className="text-sm font-medium text-saffron">Ask Fermor</p>
          <h2 className="mt-4 font-serif text-4xl leading-[1.05] sm:text-5xl">
            Questions you&rsquo;d hesitate to ask a person.
          </h2>
          <p className="mt-5 max-w-md leading-relaxed text-paper/70">
            Answers come from your own accounts and goals, so they are specific
            enough to act on. Pick a question to see how it responds.
          </p>

          <div
            role="tablist"
            aria-label="Example questions"
            aria-orientation="vertical"
            onKeyDown={onKeyDown}
            className="mt-10 flex flex-col gap-2"
          >
            {qas.map((item, i) => {
              const selected = i === active;
              return (
                <button
                  key={item.q}
                  ref={(el) => {
                    tabs.current[i] = el;
                  }}
                  role="tab"
                  id={`ask-tab-${i}`}
                  aria-selected={selected}
                  aria-controls="ask-panel"
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(i)}
                  className={`rounded-2xl px-5 py-4 text-left transition-colors focus-visible:outline-2 focus-visible:outline-saffron ${
                    selected
                      ? "bg-paper text-ink"
                      : "text-paper/80 ring-1 ring-paper/15 hover:bg-paper/5"
                  }`}
                >
                  {item.q}
                </button>
              );
            })}
          </div>
        </div>

        <div className="lg:pt-24">
          <div
            id="ask-panel"
            role="tabpanel"
            aria-labelledby={`ask-tab-${active}`}
            aria-live="polite"
            className="rounded-[1.75rem] bg-paper/[0.04] p-6 ring-1 ring-paper/10 sm:p-9"
          >
            <p className="ml-auto w-fit max-w-[90%] rounded-2xl rounded-br-md bg-paper/10 px-4 py-3 text-paper/90">
              {current.q}
            </p>

            <div key={active} className="mt-8 animate-[fade_.35s_ease-out]">
              <p className="font-serif text-3xl leading-tight text-paper sm:text-4xl">
                {current.a[0]}
              </p>
              <p className="mt-4 leading-relaxed text-paper/75">{current.a[1]}</p>

              <div className="mt-8 border-t border-paper/10 pt-5">
                <p className="text-xs uppercase tracking-[0.14em] text-paper/50">
                  Based on
                </p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {current.uses.map((u) => (
                    <li key={u} className="rounded-full bg-paper/10 px-3 py-1 text-xs text-paper/80">
                      {u}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <p className="mt-4 text-xs text-paper/45">
            Sample answers for illustration. Fermor explains your options; it
            does not give regulated investment advice.
          </p>
        </div>
      </div>
    </section>
  );
}
