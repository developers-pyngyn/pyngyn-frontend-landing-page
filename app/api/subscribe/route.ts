// POST /api/subscribe: the footer "Get in touch" newsletter form. Sends the
// subscriber's details to sales@pyngyn.com over Gmail SMTP, with replyTo set to
// the subscriber so hitting reply goes straight back to them.
//
// Runtime: nodejs, not edge. SMTP needs a raw TCP socket, which the edge runtime
// (and Cloudflare Workers) cannot open — see the note in .env.example.
//
// Configure in your hosting dashboard (see .env.example):
//   SMTP_USER  — the Gmail address that sends, e.g. sales@pyngyn.com
//   SMTP_PASS  — a Google **App Password** (16 chars, 2FA required). A normal
//                account password will be rejected by Gmail.
//   SMTP_HOST  — defaults to smtp.gmail.com
//   SMTP_PORT  — defaults to 587 (STARTTLS); 465 switches to implicit TLS
//   SUBSCRIBE_TO / SUBSCRIBE_FROM — default to SMTP_USER
//
// Any method other than POST gets a 405 from the App Router, since only POST
// is exported here.

import nodemailer from "nodemailer";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const DEFAULT_RECIPIENT = "sales@pyngyn.com";
const SUBJECT = "New growth-tips subscriber";

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
const MUTED = "#6b7280";
const LINE = "#e9eaf0";
const ACCENT = "#4f46e5";

/**
 * Table-based, inline-styled HTML — the only markup that survives Gmail,
 * Outlook and Apple Mail intact. Kept deliberately plain: one card, the
 * subscriber's address as the headline, their details underneath, and a reply
 * button that opens a new mail to them.
 */
function buildHtml(d: Details): string {
  const row = (label: string, value: string) => `
        <tr>
          <td style="padding:10px 0;border-bottom:1px solid ${LINE};font:500 12px/1.4 -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;color:${MUTED};text-transform:uppercase;letter-spacing:.06em;width:132px;vertical-align:top;">${escapeHtml(label)}</td>
          <td style="padding:10px 0;border-bottom:1px solid ${LINE};font:400 14px/1.5 -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;color:${INK};word-break:break-word;">${escapeHtml(value)}</td>
        </tr>`;

  return `<!doctype html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>${SUBJECT}</title></head>
<body style="margin:0;padding:24px 12px;background:#f1f2f5;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;border-collapse:collapse;background:#ffffff;border:1px solid ${LINE};border-radius:16px;overflow:hidden;">

        <tr><td style="height:4px;background:${ACCENT};"></td></tr>

        <tr><td style="padding:28px 28px 8px;">
          <div style="font:600 11px/1 -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;color:${MUTED};text-transform:uppercase;letter-spacing:.12em;">PYNGYN &middot; Growth tips</div>
          <h1 style="margin:12px 0 4px;font:700 22px/1.25 -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;color:${INK};">New subscriber</h1>
          <p style="margin:0;font:400 14px/1.6 -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;color:${MUTED};">
            Someone signed up from the site footer. Reply to this email to reach them directly.
          </p>
        </td></tr>

        <tr><td style="padding:16px 28px 0;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;background:#f7f7fb;border:1px solid ${LINE};border-radius:12px;">
            <tr><td style="padding:16px 18px;">
              <div style="font:600 11px/1 -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;color:${MUTED};text-transform:uppercase;letter-spacing:.08em;">Email address</div>
              <div style="margin-top:6px;font:600 18px/1.35 -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;word-break:break-all;">
                <a href="mailto:${encodeURIComponent(d.email).replace(/%40/g, "@")}" style="color:${ACCENT};text-decoration:none;">${escapeHtml(d.email)}</a>
              </div>
            </td></tr>
          </table>
        </td></tr>

        <tr><td style="padding:8px 28px 4px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
            ${row("Submitted", d.submittedAt)}
            ${row("Page", d.page)}
            ${row("Referrer", d.referrer)}
            ${row("Country", d.country)}
            ${row("Device", d.userAgent)}
          </table>
        </td></tr>

        <tr><td style="padding:22px 28px 28px;">
          <a href="mailto:${escapeHtml(d.email)}?subject=${encodeURIComponent("Thanks for subscribing to PYNGYN growth tips")}"
             style="display:inline-block;background:${ACCENT};color:#ffffff;font:600 14px/1 -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;text-decoration:none;padding:13px 22px;border-radius:999px;">
            Reply to ${escapeHtml(d.email.split("@")[0])}
          </a>
        </td></tr>

        <tr><td style="padding:0 28px 24px;">
          <div style="border-top:1px solid ${LINE};padding-top:14px;font:400 12px/1.6 -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;color:${MUTED};">
            Sent automatically by the pyngyn.com footer form.
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
    "New growth-tips subscriber",
    "",
    `Email:     ${d.email}`,
    `Submitted: ${d.submittedAt}`,
    `Page:      ${d.page}`,
    `Referrer:  ${d.referrer}`,
    `Country:   ${d.country}`,
    `Device:    ${d.userAgent}`,
    "",
    "Reply to this email to reach the subscriber directly.",
  ].join("\n");
}

/* ── transport ────────────────────────────────────────────────────── */

/** Created once per server instance and reused; nodemailer pools connections. */
let transporter: nodemailer.Transporter | null = null;

function getTransport() {
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!user || !pass) return null;

  if (!transporter) {
    const port = Number(process.env.SMTP_PORT || 587);
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port,
      // 465 is implicit TLS; 587 upgrades with STARTTLS
      secure: port === 465,
      auth: { user, pass },
      pool: true,
      maxConnections: 2,
    });
  }
  return transporter;
}

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

  const transport = getTransport();
  if (!transport) {
    // Loud, because a silent success here is how subscribers get lost.
    console.error(
      "[subscribe] SMTP_USER / SMTP_PASS are not set — cannot send. Subscriber:",
      email,
    );
    return json({ ok: false, message: "Email is not configured on the server." }, 503);
  }

  const details: Details = {
    email,
    submittedAt: new Date().toISOString(),
    page: page || "(not provided)",
    referrer: referrer || "(direct)",
    country: request.headers.get("cf-ipcountry") || "(unknown)",
    userAgent: clean(request.headers.get("user-agent"), 240) || "(unknown)",
  };

  const from = process.env.SUBSCRIBE_FROM || process.env.SMTP_USER!;
  const to = process.env.SUBSCRIBE_TO || DEFAULT_RECIPIENT;

  try {
    await transport.sendMail({
      from: `PYNGYN <${from}>`,
      to,
      replyTo: email,
      subject: SUBJECT,
      text: buildText(details),
      html: buildHtml(details),
    });
  } catch (err) {
    // Log the provider's reason server-side; the visitor sees a generic message.
    console.error("[subscribe] SMTP send failed", err);
    return json({ ok: false, message: "Could not sign you up right now." }, 502);
  }

  return json({ ok: true });
}
