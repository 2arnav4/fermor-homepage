import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { AskDemo } from "./AskDemo";

describe("AskDemo", () => {
  it("shows the first question's answer by default", () => {
    render(<AskDemo />);
    expect(screen.getAllByRole("tab")[0]).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("tabpanel")).toHaveTextContent("₹58,200 in total");
  });

  it("switches the answer when another question is clicked", async () => {
    const user = userEvent.setup();
    render(<AskDemo />);

    await user.click(screen.getByRole("tab", { name: /lost my job/ }));

    expect(screen.getByRole("tab", { name: /lost my job/ })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("tabpanel")).toHaveTextContent("About 3.2 months.");
  });

  it("keeps only the selected tab in the tab order", () => {
    render(<AskDemo />);
    const tabs = screen.getAllByRole("tab");
    expect(tabs.map((t) => t.tabIndex)).toEqual([0, -1, -1, -1]);
  });

  it("moves focus and selection with the arrow keys", async () => {
    const user = userEvent.setup();
    render(<AskDemo />);
    const tabs = screen.getAllByRole("tab");

    tabs[0].focus();
    await user.keyboard("{ArrowDown}");

    expect(tabs[1]).toHaveFocus();
    expect(tabs[1]).toHaveAttribute("aria-selected", "true");
  });

  it("wraps from the first question to the last", async () => {
    const user = userEvent.setup();
    render(<AskDemo />);
    const tabs = screen.getAllByRole("tab");

    tabs[0].focus();
    await user.keyboard("{ArrowUp}");

    expect(tabs[3]).toHaveFocus();
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Not at your current pace.");
  });

  it("links the panel to the active tab", async () => {
    const user = userEvent.setup();
    render(<AskDemo />);
    const tabs = screen.getAllByRole("tab");

    await user.click(tabs[2]);

    expect(screen.getByRole("tabpanel")).toHaveAttribute("aria-labelledby", tabs[2].id);
  });
});
