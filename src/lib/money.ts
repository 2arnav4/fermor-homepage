const inr = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

/** ₹12,34,567 (Indian digit grouping) */
export function formatINR(value: number): string {
  return inr.format(Math.round(value));
}

/** ₹12.3 L / ₹1.24 Cr, for chart labels and headline figures. The non-breaking
 * space keeps the unit on the same line as the number. */
export function formatINRShort(value: number): string {
  if (value >= 1e7) return `₹${(value / 1e7).toFixed(2)}\u00A0Cr`;
  if (value >= 1e5) return `₹${(value / 1e5).toFixed(1)}\u00A0L`;
  return formatINR(value);
}

export type SipPoint = { year: number; invested: number; value: number };

/**
 * Future value of a monthly SIP, compounded monthly, paid at the start of
 * each month (the convention most Indian AMC calculators use).
 * Returns one point per year, starting at year 0.
 */
export function projectSip(
  monthly: number,
  annualRatePct: number,
  years: number,
): SipPoint[] {
  const r = annualRatePct / 100 / 12;
  const points: SipPoint[] = [{ year: 0, invested: 0, value: 0 }];

  for (let y = 1; y <= years; y++) {
    const n = y * 12;
    const value =
      r === 0 ? monthly * n : monthly * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
    points.push({ year: y, invested: monthly * n, value });
  }
  return points;
}
