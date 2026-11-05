import { sendEmail, escapeHtml } from "@/lib/resend";

export const dynamic = "force-dynamic";
export const runtime = "edge";

// Timezone for booking schedule
const TIMEZONE = "Asia/Kolkata";

// Standard daily slots (IST)
const STANDARD_SLOTS = [
  { time: "10:00", label: "10:00 AM IST" },
  { time: "11:30", label: "11:30 AM IST" },
  { time: "14:00", label: "2:00 PM IST" },
  { time: "15:30", label: "3:30 PM IST" },
  { time: "17:00", label: "5:00 PM IST" },
  { time: "18:30", label: "6:30 PM IST" },
];

type BookingRecord = {
  id: string;
  slotKey: string; // "YYYY-MM-DD_HH:MM"
  date: string;
  time: string;
  name: string;
  email: string;
  company: string;
  phone?: string;
  practiceType?: string;
  notes?: string;
  createdAt: string;
  userAgent?: string;
};

// Global in-memory storage across requests in the current process/worker
type GlobalBookingStore = {
  bookings: Map<string, BookingRecord>;
  lock: Promise<void>;
};

const globalStore: GlobalBookingStore = ((globalThis as unknown as { __PYNGYN_DEMO_STORE__?: GlobalBookingStore })
  .__PYNGYN_DEMO_STORE__ ||= {
  bookings: new Map<string, BookingRecord>(),
  lock: Promise.resolve(),
});

// Mutex to strictly prevent race conditions / double bookings
async function withBookingLock<T>(fn: () => Promise<T>): Promise<T> {
  let release: () => void;
  const nextLock = new Promise<void>((resolve) => {
    release = resolve;
  });
  const currentLock = globalStore.lock;
  globalStore.lock = (async () => {
    await currentLock;
    await nextLock;
  })();
  await currentLock;
  try {
    return await fn();
  } finally {
    release!();
  }
}

// Calculate the strictly allowed 3-day window [Today, Tomorrow, Day 3] in Asia/Kolkata
function getAllowedDays(now = new Date()): { iso: string; label: string; dayName: string; dateStr: string }[] {
  const days: { iso: string; label: string; dayName: string; dateStr: string }[] = [];
  for (let i = 0; i < 3; i++) {
    const d = new Date(now.getTime() + i * 24 * 60 * 60 * 1000);
    const iso = new Intl.DateTimeFormat("en-CA", { timeZone: TIMEZONE }).format(d);
    const dayName = new Intl.DateTimeFormat("en-US", { timeZone: TIMEZONE, weekday: "short" }).format(d);
    const dateStr = new Intl.DateTimeFormat("en-US", { timeZone: TIMEZONE, month: "short", day: "numeric" }).format(d);
    const label = i === 0 ? "Today" : i === 1 ? "Tomorrow" : dayName;
    days.push({ iso, label, dayName, dateStr });
  }
  return days;
}

// Current clock time in Asia/Kolkata as HH:MM
function getCurrentIstTime(now = new Date()): string {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: TIMEZONE,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(now);
  const hour = parts.find((p) => p.type === "hour")?.value || "00";
  const minute = parts.find((p) => p.type === "minute")?.value || "00";
  return `${hour}:${minute}`;
}

function jsonResponse(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store, no-cache, must-revalidate",
    },
  });
}

function isEmail(v: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
}

function clean(v: unknown, max = 500): string {
  if (typeof v !== "string") return "";
  return v.trim().slice(0, max);
}

// GET /api/demo: Fetches allowed 3-day dates, slot list, and current booked/passed status
export async function GET(): Promise<Response> {
  const now = new Date();
  const allowedDays = getAllowedDays(now);
  const todayIso = allowedDays[0].iso;
  const currentIstTime = getCurrentIstTime(now);

  const bookedSlots: string[] = [];

  // Add recorded bookings
  for (const slotKey of globalStore.bookings.keys()) {
    bookedSlots.push(slotKey);
  }

  // Also auto-mark passed slots for today
  for (const slot of STANDARD_SLOTS) {
    if (slot.time <= currentIstTime) {
      const pastKey = `${todayIso}_${slot.time}`;
      if (!bookedSlots.includes(pastKey)) {
        bookedSlots.push(pastKey);
      }
    }
  }

  return jsonResponse({
    timezone: TIMEZONE,
    days: allowedDays,
    slots: STANDARD_SLOTS,
    bookedSlots,
  });
}

// Bookings are only held in this isolate's memory, so they are NOT a record:
// a booking counts as made only once the team has been notified by email
// (Resend) or webhook. The in-memory map just stops obvious double-clicks.
const NOTIFY_FROM = () => process.env.SUBSCRIBE_FROM || "sales@pyngyn.com";
const NOTIFY_TO = () => process.env.DEMO_NOTIFY_TO || process.env.SUBSCRIBE_TO || "sales@pyngyn.com";
const IST_OFFSET_MIN = 330;
const DURATION_MIN = 30;

