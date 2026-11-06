// Refer and earn: the referral code, the first-visit cookie and the app links.
//
// No path aliases or TS-only syntax in this file: `npm test` runs it directly
// with Node's type stripping.

// Same email -> same code, everywhere. The Pyngyn app computes this identically.
// Do not change the salt, the hash or the lengths without changing the app too.
const REF_SALT = "pyngyn-ref-v1:";

export async function makeReferralCode(rawEmail: string): Promise<string> {
  const email = rawEmail.trim().toLowerCase();
  const base =
    email.split("@")[0].replace(/[^a-z0-9]/g, "").slice(0, 10) || "friend";
  const bytes = new TextEncoder().encode(REF_SALT + email);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  const hex = Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return `${base}-${hex.slice(0, 6)}`;
}

const DEFAULT_APP_SIGNUP = "https://app.pyngyn.ai/?signup=true";

/**
 * The link people share: the Pyngyn app's sign-up page with `ref`. The app keeps the
 * code itself (and records the first-open time), so no `ref_at` goes on this link.
 * Defaults to production, so preview builds never hand out wrong links; a staging
 * build can point it elsewhere with NEXT_PUBLIC_APP_SIGNUP_URL.
 */
export function referralLink(code: string): string {
  const url = new URL(process.env.NEXT_PUBLIC_APP_SIGNUP_URL || DEFAULT_APP_SIGNUP);
  url.searchParams.set("ref", code);
  return url.toString(); // https://app.pyngyn.ai/?signup=true&ref=nikhilwevo-49fdae
}

/** Accepts current codes and the older 4-character ones. */
export const REF_CODE_PATTERN = /^[a-z0-9]{1,10}-[a-z0-9]{4,6}$/;

export const REF_COOKIE = "pyngyn_ref";
export const REF_COOKIE_MAX_AGE = 7776000; // 90 days, in seconds

/** A `?ref=` value, lowercased, or null when it is not a valid code. */
export function cleanRefCode(value: string | null | undefined): string | null {
  const code = (value ?? "").trim().toLowerCase();
  return REF_CODE_PATTERN.test(code) ? code : null;
}

export interface Referral {
  code: string;
  at: number; // unix seconds of the first visit
}

/** Reads `CODE.UNIX_SECONDS`; null when missing or malformed. */
export function parseRefCookie(value: string | null | undefined): Referral | null {
  if (!value) return null;
  const dot = value.lastIndexOf(".");
  if (dot < 0) return null;
  const code = cleanRefCode(value.slice(0, dot));
  const at = value.slice(dot + 1);
  if (!code || !/^\d{1,12}$/.test(at)) return null;
  return { code, at: Number(at) };
}

export const formatRefCookie = (r: Referral) => `${r.code}.${r.at}`;

/** The `pyngyn_ref` value from a `document.cookie` string. */
export function refFromCookieString(cookies: string): Referral | null {
  for (const part of cookies.split(";")) {
    const eq = part.indexOf("=");
    if (eq < 0) continue;
    if (part.slice(0, eq).trim() === REF_COOKIE) {
      try {
        return parseRefCookie(decodeURIComponent(part.slice(eq + 1).trim()));
      } catch {
        return null;
      }
    }
  }
  return null;
}

const APP_ORIGIN = "https://app.pyngyn.ai";

/**
 * Adds `ref` and `ref_at` to a link into the app, keeping its existing query.
 * Anything that is not an app link, or no referral, comes back unchanged.
 */
export function withReferral(href: string, ref: Referral | null): string {
  if (!ref || !(href === APP_ORIGIN || href.startsWith(APP_ORIGIN + "/") || href.startsWith(APP_ORIGIN + "?"))) {
    return href;
  }
  try {
    const url = new URL(href);
    url.searchParams.set("ref", ref.code);
    url.searchParams.set("ref_at", String(ref.at));
    return url.toString();
  } catch {
    return href;
  }
}
