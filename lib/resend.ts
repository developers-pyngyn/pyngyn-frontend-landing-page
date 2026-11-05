// Minimal Resend client over plain fetch, so it runs on Cloudflare's edge
// runtime (no SMTP sockets there). Shared by the subscribe and demo routes.
//
// Needs RESEND_API_KEY in the Cloudflare project's env; the from address must
// be on a domain verified in Resend (see .env.example).

const RESEND_ENDPOINT = "https://api.resend.com/emails";

export type SendResult = { ok: true } | { ok: false; reason: string };

export type EmailAttachment = {
  filename: string;
  /** Plain-text content; base64-encoded before sending. */
  content: string;
  contentType?: string;
};

export async function sendEmail(opts: {
  from: string;
  to: string | string[];
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
  attachments?: EmailAttachment[];
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
        to: Array.isArray(opts.to) ? opts.to : [opts.to],
        reply_to: opts.replyTo,
        subject: opts.subject,
        html: opts.html,
        text: opts.text,
        attachments: opts.attachments?.map((a) => ({
          filename: a.filename,
          content: toBase64(a.content),
          content_type: a.contentType,
        })),
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

/** UTF-8 safe base64 (btoa alone only handles Latin-1). */
function toBase64(text: string): string {
  let binary = "";
  for (const byte of new TextEncoder().encode(text)) binary += String.fromCharCode(byte);
  return btoa(binary);
}

/** Escape before interpolating anything user-supplied into an HTML email. */
export function escapeHtml(v: string): string {
  return v
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
