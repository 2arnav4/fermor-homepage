const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const INTERESTS = ["track", "invest", "goal", "tax"] as const;

type Interest = (typeof INTERESTS)[number];

function isInterest(v: unknown): v is Interest {
  return typeof v === "string" && (INTERESTS as readonly string[]).includes(v);
}

/**
 * Validates a waitlist sign-up. Persistence is intentionally out of scope
 * for this assignment; swap the log line for a DB insert or an email-tool API.
 */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const { email, interest } = (body ?? {}) as Record<string, unknown>;

  if (typeof email !== "string" || email.length > 254 || !EMAIL_RE.test(email.trim())) {
    return Response.json({ error: "Enter a valid email address." }, { status: 422 });
  }
  if (interest !== undefined && !isInterest(interest)) {
    return Response.json({ error: "Unknown interest." }, { status: 422 });
  }

  console.info("[waitlist] sign-up", { interest: interest ?? "none" });
  return Response.json({ ok: true }, { status: 201 });
}
