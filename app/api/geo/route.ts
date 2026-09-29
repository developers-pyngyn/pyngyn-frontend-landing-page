import { NextRequest, NextResponse } from "next/server";
import { marketFromCountry, MARKET_COOKIE } from "@/lib/pricing/detect-country";
import { type MarketCode } from "@/lib/pricing/config";

export const runtime = "edge";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  // 1. Check override cookie first
  const cookieMarket = request.cookies.get(MARKET_COOKIE)?.value;
  if (cookieMarket) {
    const market = marketFromCountry(cookieMarket);
    return NextResponse.json(
      { market, country: cookieMarket, source: "cookie" },
      { headers: { "Cache-Control": "private, no-cache, no-store, must-revalidate" } }
    );
  }

  // 2. Check edge country headers (Cloudflare, Vercel, CloudFront, etc.)
  const country =
    request.headers.get("cf-ipcountry") ||
    request.headers.get("x-vercel-ip-country") ||
    request.headers.get("cloudfront-viewer-country") ||
    request.headers.get("x-country-code") ||
    request.headers.get("x-nf-geo") ||
    null;

  let resolvedCountry = country;
  if (country && country.startsWith("{")) {
    try {
      const parsed = JSON.parse(country);
      resolvedCountry = parsed.country?.code || null;
    } catch {
      resolvedCountry = null;
    }
  }

  const market: MarketCode = marketFromCountry(resolvedCountry);

  return NextResponse.json(
    {
      market,
      country: resolvedCountry,
      source: resolvedCountry ? "edge-header" : "default",
    },
    { headers: { "Cache-Control": "private, no-cache, no-store, must-revalidate" } }
  );
}
