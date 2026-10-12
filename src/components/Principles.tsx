const principles = [
  {
    title: "Every number shows its working",
    body: "Forecasts list their assumptions. Answers list the accounts they used. If you can't see why, you shouldn't have to trust it.",
  },
  {
    title: "Education, not advice",
    body: "Fermor is not a SEBI-registered investment adviser. It lays out the trade-offs clearly; the decision stays yours.",
  },
  {
    title: "Free where it counts",
    body: "Calculators work without an account. Sign up only when you want your results to stick around.",
  },
];

const calculators = ["SIP", "Lumpsum", "EMI", "Home loan", "FD", "PPF", "Compound interest", "Income tax"];

export function Principles() {
  return (
    <section className="border-y border-line bg-paper-2/60">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 md:py-24">
        <h2 className="max-w-xl font-serif text-4xl leading-[1.05] sm:text-5xl">
          Honest about what it is.
        </h2>

        <div className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
          {principles.map((p, i) => (
            <div key={p.title} className="border-t border-ink/15 pt-5">
              <p className="num text-sm text-muted">0{i + 1}</p>
              <h3 className="mt-3 text-lg font-semibold tracking-tight">{p.title}</h3>
              <p className="mt-2 leading-relaxed text-ink-2">{p.body}</p>
            </div>
          ))}
        </div>

        <p className="mt-14 max-w-3xl leading-relaxed text-ink-2">
          <span className="font-medium text-ink">Free calculators: </span>
          {calculators.join(" · ")}
        </p>
      </div>
    </section>
  );
}
