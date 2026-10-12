"use client";

import { useMemo, useState, type PointerEvent } from "react";
import { formatINR, formatINRShort, projectSip, type SipPoint } from "@/lib/money";

const HORIZONS = [2, 5, 10, 15];
const RATE_PRESETS = [
  { label: "Debt-like", rate: 7 },
  { label: "Balanced", rate: 10 },
  { label: "Equity", rate: 12 },
];

export function Forecast() {
  const [monthly, setMonthly] = useState(5000);
  const [years, setYears] = useState(10);
  const [rate, setRate] = useState(12);

  const points = useMemo(() => projectSip(monthly, rate, years), [monthly, rate, years]);
  const final = points[points.length - 1];
  const gains = final.value - final.invested;

  return (
    <section id="forecast" className="mx-auto max-w-6xl px-5 py-20 sm:px-8 md:py-28">
      <div className="max-w-2xl">
        <p className="text-sm font-medium text-forest">Forecast</p>
        <h2 className="mt-4 font-serif text-4xl leading-[1.05] sm:text-5xl">
          Start small. See how far it goes.
        </h2>
        <p className="mt-5 leading-relaxed text-ink-2">
          A monthly SIP, compounded. Move the sliders and the numbers update. No
          sign-up, nothing saved.
        </p>
      </div>

      <div className="mt-12 grid overflow-hidden rounded-[1.75rem] border border-line bg-white lg:grid-cols-[0.8fr_1.2fr]">
        {/* Controls */}
        <div className="space-y-9 border-b border-line p-6 sm:p-8 lg:border-r lg:border-b-0">
          <Slider
            id="sip-monthly"
            label="Monthly SIP"
            value={monthly}
            display={formatINR(monthly)}
            min={500}
            max={100000}
            step={500}
            onChange={setMonthly}
            hint="Minimum ₹500"
          />

          <div>
            <Slider
              id="sip-years"
              label="Time"
              value={years}
              display={`${years} ${years === 1 ? "year" : "years"}`}
              min={1}
              max={30}
              step={1}
              onChange={setYears}
            />
            <Pills
              label="Quick horizons"
              options={HORIZONS.map((h) => ({ key: h, label: `${h}y` }))}
              selected={years}
              onSelect={setYears}
            />
          </div>

          <div>
            <Slider
              id="sip-rate"
              label="Expected annual return"
              value={rate}
              display={`${rate}%`}
              min={4}
              max={16}
              step={0.5}
              onChange={setRate}
            />
            <Pills
              label="Return presets"
              options={RATE_PRESETS.map((p) => ({ key: p.rate, label: `${p.label} ${p.rate}%` }))}
              selected={rate}
              onSelect={setRate}
            />
          </div>
        </div>

        {/* Results */}
        <div className="p-6 sm:p-8">
          <dl className="grid grid-cols-3 gap-4" aria-live="polite">
            <Stat term="You put in" value={formatINRShort(final.invested)} />
            <Stat term="Growth" value={formatINRShort(gains)} accent />
            <Stat term="Estimated value" value={formatINRShort(final.value)} strong />
          </dl>

          <Chart points={points} />

          <p className="mt-4 text-xs leading-relaxed text-muted">
            Illustrative only. Assumes a constant return and contributions at the
            start of each month. Real returns vary and are not guaranteed.
          </p>
        </div>
      </div>
    </section>
  );
}

type SliderProps = {
  id: string;
  label: string;
  value: number;
  display: string;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  hint?: string;
};

function Slider({ id, label, value, display, min, max, step, onChange, hint }: SliderProps) {
  const fill = ((value - min) / (max - min)) * 100;
  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <label htmlFor={id} className="text-sm text-ink-2">
          {label}
        </label>
        <output htmlFor={id} className="num text-xl font-semibold tracking-tight">
          {display}
        </output>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        aria-valuetext={display}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-3"
        style={{ ["--fill" as string]: `${fill}%` }}
      />
      {hint && <p className="mt-1 text-xs text-muted">{hint}</p>}
    </div>
  );
}

type PillsProps = {
  label: string;
  options: { key: number; label: string }[];
  selected: number;
  onSelect: (v: number) => void;
};

