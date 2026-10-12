import { beforeEach, describe, expect, it, vi } from "vitest";
import { POST } from "./route";

function post(body: string) {
  return POST(
    new Request("http://localhost/api/waitlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
    }),
  );
}

describe("POST /api/waitlist", () => {
  beforeEach(() => {
    vi.spyOn(console, "info").mockImplementation(() => {});
  });

  it("accepts a valid email with no interest", async () => {
    const res = await post(JSON.stringify({ email: "asha@example.com" }));
    expect(res.status).toBe(201);
    expect(await res.json()).toEqual({ ok: true });
  });

  it("accepts a valid email with a known interest", async () => {
    const res = await post(JSON.stringify({ email: "asha@example.com", interest: "invest" }));
    expect(res.status).toBe(201);
  });

  it("does not log the email address", async () => {
    await post(JSON.stringify({ email: "asha@example.com", interest: "tax" }));
    expect(JSON.stringify(vi.mocked(console.info).mock.calls)).not.toContain("asha@example.com");
  });

  it("rejects a body that is not JSON", async () => {
    const res = await post("not json");
    expect(res.status).toBe(400);
  });

  it.each([
    ["missing email", {}],
    ["non-string email", { email: 42 }],
    ["malformed email", { email: "asha@" }],
    ["email over 254 chars", { email: `${"a".repeat(250)}@example.com` }],
  ])("rejects %s with 422", async (_label, body) => {
    const res = await post(JSON.stringify(body));
    expect(res.status).toBe(422);
    expect(await res.json()).toEqual({ error: "Enter a valid email address." });
  });

  it("rejects an interest outside the allow-list", async () => {
    const res = await post(JSON.stringify({ email: "asha@example.com", interest: "crypto" }));
    expect(res.status).toBe(422);
    expect(await res.json()).toEqual({ error: "Unknown interest." });
  });

  it("rejects a JSON null body", async () => {
    const res = await post("null");
    expect(res.status).toBe(422);
  });
});