/** Best-effort per-isolate limiter, same approach as /api/subscribe. */
const RATE_LIMIT = 3;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const hits = new Map<string, number[]>();

function rateLimited(request: Request): boolean {
  const ip =
    request.headers.get("cf-connecting-ip") ||
    (request.headers.get("x-forwarded-for") || "").split(",")[0].trim() ||
    "unknown";
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < RATE_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > RATE_LIMIT;
}

function icsStamp(ms: number): string {
  return new Date(ms).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}

/** "2026-11-06" + "14:00" (IST) -> "20261106T083000Z" (UTC, iCalendar format). */
function icsUtc(date: string, time: string, plusMin = 0): string {
  const [y, mo, d] = date.split("-").map(Number);
  const [h, mi] = time.split(":").map(Number);
  return icsStamp(Date.UTC(y, mo - 1, d, h, mi) + (plusMin - IST_OFFSET_MIN) * 60_000);
}

/** Escape text for an iCalendar property value. */
function icsText(v: string): string {
  return v.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\r?\n/g, "\\n");
}

function buildIcs(b: BookingRecord, organizer: string): string {
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//PYNGYN//Demo booking//EN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${b.id}@pyngyn.ai`,
    `DTSTAMP:${icsStamp(Date.now())}`,
    `DTSTART:${icsUtc(b.date, b.time)}`,
    `DTEND:${icsUtc(b.date, b.time, DURATION_MIN)}`,
    `SUMMARY:${icsText(`PYNGYN ClientSpace walkthrough: ${b.company}`)}`,
    `DESCRIPTION:${icsText(
      `30-minute ClientSpace walkthrough with ${b.name} (${b.company}). The Google Meet link will be sent by the PYNGYN team.`
    )}`,
    `ORGANIZER;CN=PYNGYN:mailto:${organizer}`,
    `ATTENDEE;CN=${icsText(b.name)}:mailto:${b.email}`,
    "END:VEVENT",
    "END:VCALENDAR",
    "",
  ].join("\r\n");
}

function detailsTable(rows: [string, string][]): string {
  return rows
    .map(
      ([k, v]) =>
        `<tr><td style="padding:8px 12px 8px 0;color:#6b7280;font:600 12px Arial,sans-serif;vertical-align:top;white-space:nowrap">${escapeHtml(k)}</td><td style="padding:8px 0;color:#0f1115;font:14px Arial,sans-serif">${escapeHtml(v)}</td></tr>`
    )
    .join("");
}

function bookingRows(b: BookingRecord, slotLabel: string, dayLabel: string): [string, string][] {
  return [
    ["When", `${dayLabel}, ${b.date} at ${slotLabel}`],
    ["Name", b.name],
    ["Email", b.email],
    ["Firm", b.company],
    ["Phone", b.phone || "(not given)"],
    ["Practice", b.practiceType || "(not given)"],
    ["Notes", b.notes || "(none)"],
  ];
}

async function notifyTeam(b: BookingRecord, slotLabel: string, dayLabel: string): Promise<boolean> {
  const rows = bookingRows(b, slotLabel, dayLabel);
  const webhook = process.env.DEMO_WEBHOOK_URL;
  const [mail, hook] = await Promise.all([
    sendEmail({
      from: NOTIFY_FROM(),
      to: NOTIFY_TO(),
      replyTo: b.email,
      subject: `Demo booked: ${b.company}, ${dayLabel} ${slotLabel}`,
      html: `<p style="font:15px Arial,sans-serif">New demo booking from pyngyn.ai. Send the Google Meet invite to <a href="mailto:${escapeHtml(b.email)}">${escapeHtml(b.email)}</a> (reply to this email to reach them).</p><table>${detailsTable(rows)}</table>`,
      text: ["New demo booking from pyngyn.ai", "", ...rows.map(([k, v]) => `${k}: ${v}`), "", "Send the Google Meet invite to the attendee."].join("\n"),
      attachments: [{ filename: "pyngyn-demo.ics", content: buildIcs(b, NOTIFY_FROM()), contentType: "text/calendar" }],
    }),
    webhook
      ? fetch(webhook, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(b),
        })
          .then((r) => r.ok)
          .catch(() => false)
      : Promise.resolve(false),
  ]);
  if (!mail.ok) console.error("[demo] team email failed:", mail.reason);
  if (webhook && !hook) console.error("[demo] webhook failed");
  return mail.ok || hook;
}

