import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  MARKET_COOKIE,
  MARKET_COOKIE_MAX_AGE,
  marketFromCountry,
} from "@/lib/pricing/detect-country";

/*
 * Currency auto-detection for statically-rendered pages.
 *
 * (Next 16 renamed Middleware to Proxy — same functionality, `proxy.ts` file
 * with a `proxy` export.)
 *
 * The homepage is static (turning it into a per-request edge route to detect
 * the visitor server-side overflowed the Cloudflare Workers bundle and 500'd),
 * so it can't read the visitor's country at render time. Instead this tiny
 * edge proxy — a separate, small function, not the page bundle — reads the
 * host's geo header and stamps the first-party `pyngyn_market` cookie. The
 * PricingTiers client component then reads that cookie after hydration and
 * shows the local currency. /pricing keeps its own server-side detection.
 *
 * Only ever *sets* the cookie when it's missing, so an existing detection or a
 * manual override is never overwritten. Wrapped so a failure can never take a
 * page down — worst case the cookie isn't set and prices stay in USD.
 */

// The header a host stamps per edge; first present wins. Mirrors the order in
// lib/pricing/detect-country.ts so proxy and server detection agree.
const COUNTRY_HEADERS = [
  "x-vercel-ip-country",
  "cf-ipcountry",
  "cloudfront-viewer-country",
  "fastly-client-geo-country",
] as const;

export function proxy(req: NextRequest) {
  try {
    if (req.cookies.has(MARKET_COOKIE)) return NextResponse.next();

    let country: string | null = null;
    for (const name of COUNTRY_HEADERS) {
      const value = req.headers.get(name);
      if (value) {
        country = value;
        break;
      }
    }

    // No geo header (e.g. localhost, or a host that doesn't stamp one): leave the
    // cookie unset so PricingTiers falls back to browser-side IP geolocation,
    // which can see the visitor's real public IP. Only cache a real header hit.
    if (!country) return NextResponse.next();

    const res = NextResponse.next();
    res.cookies.set(MARKET_COOKIE, marketFromCountry(country), {
      path: "/",
      maxAge: MARKET_COOKIE_MAX_AGE,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });
    return res;
  } catch {
    return NextResponse.next();
  }
}

export const config = {
  // Pages that show the pricing tables. Kept narrow so the proxy doesn't run on
  // assets or every marketing route. Both /pricing forms are listed because
  // trailingSlash is enabled (next.config.js).
  matcher: ["/", "/pricing", "/pricing/"],
};
