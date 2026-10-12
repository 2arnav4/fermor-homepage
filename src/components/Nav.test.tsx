import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Nav } from "./Nav";

describe("Nav", () => {
  it("opens and closes the mobile menu from the toggle", async () => {
    const user = userEvent.setup();
    render(<Nav />);
    const toggle = screen.getByRole("button", { name: "Open menu" });
    const menu = document.getElementById("mobile-menu")!;

    expect(menu).not.toBeVisible();
    await user.click(toggle);

    expect(toggle).toHaveAttribute("aria-expanded", "true");
    expect(toggle).toHaveAccessibleName("Close menu");
    expect(menu).toBeVisible();
  });

  it("locks page scroll while open and restores it on Escape", async () => {
    const user = userEvent.setup();
    render(<Nav />);

    await user.click(screen.getByRole("button", { name: "Open menu" }));
    expect(document.body.style.overflow).toBe("hidden");

    await user.keyboard("{Escape}");
    expect(document.body.style.overflow).toBe("");
    expect(screen.getByRole("button", { name: "Open menu" })).toHaveAttribute("aria-expanded", "false");
  });

  it("closes the menu after a link is chosen", async () => {
    const user = userEvent.setup();
    render(<Nav />);

    await user.click(screen.getByRole("button", { name: "Open menu" }));
    const menu = document.getElementById("mobile-menu")!;
    await user.click(menu.querySelector('a[href="#faq"]')!);

    expect(menu).not.toBeVisible();
  });
});
