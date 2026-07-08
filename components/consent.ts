// Shared cookie-consent state for the marketing site.
//
// Gates Google Tag Manager / GA4 ("Analytics & Performance") and the
// Meta/Facebook Pixel ("Marketing & Targeting") behind an explicit visitor
// choice, matching the categories and behavior described in /cookie-policy:
// both are "blocked/disabled until you consent," and rejecting or closing
// the banner without acting must leave them "completely uninitialized."
//
// Strictly Necessary and Functional storage (promo timers, roadmap votes,
// UI preferences) are outside the scope of this file and remain always-on,
// exactly as /cookie-policy documents them.

export type ConsentState = {
  analytics: boolean;
  marketing: boolean;
  decidedAt: string; // ISO timestamp of the visitor's choice
};

const STORAGE_KEY = "pyngyn_cookie_consent_v1";

// Fired on window whenever the visitor's choice changes, with the new
// ConsentState as `detail`. Script loaders listen for this so an "Accept"
// click can load a script immediately, with no page reload required.
export const CONSENT_CHANGED_EVENT = "pyngyn:consent-changed";

// Fired to ask the banner to reopen (e.g. a "Cookie preferences" link in the
// footer) even after the visitor already made a choice.
export const OPEN_PREFERENCES_EVENT = "pyngyn:open-cookie-preferences";

export function getStoredConsent(): ConsentState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<ConsentState>;
    if (typeof parsed.analytics === "boolean" && typeof parsed.marketing === "boolean") {
      return {
        analytics: parsed.analytics,
        marketing: parsed.marketing,
        decidedAt: typeof parsed.decidedAt === "string" ? parsed.decidedAt : new Date().toISOString(),
      };
    }
    return null;
  } catch {
    return null;
  }
}

export function saveConsent(next: { analytics: boolean; marketing: boolean }): ConsentState {
  const state: ConsentState = { ...next, decidedAt: new Date().toISOString() };
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // localStorage unavailable (private mode, quota, etc.) — the choice still
    // applies to scripts for the rest of this page view via the event below.
  }
  try {
    window.dispatchEvent(new CustomEvent<ConsentState>(CONSENT_CHANGED_EVENT, { detail: state }));
  } catch {
    // CustomEvent unsupported — nothing else can react, but the stored
    // choice (if it saved) still takes effect on the next page load.
  }
  return state;
}

export function openCookiePreferences(): void {
  try {
    window.dispatchEvent(new Event(OPEN_PREFERENCES_EVENT));
  } catch {
    /* no-op */
  }
}
