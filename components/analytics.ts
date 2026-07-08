// Small helper for pushing custom events to the GTM dataLayer.
//
// Safe to call at any time, including before the visitor has consented to
// Analytics/Marketing cookies: this only appends to a plain in-page array.
// Nothing is sent anywhere until GTM itself loads (which — per
// components/ConsentScripts.tsx — only happens after consent) and a tag
// inside it actually fires. GTM reads whatever is already sitting in
// dataLayer the moment it initializes, so early events aren't lost; they're
// just processed once the container loads.
export function pushDataLayerEvent(event: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params });
}
