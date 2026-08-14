// POST /api/subscribe: the footer "Get in touch" form. Emails the enquiry to
// sales@pyngyn.com and sets reply-to to the sender, so hitting reply goes
// straight back to them.
//
// Sending is done over Resend's HTTPS API (a plain fetch), NOT SMTP — so this
// runs fine on Cloudflare Workers, same-origin as the form, with no separate
// server. (Cloudflare can't open the raw TCP socket that Gmail/SMTP needs.)
//
// Configure in the Cloudflare project's env (see .env.example):
//   RESEND_API_KEY  — from resend.com (Dashboard -> API Keys)
//   SUBSCRIBE_FROM   — the from address; MUST be on a domain verified in Resend,
//                      e.g. "sales@pyngyn.com" (default)
//   SUBSCRIBE_TO     — where enquiries land (default sales@pyngyn.com)

export const dynamic = "force-dynamic";

const DEFAULT_FROM = "sales@pyngyn.com";
const DEFAULT_RECIPIENT = "sales@pyngyn.com";
const SUBJECT = "New enquiry from pyngyn.com";
const RESEND_ENDPOINT = "https://api.resend.com/emails";

/** Max submissions per IP per window. Best effort: module state is per server
 *  instance, so this trims abuse rather than guaranteeing a global cap. */
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const hits = new Map<string, number[]>();

