export const runtime = "edge";
export const dynamic = "force-dynamic";

const SUPPORTED_MARKETS: Record<string, string> = {
  IN: "IN",
  US: "US",
  GB: "GB",
  CA: "CA",
  AU: "AU",
  AE: "AE",
};

export async function GET(request: Request): Promise<Response> {
  try {
    const headers = request.headers;

    // 1. Check for manual cookie override if present
    const cookieHeader = headers.get("cookie") || "";
    if (cookieHeader.includes("pyngyn_market=")) {
      for (const part of cookieHeader.split(";")) {
        const [key, val] = part.trim().split("=");
        if (key === "pyngyn_market" && val) {
          const cookieVal = decodeURIComponent(val).trim().toUpperCase();
          const market = SUPPORTED_MARKETS[cookieVal] || (cookieVal === "DEFAULT" ? "DEFAULT" : null);
          if (market) {
            return new Response(
              JSON.stringify({
                market,
                country: market === "DEFAULT" ? null : market,
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
        }
      }
    }

    // 2. Direct edge header detection (native on Cloudflare Workers / Pages)
    const cfCountry = headers.get("cf-ipcountry");
    const vercelCountry = headers.get("x-vercel-ip-country");
    const cfViewerCountry = headers.get("cloudfront-viewer-country");
    const xCountry = headers.get("x-country-code");

    const rawCountry = (cfCountry || vercelCountry || cfViewerCountry || xCountry || "")
      .trim()
      .toUpperCase();

    if (rawCountry && rawCountry.length === 2 && rawCountry !== "XX" && rawCountry !== "T1") {
      const market = SUPPORTED_MARKETS[rawCountry] || "DEFAULT";
      return new Response(
        JSON.stringify({
          market,
          country: rawCountry,
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

    // 3. Default fallback to USD
    return new Response(
      JSON.stringify({
        market: "DEFAULT",
        country: null,
        source: "default",
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "private, no-cache, no-store, must-revalidate",
        },
      }
    );
  } catch (_err) {
    // Top-level fail-safe: Never return 500
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
