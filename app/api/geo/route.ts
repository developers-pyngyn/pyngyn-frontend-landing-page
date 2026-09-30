import { detectCountry, marketFromCountry, MARKET_COOKIE } from "@/lib/pricing/detect-country";
import { type MarketCode } from "@/lib/pricing/config";

export const runtime = "edge";
export const dynamic = "force-dynamic";

function getCookie(header: string | null, name: string): string | null {
  if (!header) return null;
  for (const part of header.split(";")) {
    const [key, ...rest] = part.trim().split("=");
    if (key === name) return decodeURIComponent(rest.join("="));
  }
  return null;
}

export async function GET(request: Request): Promise<Response> {
  try {
    const headers = request?.headers;
    const cookieHeader = headers?.get?.("cookie") || "";
    const cookieMarket = getCookie(cookieHeader, MARKET_COOKIE);

    // 1. Check override cookie first (user manual selection)
    if (cookieMarket) {
      const market = marketFromCountry(cookieMarket);
      return new Response(
        JSON.stringify({
          market,
          country: cookieMarket,
          source: "cookie",
        }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "private, no-cache, no-store, must-revalidate",
          },
        }
      );
    }

    // 2. Direct edge header check (fast path on Cloudflare Pages)
    const cfCountry = headers?.get?.("cf-ipcountry");
    if (cfCountry && cfCountry.length === 2 && cfCountry !== "XX" && cfCountry !== "T1") {
      const countryCode = cfCountry.toUpperCase();
      const market = marketFromCountry(countryCode);
      return new Response(
        JSON.stringify({
          market,
          country: countryCode,
          source: "edge-header",
        }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "private, no-cache, no-store, must-revalidate",
          },
        }
      );
    }

    // 3. Fall back to multi-provider detectCountry (handles Vercel, CloudFront, ipwhois, ipapi)
    const result = await detectCountry(request);

    return new Response(
      JSON.stringify({
        market: result.market,
        country: result.rawCountry,
        source: result.source,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "private, no-cache, no-store, must-revalidate",
        },
      }
    );
  } catch (err) {
    // Top-level fail-safe: Never return 500. Fall back to DEFAULT (USD) gracefully.
    return new Response(
      JSON.stringify({
        market: "DEFAULT",
        country: null,
        source: "fallback",
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "private, no-cache, no-store, must-revalidate",
        },
      }
    );
  }
}