type Payload = {
  email?: string;
  path?: string;
  referrer?: string;
  /** honeypot */
  company?: string;
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

/** Trim and bound any user-controlled string so we never forward huge blobs. */
function clean(v: unknown, max = 200): string {
  if (typeof v !== "string") return "";
  return v.trim().slice(0, max);
}

/** Escape before interpolating anything user-supplied into the HTML body. */
function escapeHtml(v: string): string {
  return v
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function clientIp(request: Request): string {
  return (
    request.headers.get("cf-connecting-ip") ||
    (request.headers.get("x-forwarded-for") || "").split(",")[0].trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < RATE_WINDOW_MS);
  if (recent.length >= RATE_LIMIT) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) {
    for (const [key, stamps] of hits) {
      if (!stamps.some((t) => now - t < RATE_WINDOW_MS)) hits.delete(key);
    }
  }
  return false;
}

/* ── the email itself ─────────────────────────────────────────────── */

type Details = {
  email: string;
  submittedAt: string;
  page: string;
  referrer: string;
  country: string;
  userAgent: string;
};

const INK = "#0f1115";
const FAINT = "#9aa1ad";
const LINE = "#e9eaf0";
const ACCENT = "#4f46e5";
const ACCENT_DK = "#3730a3";
const CANVAS = "#f1f2f5";

/**
 * Table-based, inline-styled HTML — the only markup that survives Gmail,
 * Outlook and Apple Mail intact. A branded card: accent gradient header, the
 * sender's address as the headline with an avatar, their details underneath,
 * and a big reply button that opens a new mail straight back to them.
 */
function buildHtml(d: Details): string {
  const initial = escapeHtml((d.email[0] || "?").toUpperCase());
  const mailto = `mailto:${escapeHtml(d.email)}?subject=${encodeURIComponent("Re: your enquiry to PYNGYN")}`;

  const row = (label: string, value: string) => `
        <tr>
          <td style="padding:11px 0;border-bottom:1px solid ${LINE};font:600 11px/1.4 -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;color:${FAINT};text-transform:uppercase;letter-spacing:.07em;width:120px;vertical-align:top;">${escapeHtml(label)}</td>
          <td style="padding:11px 0;border-bottom:1px solid ${LINE};font:400 14px/1.5 -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;color:${INK};word-break:break-word;">${escapeHtml(value)}</td>
        </tr>`;

  return `<!doctype html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>${SUBJECT}</title></head>
<body style="margin:0;padding:24px 12px;background:${CANVAS};">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:580px;border-collapse:collapse;background:#ffffff;border:1px solid ${LINE};border-radius:18px;overflow:hidden;box-shadow:0 12px 40px -22px rgba(15,17,21,.35);">

        <!-- gradient header -->
        <tr><td style="background:linear-gradient(120deg,${ACCENT},${ACCENT_DK});padding:22px 28px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
            <td style="font:800 15px/1 -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;color:#ffffff;letter-spacing:.02em;">PYNGYN</td>
            <td align="right" style="font:600 11px/1 -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;color:rgba(255,255,255,.82);text-transform:uppercase;letter-spacing:.12em;">New enquiry</td>
          </tr></table>
        </td></tr>

        <!-- sender -->
        <tr><td style="padding:26px 28px 6px;">
          <table role="presentation" cellpadding="0" cellspacing="0"><tr>
            <td style="vertical-align:middle;">
              <table role="presentation" cellpadding="0" cellspacing="0"><tr><td style="width:48px;height:48px;background:#eef0ff;border-radius:50%;text-align:center;vertical-align:middle;font:700 20px/48px -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;color:${ACCENT};">${initial}</td></tr></table>
            </td>
            <td style="padding-left:14px;vertical-align:middle;">
              <div style="font:600 11px/1 -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;color:${FAINT};text-transform:uppercase;letter-spacing:.08em;">Wants to get in touch</div>
              <div style="margin-top:5px;font:700 19px/1.3 -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;word-break:break-all;">
                <a href="mailto:${escapeHtml(d.email)}" style="color:${INK};text-decoration:none;">${escapeHtml(d.email)}</a>
              </div>
            </td>
          </tr></table>
        </td></tr>

        <!-- reply CTA -->
        <tr><td style="padding:18px 28px 4px;">
          <a href="${mailto}"
             style="display:block;text-align:center;background:${ACCENT};color:#ffffff;font:700 15px/1 -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;text-decoration:none;padding:15px 22px;border-radius:12px;">
            Reply to ${escapeHtml(d.email.split("@")[0])} &rarr;
          </a>
          <div style="margin-top:8px;text-align:center;font:400 12px/1.5 -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;color:${FAINT};">Or just hit reply — this email's reply-to is set to them.</div>
        </td></tr>

        <!-- details -->
        <tr><td style="padding:14px 28px 6px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
            ${row("Submitted", d.submittedAt)}
            ${row("Page", d.page)}
            ${row("Referrer", d.referrer)}
            ${row("Country", d.country)}
            ${row("Device", d.userAgent)}
          </table>
        </td></tr>

        <tr><td style="padding:16px 28px 26px;">
          <div style="font:400 12px/1.6 -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;color:${FAINT};">
            Sent automatically by the pyngyn.com “Get in touch” form.
          </div>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function buildText(d: Details): string {
  return [
    "New enquiry from pyngyn.com",
    "",
    `Email:     ${d.email}`,
    `Submitted: ${d.submittedAt}`,
    `Page:      ${d.page}`,
    `Referrer:  ${d.referrer}`,
    `Country:   ${d.country}`,
    `Device:    ${d.userAgent}`,
    "",
    "Reply to this email to reach them directly.",
  ].join("\n");
}

/* ── transport (Resend HTTPS API) ─────────────────────────────────── */

type SendResult = { ok: true } | { ok: false; reason: string };

async function sendEmail(opts: {
  from: string;
  to: string;
  replyTo: string;
  html: string;
  text: string;
}): Promise<SendResult> {
  const key = process.env.RESEND_API_KEY;
  if (!key) return { ok: false, reason: "no-key" };

  let res: Response;
  try {
    res = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: `PYNGYN <${opts.from}>`,
        to: [opts.to],
        reply_to: opts.replyTo,
        subject: SUBJECT,
        html: opts.html,
        text: opts.text,
      }),
    });
  } catch (err) {
    return { ok: false, reason: `network: ${String(err).slice(0, 200)}` };
  }

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    return { ok: false, reason: `resend ${res.status}: ${body.slice(0, 300)}` };
  }
  return { ok: true };
}

/* ── handler ──────────────────────────────────────────────────────── */

export async function POST(request: Request): Promise<Response> {
  let body: Payload;
  try {
    body = (await request.json()) as Payload;
  } catch {
    return json({ ok: false, message: "Invalid request." }, 400);
  }

  const email = clean(body.email);
  const page = clean(body.path, 300);
  const referrer = clean(body.referrer, 300);
  const honeypot = clean(body.company);

  // Bots fill the hidden field. Look successful, send nothing.
  if (honeypot) return json({ ok: true });

  if (!isEmail(email)) {
    return json({ ok: false, message: "Enter a valid email address." }, 400);
  }

  if (rateLimited(clientIp(request))) {
    return json({ ok: false, message: "Too many requests. Try again later." }, 429);
  }

  const details: Details = {
    email,
    submittedAt: new Date().toISOString(),
    page: page || "(not provided)",
    referrer: referrer || "(direct)",
    country: request.headers.get("cf-ipcountry") || "(unknown)",
    userAgent: clean(request.headers.get("user-agent"), 240) || "(unknown)",
  };

  const from = process.env.SUBSCRIBE_FROM || DEFAULT_FROM;
  const to = process.env.SUBSCRIBE_TO || DEFAULT_RECIPIENT;

  const result = await sendEmail({
    from,
    to,
    replyTo: email,
    html: buildHtml(details),
    text: buildText(details),
  });

  if (!result.ok) {
    // Loud server-side; the visitor sees a generic message.
    if (result.reason === "no-key") {
      console.error("[subscribe] RESEND_API_KEY is not set — cannot send. Enquiry:", email);
      return json({ ok: false, message: "Email is not configured on the server." }, 503);
    }
    console.error("[subscribe] send failed:", result.reason);
    return json({ ok: false, message: "Could not send right now." }, 502);
  }

  return json({ ok: true });
}
