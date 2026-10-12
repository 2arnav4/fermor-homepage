import { describe, expect, it } from "vitest";
import { formatINR, formatINRShort, projectSip } from "./money";

describe("formatINR", () => {
  it("uses Indian digit grouping", () => {
    expect(formatINR(642180)).toBe("₹6,42,180");
    expect(formatINR(12345678)).toBe("₹1,23,45,678");
  });

  it("rounds to whole rupees", () => {
    expect(formatINR(499.6)).toBe("₹500");
    expect(formatINR(0)).toBe("₹0");
  });
});

describe("formatINRShort", () => {
  it("keeps small amounts in full", () => {
    expect(formatINRShort(58200)).toBe("₹58,200");
  });

  it("switches to lakh at 1,00,000", () => {
    expect(formatINRShort(100000)).toBe("₹1.0\u00A0L");
    expect(formatINRShort(464678)).toBe("₹4.6\u00A0L");
  });

  it("switches to crore at 1,00,00,000", () => {
    expect(formatINRShort(10000000)).toBe("₹1.00\u00A0Cr");
    expect(formatINRShort(23456789)).toBe("₹2.35\u00A0Cr");
  });
});

describe("projectSip", () => {
  it("returns one point per year, starting from zero", () => {
    const points = projectSip(5000, 12, 10);
    expect(points).toHaveLength(11);
    expect(points[0]).toEqual({ year: 0, invested: 0, value: 0 });
  });

  it("tracks the amount invested exactly", () => {
    const points = projectSip(5000, 12, 10);
    expect(points[10].invested).toBe(5000 * 12 * 10);
  });

  // Reference: 2,000/month, 12% p.a., 10 years, paid at start of month.
  // FV = P * ((1+r)^n - 1) / r * (1+r) = 4,64,678.15
  it("matches the annuity-due formula", () => {
    const final = projectSip(2000, 12, 10).at(-1)!;
    expect(final.value).toBeCloseTo(464678.15, 1);
  });

  it("returns invested amount unchanged at 0% return", () => {
    const final = projectSip(1000, 0, 5).at(-1)!;
    expect(final.value).toBe(final.invested);
  });

  it("never projects a value below the amount invested for a positive rate", () => {
    for (const p of projectSip(500, 7, 30)) {
      expect(p.value).toBeGreaterThanOrEqual(p.invested);
    }
  });
});
