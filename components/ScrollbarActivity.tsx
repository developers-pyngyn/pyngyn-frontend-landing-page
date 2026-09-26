"use client";

/*
 * Overlay-scrollbar behaviour: the thumb only paints while the user is
 * actually scrolling. CSS can't detect that, so this flags it on <html> and
 * app/globals.css does the rest (see the ::-webkit-scrollbar block).
 *
 * Listens in the capture phase so scrolls inside nested containers count too,
 * and clears the flag after a short idle. With JS off the thumb still shows on
 * hover and while dragging, so nothing becomes unreachable.
 */

import { useEffect } from "react";

const ACTIVE_CLASS = "scrollbars-active";
const IDLE_MS = 700;

export function ScrollbarActivity() {
  useEffect(() => {
    const root = document.documentElement;
    let idle: ReturnType<typeof setTimeout> | undefined;

    const onScroll = () => {
      root.classList.add(ACTIVE_CLASS);
      if (idle) clearTimeout(idle);
      idle = setTimeout(() => root.classList.remove(ACTIVE_CLASS), IDLE_MS);
    };

    window.addEventListener("scroll", onScroll, { passive: true, capture: true });
    return () => {
      window.removeEventListener("scroll", onScroll, { capture: true });
      if (idle) clearTimeout(idle);
      root.classList.remove(ACTIVE_CLASS);
    };
  }, []);

  return null;
}
