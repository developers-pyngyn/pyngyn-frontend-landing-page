"use client";

import { useEffect } from "react";
import {
  REF_COOKIE,
  REF_COOKIE_MAX_AGE,
  cleanRefCode,
  formatRefCookie,
  refFromCookieString,
  withReferral,
  type Referral,
} from "@/lib/referral";

/** Remembers the first `?ref=` code a visitor opened. Never overwrites an existing one. */
function captureReferral(): Referral | null {
  const existing = refFromCookieString(document.cookie);
  const url = new URL(window.location.href);
  if (!url.searchParams.has("ref")) return existing;

  const code = cleanRefCode(url.searchParams.get("ref"));
  let current = existing;
  if (code && !existing) {
    current = { code, at: Math.floor(Date.now() / 1000) };
    document.cookie =
      `${REF_COOKIE}=${formatRefCookie(current)}; Max-Age=${REF_COOKIE_MAX_AGE}; Path=/; SameSite=Lax; Secure`;
  }
  // Take `ref` out of the address bar, keeping every other query parameter.
  url.searchParams.delete("ref");
  window.history.replaceState(window.history.state, "", url.pathname + url.search + url.hash);
  return current;
}

/** Points every link into app.pyngyn.ai at the same URL plus `ref` and `ref_at`. */
function tagAppLinks(root: ParentNode, ref: Referral) {
  root.querySelectorAll<HTMLAnchorElement>('a[href^="https://app.pyngyn.ai"]').forEach((a) => {
    const href = a.getAttribute("href");
    if (!href) return;
    const tagged = withReferral(href, ref);
    if (tagged !== href) a.setAttribute("href", tagged);
  });
}

/**
 * Runs on every page (root layout). Links to the app keep their normal URLs
 * unless a valid `pyngyn_ref` cookie exists; this is the one place they change.
 */
export function ReferralTracker() {
  useEffect(() => {
    const ref = captureReferral();
    if (!ref) return;
    tagAppLinks(document, ref);
    // Menus, popups and client-rendered sections add links after load.
    const observer = new MutationObserver((records) => {
      for (const r of records) {
        if (r.type === "attributes" && r.target instanceof HTMLAnchorElement) tagAppLinks(r.target.parentNode ?? document, ref);
        r.addedNodes.forEach((n) => {
          if (n instanceof HTMLAnchorElement) tagAppLinks(n.parentNode ?? document, ref);
          else if (n instanceof Element) tagAppLinks(n, ref);
        });
      }
    });
    observer.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ["href"] });
    return () => observer.disconnect();
  }, []);

  return null;
}
