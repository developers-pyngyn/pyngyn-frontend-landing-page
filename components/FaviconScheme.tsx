"use client";

/*
 * Keeps the tab icon matching the OS colour scheme, in Chrome as well.
 *
 * Variants named by role, verified against the artwork (not the filenames):
 *   /icon.png       48×48   dark navy tile, white mark  → LIGHT chrome
 *   /icon-dark.png  195×193 light grey tile, dark mark  → DARK chrome
 *
 * The static links in app/layout.tsx (media-less fallback first, dark last)
 * give Safari, Firefox and JS-disabled visitors the right icon on first paint.
 * Chrome is the problem: it evaluates `media` on icon links unreliably, never
 * re-evaluates it when the scheme changes, and ignores an in-place `href`
 * change. Worse, whichever competing link it settles on is undefined enough
 * that a media-less fallback can win unconditionally — which is exactly the
 * "always shows the light icon" symptom.
 *
 * So once this runs, it becomes authoritative: every other <link rel="icon">
 * is removed and a single freshly-appended one (with a cache-busting query, so
 * Chrome's separate favicon DB can't serve a stale entry) carries the choice.
 * A MutationObserver re-asserts that if anything re-injects icon links later,
 * e.g. after a client-side route change.
 *
 * There is no in-app theme toggle on this site, so the OS query is the only
 * signal. If one is added, call `enforce()` on theme change and fall back to
 * `query.matches` when the user's setting is "system".
 */

import { useEffect } from "react";

const FAVICON_FOR_LIGHT_MODE = "/icon.png";
const FAVICON_FOR_DARK_MODE = "/icon-dark.png";
const DYNAMIC_ID = "favicon-dynamic";

export function FaviconScheme() {
  useEffect(() => {
    const query = window.matchMedia("(prefers-color-scheme: dark)");

    const desiredHref = () => {
      const dark = query.matches;
      const file = dark ? FAVICON_FOR_DARK_MODE : FAVICON_FOR_LIGHT_MODE;
      return `${file}?v=${dark ? "dark" : "light"}`;
    };

    const enforce = () => {
      const href = desiredHref();
      const current = document.getElementById(DYNAMIC_ID) as HTMLLinkElement | null;
      // `rel~="icon"` matches the token exactly, so apple-touch-icon is safe.
      const competing = [...document.querySelectorAll<HTMLLinkElement>('link[rel~="icon"]')].filter(
        (link) => link.id !== DYNAMIC_ID,
      );

      // Already the only icon link, pointing at the right file: nothing to do.
      // (Also stops the observer below from looping on our own mutation.)
      if (current?.getAttribute("href") === href && competing.length === 0) return;

      competing.forEach((link) => link.remove());
      current?.remove();

      const link = document.createElement("link");
      link.id = DYNAMIC_ID;
      link.rel = "icon";
      link.type = "image/png";
      link.href = href;
      document.head.appendChild(link);
    };

    enforce();
    query.addEventListener("change", enforce);

    const observer = new MutationObserver((records) => {
      const iconAdded = records.some((record) =>
        [...record.addedNodes].some(
          (node) => node instanceof HTMLLinkElement && /(^|\s)icon(\s|$)/i.test(node.rel),
        ),
      );
      if (iconAdded) enforce();
    });
    observer.observe(document.head, { childList: true });

    return () => {
      query.removeEventListener("change", enforce);
      observer.disconnect();
      document.getElementById(DYNAMIC_ID)?.remove();
    };
  }, []);

  return null;
}
