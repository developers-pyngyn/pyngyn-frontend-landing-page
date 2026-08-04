// POST /api/demo: receives a native demo booking. Validates lightly and either
// forwards to an optional webhook (DEMO_WEBHOOK_URL) or logs the payload so it
// shows up in Cloudflare/Vercel function logs. Runs on the edge runtime so it
// works under @cloudflare/next-on-pages.
//
// Configure in your hosting dashboard (optional):
//   DEMO_WEBHOOK_URL  — Slack/Zapier/HTTP endpoint that should receive the
//                       JSON payload. When unset, requests succeed and are
//                       only logged on the server.

export const runtime = "edge";

type Booking = {
  date?: string;
  time?: string;
  timezone?: string;
  name?: string;
  email?: string;
  company?: string;
  teamSize?: string;
  focus?: string;
  notes?: string;
};

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

function isEmail(v: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
}

// Date pattern YYYY-MM-DD; time pattern HH:MM (24h).
function isIsoDate(v: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(v);
}
function isClockTime(v: string): boolean {
  return /^([01]\d|2[0-3]):[0-5]\d$/.test(v);
}

// Trim and bound any user-controlled string so we never persist huge blobs.
function clean(v: unknown, max = 500): string {
  if (typeof v !== "string") return "";
  return v.trim().slice(0, max);
}

export async function POST(request: Request): Promise<Response> {
  let body: Booking;
  try {
    body = (await request.json()) as Booking;
  } catch {
    return json({ error: "Invalid JSON body." }, 400);
  }

  const payload = {
    date: clean(body.date, 10),
    time: clean(body.time, 5),
    timezone: clean(body.timezone, 60),
    name: clean(body.name, 120),
    email: clean(body.email, 200),
    company: clean(body.company, 200),
    teamSize: clean(body.teamSize, 20),
    focus: clean(body.focus, 60),
    notes: clean(body.notes, 1000),
  };

  if (!payload.name || payload.name.length < 2) {
    return json({ error: "Please share your full name." }, 400);
  }
  if (!isEmail(payload.email)) {
    return json({ error: "That email doesn't look right." }, 400);
  }
  if (!payload.company) {
    return json({ error: "Please share your company." }, 400);
  }
  if (!isIsoDate(payload.date)) {
    return json({ error: "Please pick a valid date." }, 400);
  }
  if (!isClockTime(payload.time)) {
    return json({ error: "Please pick a valid time." }, 400);
  }

  const record = {
    ...payload,
    receivedAt: new Date().toISOString(),
    userAgent: request.headers.get("user-agent") || "",
  };

  const webhook = process.env.DEMO_WEBHOOK_URL;
  if (webhook) {
    try {
      const upstream = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(record),
      });
      if (!upstream.ok) {
        const detail = await upstream.text().catch(() => "");
        console.error("[demo] webhook failed", upstream.status, detail);
        // Still return 200 to the visitor — we'll follow up manually from logs.
      }
    } catch (err) {
      console.error("[demo] webhook error", err);
    }
  } else {
    // Best-effort visibility when no webhook is configured.
    console.log("[demo] booking", record);
  }

  return json({ ok: true });
}
