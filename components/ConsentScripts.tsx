"use client";

import { useEffect } from "react";
import { CONSENT_CHANGED_EVENT, ConsentState, getStoredConsent } from "./consent";

// Same IDs previously hardcoded in app/layout.tsx's unconditional <Script>
// tags. Kept here as the single source of truth now that loading is
// conditional.
const GTM_ID = "GTM-WB3T85N7";
const FB_PIXEL_ID = "2093696051447626";

declare global {
  interface Window {
    dataLayer?: unknown[];
    fbq?: {
      (...args: unknown[]): void;
      callMethod?: (...args: unknown[]) => void;
      queue?: unknown[];
      loaded?: boolean;
      version?: string;
      push?: unknown;
    };
    __pyngynGtmLoaded?: boolean;
    __pyngynFbqLoaded?: boolean;
  }
}

// Equivalent to Google's standard GTM snippet, expressed as DOM calls
// instead of an inline <script> string so it only ever runs once Analytics
// consent has been granted.
function loadGoogleTagManager() {
  if (typeof window === "undefined" || window.__pyngynGtmLoaded) return;
  window.__pyngynGtmLoaded = true;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
  document.head.appendChild(script);
}

// Equivalent to Meta's standard Pixel snippet, gated behind Marketing
// consent.
function loadMetaPixel() {
  if (typeof window === "undefined" || window.__pyngynFbqLoaded) return;
  window.__pyngynFbqLoaded = true;

  if (!window.fbq) {
    const fbq: NonNullable<Window["fbq"]> = function (...args: unknown[]) {
      if (fbq.callMethod) {
        fbq.callMethod(...args);
      } else {
        fbq.queue?.push(args);
      }
    };
    fbq.push = fbq;
    fbq.loaded = true;
    fbq.version = "2.0";
    fbq.queue = [];
    window.fbq = fbq;
  }

  const script = document.createElement("script");
  script.async = true;
  script.src = "https://connect.facebook.net/en_US/fbevents.js";
  document.head.appendChild(script);

  window.fbq?.("init", FB_PIXEL_ID);
  window.fbq?.("track", "PageView");
}

function applyConsent(state: ConsentState | null) {
  if (!state) return;
  if (state.analytics) loadGoogleTagManager();
  if (state.marketing) loadMetaPixel();
}

/**
 * Renders nothing. On mount, applies whatever consent decision is already
 * on file (so returning visitors who accepted don't need to click again),
 * then keeps listening so that accepting via the cookie banner loads the
 * relevant script immediately, without a page reload.
 *
 * If no decision is on file yet, nothing loads — matching /cookie-policy's
 * promise that closing the banner without acting leaves GA and the Meta
 * Pixel "completely uninitialized."
 */
export function ConsentScripts() {
  useEffect(() => {
    applyConsent(getStoredConsent());

    function onConsentChanged(e: Event) {
      const detail = (e as CustomEvent<ConsentState>).detail;
      applyConsent(detail ?? getStoredConsent());
    }

    window.addEventListener(CONSENT_CHANGED_EVENT, onConsentChanged);
    return () => window.removeEventListener(CONSENT_CHANGED_EVENT, onConsentChanged);
  }, []);

  return null;
}
