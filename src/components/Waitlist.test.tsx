import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Waitlist } from "./Waitlist";

function mockFetch(status: number, body: unknown) {
  const fetchMock = vi.fn().mockResolvedValue(
    new Response(JSON.stringify(body), {
      status,
      headers: { "Content-Type": "application/json" },
    }),
  );
  vi.stubGlobal("fetch", fetchMock);
  return fetchMock;
}

describe("Waitlist", () => {
  it("blocks a malformed email before any network call", async () => {
    const user = userEvent.setup();
    const fetchMock = mockFetch(201, { ok: true });
    render(<Waitlist />);

    await user.type(screen.getByLabelText("Email address"), "asha@");
    await user.click(screen.getByRole("button", { name: "Join the waitlist" }));

    expect(screen.getByRole("alert")).toHaveTextContent("That email doesn't look right.");
    expect(screen.getByLabelText("Email address")).toHaveAttribute("aria-invalid", "true");
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("clears the error as soon as the user edits the email", async () => {
    const user = userEvent.setup();
    mockFetch(201, { ok: true });
    render(<Waitlist />);

    await user.type(screen.getByLabelText("Email address"), "asha@");
    await user.click(screen.getByRole("button", { name: "Join the waitlist" }));
    await user.type(screen.getByLabelText("Email address"), "e");

    expect(screen.getByRole("alert")).toBeEmptyDOMElement();
  });

  it("posts the trimmed email and selected interest, then confirms", async () => {
    const user = userEvent.setup();
    const fetchMock = mockFetch(201, { ok: true });
    render(<Waitlist />);

    await user.click(screen.getByRole("button", { name: "Start investing" }));
    await user.type(screen.getByLabelText("Email address"), "  asha@example.com ");
    await user.click(screen.getByRole("button", { name: "Join the waitlist" }));

    expect(fetchMock).toHaveBeenCalledWith(
      "/api/waitlist",
      expect.objectContaining({ method: "POST" }),
    );
    const body = JSON.parse(fetchMock.mock.calls[0][1].body);
    expect(body).toEqual({ email: "asha@example.com", interest: "invest" });

    expect(await screen.findByRole("status")).toHaveTextContent("You’re on the list.");
    expect(screen.getByRole("status")).toHaveTextContent("asha@example.com");
  });

  it("toggles an interest off when clicked twice", async () => {
    const user = userEvent.setup();
    render(<Waitlist />);
    const chip = screen.getByRole("button", { name: "Plan a goal" });

    await user.click(chip);
    expect(chip).toHaveAttribute("aria-pressed", "true");
    await user.click(chip);
    expect(chip).toHaveAttribute("aria-pressed", "false");
  });

  it("shows the server's error message when the API rejects", async () => {
    const user = userEvent.setup();
    mockFetch(422, { error: "Enter a valid email address." });
    render(<Waitlist />);

    await user.type(screen.getByLabelText("Email address"), "asha@example.com");
    await user.click(screen.getByRole("button", { name: "Join the waitlist" }));

    expect(await screen.findByText("Enter a valid email address.")).toBeInTheDocument();
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });

  it("falls back to a generic message on a network failure", async () => {
    const user = userEvent.setup();
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new TypeError("Failed to fetch")));
    render(<Waitlist />);

    await user.type(screen.getByLabelText("Email address"), "asha@example.com");
    await user.click(screen.getByRole("button", { name: "Join the waitlist" }));

    expect(await screen.findByRole("alert")).toHaveTextContent("Failed to fetch");
  });
});
