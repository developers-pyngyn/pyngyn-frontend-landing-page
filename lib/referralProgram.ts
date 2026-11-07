// Refer and earn rewards, as the Pyngyn team sets them in the internal dashboard.
// Read from the same public endpoint as "Get my link" (a GET, no key). No Supabase here.
//
// No path aliases or TS-only syntax in this file: `npm test` runs it with Node's type stripping.

export interface ReferralReward {
  type: "percent" | "fixed";
  value: number;
  currency: string;
  label: string; // "20%" or "$50"
}

export interface ReferralProgram {
  referee: ReferralReward; // the firm that is referred
  referrer: ReferralReward; // the person who refers
  min_withdrawal_usd: number;
  hold_days: number;
  attribution_days: number;
  discount_days: number;
  annual_only: boolean;
  referee_text: string; // "20% off their first annual plan" / "$50 off their first annual plan"
  referrer_text: string; // "20% of what they pay in their first year" / "$50 for every firm that pays"
}

// Today's values: used if the endpoint can't be reached, so the page never shows blanks.
export const DEFAULT_PROGRAM: ReferralProgram = {
  referee: { type: "percent", value: 20, currency: "USD", label: "20%" },
  referrer: { type: "percent", value: 20, currency: "USD", label: "20%" },
  min_withdrawal_usd: 100,
  hold_days: 7,
  attribution_days: 90,
  discount_days: 90,
  annual_only: true,
  referee_text: "20% off their first annual plan",
  referrer_text: "20% of what they pay in their first year",
};

/** Keeps only fields with the right type, so a malformed answer can't blank a sentence. */
function pick<T extends object>(base: T, input: unknown): T {
  if (!input || typeof input !== "object") return base;
  const out = { ...base };
  for (const key of Object.keys(base) as (keyof T)[]) {
    const v = (input as Record<string, unknown>)[key as string];
    const want = typeof base[key];
    if (want === "object") continue; // nested rewards are merged by the caller
    if (typeof v === want && (want !== "string" || (v as string).trim() !== "") && (want !== "number" || Number.isFinite(v))) {
      out[key] = v as T[keyof T];
    }
  }
  return out;
}

function mergeReward(base: ReferralReward, input: unknown): ReferralReward {
  const r = pick(base, input);
  return r.type === "percent" || r.type === "fixed" ? r : { ...r, type: base.type };
}

/** Merges a (possibly partial) endpoint answer over today's defaults. */
export function mergeProgram(input: unknown): ReferralProgram {
  const p = (input && typeof input === "object" ? input : {}) as Record<string, unknown>;
  return {
    ...pick(DEFAULT_PROGRAM, p),
    referee: mergeReward(DEFAULT_PROGRAM.referee, p.referee),
    referrer: mergeReward(DEFAULT_PROGRAM.referrer, p.referrer),
  };
}

/** Never throws: every failure (no variable, network, timeout, non-200, bad JSON) gives the defaults. */
export async function getReferralProgram(): Promise<ReferralProgram> {
  try {
    const url = typeof process !== "undefined" ? process.env.NEXT_PUBLIC_REFERRAL_ENDPOINT : undefined;
    if (!url) return DEFAULT_PROGRAM;
    // The timeout keeps a slow endpoint from holding things up; the defaults show instead.
    const signal = typeof AbortSignal !== "undefined" && typeof AbortSignal.timeout === "function" ? AbortSignal.timeout(3000) : undefined;
    const res = await fetch(url, {
      method: "GET",
      headers: { Accept: "application/json" },
      ...(signal ? { signal } : {}),
      next: { revalidate: 300 }, // matches the endpoint's 5-minute cache where Next.js caches fetches
    } as RequestInit);
    if (!res.ok) return DEFAULT_PROGRAM;
    const body = (await res.json()) as { ok?: boolean; program?: unknown };
    if (!body || typeof body !== "object" || !body.program || typeof body.program !== "object") return DEFAULT_PROGRAM;
    return mergeProgram(body.program);
  } catch {
    return DEFAULT_PROGRAM;
  }
}

// ---------------------------------------------------------------- wording used on the site

const sentence = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/**
 * Share text for X, LinkedIn, WhatsApp and Email. Built from the label, not referee_text:
 * referee_text speaks about the firm ("their first annual plan"), this is sent to them.
 */
export function shareMessage(p: ReferralProgram): { text: string; subject: string } {
  return {
    text: `I use Pyngyn to run my practice. Sign up with my link and get ${p.referee.label} off your first ${p.annual_only ? "annual " : ""}plan:`,
    subject: `${p.referee.label} off Pyngyn`,
  };
}

