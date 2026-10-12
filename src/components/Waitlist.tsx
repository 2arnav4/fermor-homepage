"use client";

import { useState, type FormEvent } from "react";

const interests = [
  { value: "track", label: "Track spending" },
  { value: "invest", label: "Start investing" },
  { value: "goal", label: "Plan a goal" },
  { value: "tax", label: "Sort out taxes" },
];

type Status =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "error"; message: string }
  | { kind: "done" };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function Waitlist() {
  const [email, setEmail] = useState("");
  const [interest, setInterest] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!EMAIL_RE.test(email.trim())) {
      setStatus({ kind: "error", message: "That email doesn't look right." });
      return;
    }

    setStatus({ kind: "submitting" });
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), interest: interest ?? undefined }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(data.error ?? "Something went wrong. Try again.");
      }
      setStatus({ kind: "done" });
    } catch (err) {
      setStatus({
        kind: "error",
        message: err instanceof Error ? err.message : "Something went wrong. Try again.",
      });
    }
  }

  return (
    <section id="waitlist" className="px-3 pb-3 sm:px-5 sm:pb-5">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-forest px-6 py-16 text-paper sm:px-12 md:py-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-end">
          <div>
            <h2 className="font-serif text-5xl leading-[1] sm:text-6xl">
              Your money, <em>finally legible.</em>
            </h2>
            <p className="mt-5 max-w-md leading-relaxed text-paper/75">
              Fermor is opening access in batches. Leave your email and we&rsquo;ll
              tell you when it&rsquo;s your turn. No spam, one email when you&rsquo;re in.
            </p>
          </div>

          {status.kind === "done" ? (
            <div role="status" className="rounded-2xl bg-paper/10 p-6 ring-1 ring-paper/15">
              <p className="font-serif text-3xl">You&rsquo;re on the list.</p>
              <p className="mt-2 text-paper/75">
                We&rsquo;ll write to <span className="font-medium text-paper">{email.trim()}</span>{" "}
                when your access opens.
              </p>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate>
              <fieldset>
                <legend className="text-sm text-paper/75">What would you use Fermor for first?</legend>
                <div className="mt-3 flex flex-wrap gap-2">
                  {interests.map((i) => (
                    <button
                      key={i.value}
                      type="button"
                      aria-pressed={interest === i.value}
                      onClick={() => setInterest((cur) => (cur === i.value ? null : i.value))}
                      className={`rounded-full px-4 py-2 text-sm transition-colors ${
                        interest === i.value
                          ? "bg-paper text-forest"
                          : "ring-1 ring-paper/30 hover:bg-paper/10"
                      }`}
                    >
                      {i.label}
                    </button>
                  ))}
                </div>
              </fieldset>

              <label htmlFor="wl-email" className="sr-only">
                Email address
              </label>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <input
                  id="wl-email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status.kind === "error") setStatus({ kind: "idle" });
                  }}
                  aria-invalid={status.kind === "error"}
                  aria-describedby="wl-error"
                  className="min-w-0 flex-1 rounded-full bg-paper px-5 py-3.5 text-ink placeholder:text-muted focus:outline-2 focus:outline-offset-2 focus:outline-saffron"
                />
                <button
                  type="submit"
                  disabled={status.kind === "submitting"}
                  className="rounded-full bg-saffron px-6 py-3.5 font-medium text-ink transition hover:brightness-105 disabled:opacity-60"
                >
                  {status.kind === "submitting" ? "Adding you…" : "Join the waitlist"}
                </button>
              </div>
              <p id="wl-error" role="alert" className="mt-3 min-h-5 text-sm text-[#ffd9a0]">
                {status.kind === "error" ? status.message : ""}
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
