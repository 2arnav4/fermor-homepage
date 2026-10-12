const faqs = [
  {
    q: "What is Fermor?",
    a: "A personal finance app for India. It brings your spending, savings and investments into one view, explains what the numbers mean, and helps you invest in stocks, mutual funds and ETFs from the same place.",
  },
  {
    q: "Who is it for?",
    a: "Anyone who earns, spends and wants to feel in control of it. It's especially useful if you've just started earning, have an EMI or two, or have been meaning to start a SIP for a while.",
  },
  {
    q: "Is Fermor a financial adviser?",
    a: "No. Fermor is not a SEBI-registered investment adviser and does not give personalised investment or tax advice. Its tools and answers are for education, to help you understand your options before you decide.",
  },
  {
    q: "Do I need an account to use the calculators?",
    a: "No. All calculators are free and work without signing up. An account only lets you save results and come back to them.",
  },
  {
    q: "How much do I need to start investing?",
    a: "You can start a SIP from ₹500 a month. The forecast above shows what that becomes at different rates and time frames.",
  },
];

export function Faq() {
  return (
    <section id="faq" className="mx-auto grid max-w-6xl gap-10 px-5 py-20 sm:px-8 md:grid-cols-[0.8fr_1.2fr] md:py-28">
      <h2 className="font-serif text-4xl leading-[1.05] sm:text-5xl">Questions, answered.</h2>

      <div className="divide-y divide-line border-y border-line">
        {faqs.map((f) => (
          <details key={f.q} className="group">
            <summary className="flex cursor-pointer items-center justify-between gap-6 py-5 text-lg font-medium focus-visible:outline-2 focus-visible:outline-saffron">
              {f.q}
              <span
                className="grid h-7 w-7 shrink-0 place-items-center rounded-full ring-1 ring-line transition-transform group-open:rotate-45"
                aria-hidden="true"
              >
                <svg viewBox="0 0 12 12" className="h-3 w-3">
                  <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </span>
            </summary>
            <p className="max-w-xl pb-6 leading-relaxed text-ink-2">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
