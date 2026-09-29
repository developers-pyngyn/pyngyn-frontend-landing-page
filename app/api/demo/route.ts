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

// POST /api/demo: Validates date within 3 days, checks availability with mutex lock, prevents double booking
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

    // Optional upstream webhook (Slack, CRM, Zapier)
    const webhook = process.env.DEMO_WEBHOOK_URL;
    if (webhook) {
      try {
        await fetch(webhook, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(record),
        }).catch((err) => console.error("[demo] webhook dispatch failed:", err));
      } catch (err) {
        console.error("[demo] webhook dispatch error:", err);
      }
    }

    const dayInfo = allowedDays.find((d) => d.iso === date);

    return jsonResponse({
      ok: true,
      booking: {
        id: record.id,
        date: record.date,
        time: record.time,
        slotLabel: matchedSlot.label,
        dayLabel: dayInfo?.label || date,
        dateFormatted: dayInfo?.dateStr || date,
        name: record.name,
        email: record.email,
        company: record.company,
      },
    });
  });
}
