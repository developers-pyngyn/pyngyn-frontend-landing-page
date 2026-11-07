// Stands in for next/link in tests: the real one needs the Next.js router.
import { createElement } from "react";

export default function Link({ href, children, prefetch: _prefetch, ...rest }) {
  return createElement("a", { href: typeof href === "string" ? href : String(href), ...rest }, children);
}