const WITHDRAWALS = "Withdrawals are paid by bank transfer and processed in 3 to 5 business days.";
const NO_REFUND = "A plan bought with a referral discount is not refundable.";

/** Every sentence on the Refer and earn page that mentions a reward. */
export function referralCopy(p: ReferralProgram) {
  const days = p.attribution_days;
  const min = `$${p.min_withdrawal_usd.toLocaleString("en-US")}`;
  return {
    hero: `Refer a firm to PYNGYN. They get ${p.referee_text}, and you earn ${p.referrer_text}. No cap, no catch.`,
    schemaDescription: `Refer PYNGYN to your network. The firm you refer gets ${p.referee_text}, and you earn ${p.referrer_text}.`,
    youEarn: { value: p.referrer.label, body: `${sentence(p.referrer_text)}, paid monthly.` },
    theySave: { value: p.referee.label, body: `${sentence(p.referee_text)}.` },
    badges: ["No cap on earnings", `${days}-day attribution`, "Monthly payouts"],
    steps: [
      { n: "01", title: "Join in 30 seconds", body: "Drop your email and we'll generate your unique referral link. No application needed." },
      { n: "02", title: "Share with your network", body: "Send your link to peers, post it on LinkedIn, or include it in your newsletter." },
      {
        n: "03",
        title: `They get ${p.referee.label} off`,
        body: `Anyone who ${p.annual_only ? "buys an annual plan" : "subscribes"} through your link gets ${p.referee_text}, applied automatically.`,
      },
      { n: "04", title: `You earn ${p.referrer.label}`, body: `You earn ${p.referrer_text}. ${WITHDRAWALS}` },
    ],
    card: `They save ${p.referee.label}, you earn ${p.referrer.label}. No cost to join.`,
    referrer: {
      value: p.referrer.label,
      rows: [
        ["Commission", sentence(p.referrer_text)],
        ["Cap", "No cap on referrals or earnings"],
        ["Attribution", `${days} days from first click`],
        ["Payout", `Bank transfer in 3 to 5 business days, from ${min}`],
        ["Eligibility", "Open to anyone, free to join"],
      ] as [string, string][],
    },
    friend: {
      value: `${p.referee.label} off`,
      rows: [
        ["Discount", sentence(p.referee_text)],
        ["Applies to", p.annual_only ? "All paid tiers, billed annually" : "All paid tiers, monthly or annual"],
        ["How it works", "Discount auto-applied at checkout"],
        ["Combinable", "Cannot stack with other promos"],
        ["After that", "Renews at standard list price"],
      ] as [string, string][],
    },
    faq: [
      { q: "How much do I earn per referral?", a: `You earn ${p.referrer_text} for every paid referral.` },
      { q: "How much does my friend save?", a: `Anyone who signs up through your link gets ${p.referee_text}. The discount is applied automatically at checkout.` },
      { q: "Is there a cap on what I can earn?", a: "No cap. The more firms you refer, the more you earn. We do reserve the right to review unusually large or unusual patterns to make sure everything is genuine." },
      { q: "How long does my link stay attributed?", a: `When someone clicks your link, the attribution lasts for ${days} days. If they sign up within that window, the referral counts to you.` },
      { q: "When and how do I get paid?", a: `You can withdraw once your earnings reach ${min}. ${WITHDRAWALS}` },
      { q: "Is there a minimum payout?", a: `Yes. You can withdraw once your earnings reach ${min}. Anything below that stays in your balance. ${WITHDRAWALS}` },
      { q: "Can the firm I referred get a refund?", a: "No. A plan bought with the referral discount is not refundable. This is shown at checkout before they pay." },
      p.annual_only
        ? { q: "Does this work with monthly plans?", a: "Today the program rewards annual plan subscriptions only. Monthly customers can always upgrade to an annual plan later to qualify." }
        : { q: "Does this work with monthly plans?", a: "Yes. Referrals on monthly and annual plans both qualify." },
      { q: "Can I refer my own company or use my own link?", a: "Self-referrals don't qualify. The program is for genuine third-party referrals, your peers, network, or audience." },
      { q: "What about taxes?", a: "Referral earnings are income. We'll send any tax documentation required in your country once you cross the relevant threshold." },
    ],
    terms:
      `Under the PYNGYN referral program, referrers earn ${p.referrer_text} for each qualifying paid referral, ` +
      `and the referred firm gets ${p.referee_text}. Payouts start once earnings reach ${min}. ${WITHDRAWALS} ` +
      `${p.annual_only ? "Only annual plans qualify. " : ""}${NO_REFUND} `,
  };
}
