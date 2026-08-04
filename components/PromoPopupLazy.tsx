"use client";

import dynamic from "next/dynamic";

// The promo popup only appears after a 6s delay and is not SEO content, so it
// doesn't need to be in the initial JS bundle or server-rendered. Loading it
// lazily (client-only) keeps it — and its Framer Motion dependency — off the
// critical path, reducing initial/unused JavaScript and main-thread work.
const PromoPopup = dynamic(
  () => import("./PromoPopup").then((m) => m.PromoPopup),
  { ssr: false },
);

export function PromoPopupLazy() {
  return <PromoPopup />;
}
