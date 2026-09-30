import { detectCountry, marketFromCountry } from "@/lib/pricing/detect-country";
import { type MarketCode } from "@/lib/pricing/config";

export const runtime = "edge";
export const dynamic = "force-dynamic";

export async function GET(request: Request): Promise<Response> {
  try {
    const headers = request?.headers;

    // 1. Direct edge header check (fast path on Cloudflare Pages)
    // Cloudflare edge automatically populates cf-ipcountry based on visitor / VPN IP
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

    // 2. Fall back to multi-provider detectCountry (handles Vercel, CloudFront, and IP geolocation)
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
