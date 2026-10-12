import { fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Forecast } from "./Forecast";

function stat(term: string) {
  const dt = screen.getByText(term, { selector: "dt" });
  return dt.nextElementSibling?.textContent;
}

describe("Forecast", () => {
  it("starts at ₹5,000 a month for 10 years at 12%", () => {
    render(<Forecast />);
    expect(stat("You put in")).toBe("₹6.0 L");
    expect(stat("Estimated value")).toBe("₹11.6 L");
  });

  it("recalculates when the sliders move", () => {
    render(<Forecast />);
    fireEvent.change(screen.getByLabelText("Monthly SIP"), { target: { value: "2000" } });

    expect(screen.getByText("₹2,000", { selector: "output" })).toBeInTheDocument();
    expect(stat("You put in")).toBe("₹2.4 L");
    expect(stat("Estimated value")).toBe("₹4.6 L");
  });

  it("exposes the formatted value to assistive tech", () => {
    render(<Forecast />);
    expect(screen.getByLabelText("Monthly SIP")).toHaveAttribute("aria-valuetext", "₹5,000");
  });

  it("applies a horizon preset and marks it pressed", async () => {
    const user = userEvent.setup();
    render(<Forecast />);
    const horizons = screen.getByRole("group", { name: "Quick horizons" });

    await user.click(within(horizons).getByRole("button", { name: "5y" }));

    expect(screen.getByText("5 years", { selector: "output" })).toBeInTheDocument();
    expect(within(horizons).getByRole("button", { name: "5y" })).toHaveAttribute("aria-pressed", "true");
    expect(within(horizons).getByRole("button", { name: "10y" })).toHaveAttribute("aria-pressed", "false");
    expect(stat("You put in")).toBe("₹3.0 L");
  });

  it("uses singular 'year' for a one-year horizon", () => {
    render(<Forecast />);
    fireEvent.change(screen.getByLabelText("Time"), { target: { value: "1" } });
    expect(screen.getByText("1 year", { selector: "output" })).toBeInTheDocument();
  });

  it("applies a return preset", async () => {
    const user = userEvent.setup();
    render(<Forecast />);
    await user.click(screen.getByRole("button", { name: "Debt-like 7%" }));
    expect(screen.getByText("7%", { selector: "output" })).toBeInTheDocument();
  });

  it("describes the chart for screen readers", () => {
    render(<Forecast />);
    expect(
      screen.getByRole("img", { name: "Projected value grows to ₹11.6 L over 10 years" }),
    ).toBeInTheDocument();
  });
});