function Pills({ label, options, selected, onSelect }: PillsProps) {
  return (
    <div role="group" aria-label={label} className="mt-3 flex flex-wrap gap-2">
      {options.map((o) => (
        <button
          key={o.key}
          type="button"
          aria-pressed={selected === o.key}
          onClick={() => onSelect(o.key)}
          className={`num rounded-full px-3 py-1.5 text-xs transition-colors ${
            selected === o.key
              ? "bg-ink text-paper"
              : "bg-paper text-ink-2 hover:bg-paper-2"
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

function Stat({ term, value, accent, strong }: { term: string; value: string; accent?: boolean; strong?: boolean }) {
  return (
    <div>
      <dt className="text-xs text-muted sm:text-sm">{term}</dt>
      <dd
        className={`num mt-1 font-semibold tracking-tight ${
          strong ? "text-xl sm:text-3xl" : "text-lg sm:text-2xl"
        } ${accent ? "text-forest" : ""}`}
      >
        {value}
      </dd>
    </div>
  );
}

const W = 600;
const H = 260;
const PAD = { top: 16, right: 12, bottom: 4, left: 12 };

function Chart({ points }: { points: SipPoint[] }) {
  const [hover, setHover] = useState<number | null>(null);

  const years = points.length - 1;
  const maxY = points[years].value * 1.08;
  const x = (year: number) => PAD.left + (year / years) * (W - PAD.left - PAD.right);
  const y = (v: number) => H - PAD.bottom - (v / maxY) * (H - PAD.top - PAD.bottom);

  const line = (key: "value" | "invested") =>
    points.map((p, i) => `${i ? "L" : "M"}${x(p.year).toFixed(1)} ${y(p[key]).toFixed(1)}`).join(" ");
  const area = (key: "value" | "invested") =>
    `${line(key)} L${x(years)} ${y(0)} L${x(0)} ${y(0)} Z`;

  // Label every year on short horizons, fewer on long ones
  const tickEvery = years <= 6 ? 1 : years <= 15 ? 5 : 10;
  const ticks = points.filter((p) => p.year % tickEvery === 0 || p.year === years);

  function onMove(e: PointerEvent<SVGSVGElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    const svgX = ratio * W;
    const yr = Math.round(((svgX - PAD.left) / (W - PAD.left - PAD.right)) * years);
    setHover(Math.min(years, Math.max(0, yr)));
  }

  const hp = hover !== null ? points[hover] : null;

  return (
    <div className="relative mt-8">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="h-auto w-full touch-none select-none"
        role="img"
        aria-label={`Projected value grows to ${formatINRShort(points[years].value)} over ${years} years`}
        onPointerMove={onMove}
        onPointerDown={onMove}
        onPointerLeave={() => setHover(null)}
      >
        <defs>
          <linearGradient id="fc-value" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#1d5c43" stopOpacity="0.22" />
            <stop offset="1" stopColor="#1d5c43" stopOpacity="0.02" />
          </linearGradient>
        </defs>

        {[0.25, 0.5, 0.75, 1].map((f) => (
          <line
            key={f}
            x1={PAD.left}
            x2={W - PAD.right}
            y1={y(maxY * f)}
            y2={y(maxY * f)}
            stroke="#ece7db"
            strokeDasharray="2 4"
          />
        ))}

        <path d={area("value")} fill="url(#fc-value)" />
        <path d={area("invested")} fill="#ece7db" />
        <path d={line("invested")} fill="none" stroke="#6b766f" strokeWidth="1.5" strokeDasharray="4 4" />
        <path d={line("value")} fill="none" stroke="#1d5c43" strokeWidth="2.5" strokeLinejoin="round" />

        <line x1={PAD.left} x2={W - PAD.right} y1={y(0)} y2={y(0)} stroke="#ddd6c6" />
        {hp && (
          <g>
            <line x1={x(hp.year)} x2={x(hp.year)} y1={PAD.top} y2={y(0)} stroke="#13201a" strokeOpacity="0.25" />
            <circle cx={x(hp.year)} cy={y(hp.value)} r="5" fill="#fff" stroke="#1d5c43" strokeWidth="2.5" />
          </g>
        )}
      </svg>

      {/* Axis labels live in HTML so they keep a readable size when the SVG scales down */}
      <div className="relative mt-2 h-4 text-xs text-muted" aria-hidden="true">
        {ticks.map((t) => (
          <span
            key={t.year}
            className="num absolute top-0"
            style={{
              left: `${(x(t.year) / W) * 100}%`,
              transform: `translateX(${t.year === 0 ? "0" : t.year === years ? "-100%" : "-50%"})`,
            }}
          >
            {t.year === 0 ? "Today" : `${t.year}y`}
          </span>
        ))}
      </div>

      {hp && hp.year > 0 && (
        <div
          className="pointer-events-none absolute top-0 rounded-xl bg-ink px-3 py-2 text-xs text-paper"
          style={{
            left: `${(x(hp.year) / W) * 100}%`,
            transform: `translateX(${hp.year > years / 2 ? "-105%" : "5%"})`,
          }}
        >
          <p className="font-medium">Year {hp.year}</p>
          <p className="num mt-0.5 text-paper/80">Value {formatINR(hp.value)}</p>
          <p className="num text-paper/60">Put in {formatINR(hp.invested)}</p>
        </div>
      )}

      <div className="mt-3 flex gap-5 text-xs text-ink-2">
        <span className="flex items-center gap-2">
          <span className="h-0.5 w-4 bg-forest" /> Estimated value
        </span>
        <span className="flex items-center gap-2">
          <span className="h-0 w-4 border-t-[1.5px] border-dashed border-muted" /> Amount invested
        </span>
      </div>
    </div>
  );
}