async function confirmToVisitor(b: BookingRecord, slotLabel: string, dayLabel: string): Promise<boolean> {
  const rows = bookingRows(b, slotLabel, dayLabel).slice(0, 4);
  const first = b.name.split(" ")[0];
  const result = await sendEmail({
    from: NOTIFY_FROM(),
    to: b.email,
    replyTo: NOTIFY_TO(),
    subject: `Your PYNGYN walkthrough: ${dayLabel}, ${slotLabel}`,
    html: `<p style="font:15px Arial,sans-serif">Hi ${escapeHtml(first)},</p><p style="font:15px Arial,sans-serif">Thanks for booking a 30-minute ClientSpace walkthrough. Our team will send the Google Meet link shortly; the attached calendar file adds the slot to your calendar.</p><table>${detailsTable(rows)}</table><p style="font:15px Arial,sans-serif">Need a different time? Just reply to this email.</p><p style="font:15px Arial,sans-serif">The PYNGYN team</p>`,
    text: [
      `Hi ${first},`,
      "",
      "Thanks for booking a 30-minute ClientSpace walkthrough. Our team will send the Google Meet link shortly.",
      "",
      ...rows.map(([k, v]) => `${k}: ${v}`),
      "",
      "Need a different time? Just reply to this email.",
      "The PYNGYN team",
    ].join("\n"),
    attachments: [{ filename: "pyngyn-demo.ics", content: buildIcs(b, NOTIFY_FROM()), contentType: "text/calendar" }],
  });
  if (!result.ok) console.error("[demo] visitor confirmation failed:", result.reason);
  return result.ok;
}

// POST /api/demo: validates the slot, notifies the team, then confirms to the visitor
export async function POST(request: Request): Promise<Response> {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return jsonResponse({ error: "Invalid JSON request body." }, 400);
  }

  const name = clean(body.name, 120);
  const email = clean(body.email, 200);
  const company = clean(body.company, 200);
  const phone = clean(body.phone, 50);
  const practiceType = clean(body.practiceType, 100);
  const notes = clean(body.notes, 1000);
  const date = clean(body.date, 10);
  const time = clean(body.time, 5);

  // Bots fill the hidden field. Look successful, send nothing.
  if (clean(body.website)) return jsonResponse({ ok: true, booking: null });

  // Field validations
  if (!name || name.length < 2) {
    return jsonResponse({ error: "Please provide your full name." }, 400);
  }
  if (!isEmail(email)) {
    return jsonResponse({ error: "Please provide a valid work email." }, 400);
  }
  if (!company) {
    return jsonResponse({ error: "Please provide your company or practice name." }, 400);
  }

  const now = new Date();
  const allowedDays = getAllowedDays(now);
  const allowedDates = allowedDays.map((d) => d.iso);

  // Strictly enforce 3-day booking window
  if (!allowedDates.includes(date)) {
    return jsonResponse(
      {
        error: "Booking is strictly limited to the next 3 days only. Please choose an available date.",
        allowedDates,
      },
      400
    );
  }

  // Validate slot time
  const matchedSlot = STANDARD_SLOTS.find((s) => s.time === time);
  if (!matchedSlot) {
    return jsonResponse({ error: "Please select a valid walkthrough time slot." }, 400);
  }

  // Check if slot on today's date is already in the past
  const todayIso = allowedDays[0].iso;
  if (date === todayIso) {
    const currentIstTime = getCurrentIstTime(now);
    if (time <= currentIstTime) {
      return jsonResponse({ error: "This time slot has already passed for today. Please pick a future slot." }, 400);
    }
  }

  if (rateLimited(request)) {
    return jsonResponse({ error: "Too many booking attempts. Please try again in a few minutes." }, 429);
  }

  const slotKey = `${date}_${time}`;

  // Execute booking inside mutex lock to prevent race conditions & double-booking
  return await withBookingLock(async () => {
    // Check if slot is already taken
    if (globalStore.bookings.has(slotKey)) {
      return jsonResponse(
        {
          error: "This time slot was just booked by another user. Please choose another convenient time.",
          code: "SLOT_TAKEN",
          slotKey,
        },
        409
      );
    }

    const bookingId = `pyg-demo-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
    const record: BookingRecord = {
      id: bookingId,
      slotKey,
      date,
      time,
      name,
      email,
      company,
      phone: phone || undefined,
      practiceType: practiceType || undefined,
      notes: notes || undefined,
      createdAt: new Date().toISOString(),
      userAgent: request.headers.get("user-agent") || undefined,
    };

    // Atomically reserve the slot
    globalStore.bookings.set(slotKey, record);

    const dayInfo = allowedDays.find((d) => d.iso === date);
    const dayLabel = dayInfo?.label || date;

    // Only confirm once someone at PYNGYN actually knows about it.
    const delivered = await notifyTeam(record, matchedSlot.label, dayLabel);
    if (!delivered) {
      globalStore.bookings.delete(slotKey);
      return jsonResponse(
        {
          error:
            "We couldn't confirm your booking right now. Please email sales@pyngyn.com with your preferred time and we'll set it up.",
        },
        503
      );
    }

    const confirmationSent = await confirmToVisitor(record, matchedSlot.label, dayLabel);

    return jsonResponse({
      ok: true,
      booking: {
        id: record.id,
        date: record.date,
        time: record.time,
        slotLabel: matchedSlot.label,
        dayLabel,
        dateFormatted: dayInfo?.dateStr || date,
        name: record.name,
        email: record.email,
        company: record.company,
      },
      confirmationSent,
    });
  });
}
