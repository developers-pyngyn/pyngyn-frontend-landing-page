"use client";

import { useEffect, useRef, useState } from "react";
import { pushDataLayerEvent } from "./analytics";

declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (options: { url: string; parentElement: HTMLElement }) => void;
    };
  }
}

const SCRIPT_SRC = "https://assets.calendly.com/assets/external/widget.js";

// Warm up the TLS/DNS connection to Calendly before the script and iframe are
// fetched, which shaves a few hundred ms off the cold load.
function preconnect(href: string) {
  if (typeof document === "undefined") return;
  if (document.querySelector(`link[data-cal-preconnect="${href}"]`)) return;
  const link = document.createElement("link");
  link.rel = "preconnect";
  link.href = href;
  link.crossOrigin = "anonymous";
  link.setAttribute("data-cal-preconnect", href);
  document.head.appendChild(link);
}

/**
 * Embeds a Calendly inline scheduler. Loads Calendly's widget script once and
 * initialises the inline widget into this component's container. While Calendly
 * loads (typically a couple of seconds), a lightweight loading state is shown so
 * the area never looks empty or broken.
 */
export function CalendlyEmbed({
  url,
  className,
  height = 700,
}: {
  url: string;
  className?: string;
  height?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);

  // Fire a dataLayer event the moment a visitor actually books a slot (not
  // just when they open the widget). This is what a Google Ads "Conversion
  // Tracking" tag in GTM should be triggered on — see calendly.com/help
  // for the full postMessage event list. No booking details (name, email,
  // time) are included; this is a plain conversion signal only.
  useEffect(() => {
    function onMessage(e: MessageEvent) {
      if (e.origin !== "https://calendly.com") return;
      if (e.data?.event === "calendly.event_scheduled") {
        pushDataLayerEvent("demo_scheduled");
      }
    }
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  useEffect(() => {
    preconnect("https://assets.calendly.com");
    preconnect("https://calendly.com");

    let cancelled = false;
    let observer: MutationObserver | null = null;
    const markLoaded = () => {
      if (!cancelled) setLoaded(true);
    };

    // Hide the loading state once Calendly's iframe has actually loaded.
    const watchForIframe = () => {
      if (!ref.current) return;
      const attach = (): boolean => {
        const iframe = ref.current?.querySelector("iframe");
        if (iframe) {
          iframe.addEventListener("load", markLoaded, { once: true });
          observer?.disconnect();
          observer = null;
          return true;
        }
        return false;
      };
      if (attach()) return;
      observer = new MutationObserver(() => attach());
      observer.observe(ref.current, { childList: true, subtree: true });
    };

    const init = () => {
      if (cancelled || !window.Calendly || !ref.current) return;
      ref.current.innerHTML = "";
      window.Calendly.initInlineWidget({ url, parentElement: ref.current });
      watchForIframe();
    };

    if (window.Calendly) {
      init();
    } else {
      let script = document.querySelector<HTMLScriptElement>(`script[src="${SCRIPT_SRC}"]`);
      if (!script) {
        script = document.createElement("script");
        script.src = SCRIPT_SRC;
        script.async = true;
        document.body.appendChild(script);
      }
      script.addEventListener("load", init, { once: true });
    }

    // Safety net so the loading state never spins forever.
    const fallback = window.setTimeout(markLoaded, 8000);

    return () => {
      cancelled = true;
      observer?.disconnect();
      window.clearTimeout(fallback);
    };
  }, [url]);

  return (
    <div className={className} style={{ position: "relative", minWidth: 320, height }}>
      <div ref={ref} className="h-full" role="region" aria-label="Schedule a demo" />
      {!loaded && (
        <div className="absolute inset-0 grid place-items-center bg-white" aria-hidden="true">
          <div className="flex flex-col items-center gap-3">
            <span className="h-7 w-7 animate-spin rounded-full border-2 border-line border-t-accent" />
            <span className="text-[13px] text-muted">Loading scheduler…</span>
          </div>
        </div>
      )}
    </div>
  );
}
