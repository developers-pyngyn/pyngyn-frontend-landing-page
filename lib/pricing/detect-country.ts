/*
 * Visitor country resolution for pricing display. Detection only — no price
 * rendering, no checkout logic.
 *
 * Four providers, tried in order of cost/latency/privacy, each optional and
 * self-disabling when structurally unavailable:
 *   1  edge headers   (host-native, free, no third party sees the IP)
 *   2  local MaxMind  (offline; opt-in via registerMaxmindLoader)
 *   3  ipwhois.io     (free tier, no key)
 *   4  ipapi.co       (free tier, no key)
 *
 * A valid `pyngyn_market` cookie short-circuits the whole chain: a manual
 * override always beats detection. Detection never blocks a render — the whole
 * resolution is budgeted, and anything unresolved falls back to USD silently.
 *
 * IP is display-only. What gets *charged* is decided from the payment method,
 * not from this file.
 */

import { PRICING, type MarketCode } from "./config";

/* ────────────────────────────────────────────────────────────────────
   Types
   ──────────────────────────────────────────────────────────────────── */

export type DetectionSource =
  | "edge-header"
  | "maxmind"
  | "ipwhois"
  | "ipapi"
  | `parallel:${string}`
  | "cookie"
  | "default";

export type AttemptOutcome = "hit" | "miss" | "skipped" | "timeout" | "error";

export type Attempt = { provider: string; outcome: AttemptOutcome; ms: number };

export type DetectionResult = {
  market: MarketCode;
  /** the two-letter code a provider returned, before market mapping */
  rawCountry: string | null;
  source: DetectionSource;
  attempts: Attempt[];
  durationMs: number;
  /** true when nothing resolved and USD was assumed */
  fallback: boolean;
};

/** Minimal request shape — a Fetch `Request` satisfies it. */
export type DetectRequest = {
  headers: { get(name: string): string | null };
  /** raw Cookie header, when not already on `headers` */
  cookie?: string | null;
};

type ProviderName = "edge-header" | "maxmind" | "ipwhois" | "ipapi";

type Provider = {
  name: ProviderName;
  timeoutMs: number;
  /** structurally usable for this request? false ⇒ skipped, not failed */
  isAvailable: (context: ResolveContext) => boolean;
  /** resolves a raw country code, or null for "no answer" */
  resolve: (context: ResolveContext, signal: AbortSignal) => Promise<string | null>;
};

type ResolveContext = { request: DetectRequest; ip: string | null };

/* ────────────────────────────────────────────────────────────────────
   Cookie
   ──────────────────────────────────────────────────────────────────── */

export const MARKET_COOKIE = "pyngyn_market";
/** 180 days */
export const MARKET_COOKIE_MAX_AGE = 60 * 60 * 24 * 180;

/**
 * Attributes for the first-party override cookie. Deliberately NOT HttpOnly:
 * the manual currency selector writes it from the client.
 */
export const MARKET_COOKIE_OPTIONS = {
  path: "/",
  maxAge: MARKET_COOKIE_MAX_AGE,
  sameSite: "lax" as const,
  httpOnly: false,
  secure: true,
};

export function serializeMarketCookie(market: MarketCode): string {
  const { path, maxAge, sameSite, secure } = MARKET_COOKIE_OPTIONS;
  return [
    `${MARKET_COOKIE}=${market}`,
    `Path=${path}`,
    `Max-Age=${maxAge}`,
    `SameSite=${sameSite === "lax" ? "Lax" : sameSite}`,
    secure ? "Secure" : "",
  ]
    .filter(Boolean)
    .join("; ");
}

function readCookie(request: DetectRequest, name: string): string | null {
  const header = request.cookie ?? request.headers.get("cookie");
  if (!header) return null;
  for (const part of header.split(";")) {
    const [key, ...rest] = part.trim().split("=");
    if (key === name) return decodeURIComponent(rest.join("="));
  }
  return null;
}

/* ────────────────────────────────────────────────────────────────────
   Validation / market mapping
   ──────────────────────────────────────────────────────────────────── */

const COUNTRY_RE = /^[A-Z]{2}$/;

/** A provider answer counts only as a bare two-letter A–Z code. */
function normalizeCountry(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const code = value.trim().toUpperCase();
  return COUNTRY_RE.test(code) ? code : null;
}

/**
 * Map a country to a market. A valid-but-unsupported country is a *success*
 * that resolves to DEFAULT (USD) — it is not a provider failure.
 */
export function marketFromCountry(country: string | null | undefined): MarketCode {
  const code = (country ?? "").trim().toUpperCase();
  if (code === "DEFAULT") return "DEFAULT";
  return code !== "" && code in PRICING ? (code as MarketCode) : "DEFAULT";
}

/** Markets a visitor may pick manually (the six, plus Other/USD). */
export const SELECTABLE_MARKETS: readonly MarketCode[] = [
  "US",
  "GB",
  "CA",
  "AU",
  "AE",
  "IN",
  "DEFAULT",
];

function isSelectableMarket(value: string): value is MarketCode {
  return (SELECTABLE_MARKETS as readonly string[]).includes(value.toUpperCase());
}

/* ────────────────────────────────────────────────────────────────────
   Client IP
   ──────────────────────────────────────────────────────────────────── */

/**
 * Providers 3 and 4 need the visitor's IP. Without one they are skipped —
 * calling them with the server's own IP would resolve to the datacentre.
 */
function clientIp(request: DetectRequest): string | null {
  const forwarded = request.headers.get("x-forwarded-for");
  const first = forwarded?.split(",")[0]?.trim();
  const ip = first || request.headers.get("x-real-ip")?.trim() || "";
  if (!ip) return null;
  // Loopback/private addresses resolve to nothing useful.
  if (/^(127\.|::1$|10\.|192\.168\.|172\.(1[6-9]|2\d|3[01])\.)/.test(ip)) return null;
  return ip;
}

/* ────────────────────────────────────────────────────────────────────
   MaxMind (opt-in, offline)
   ──────────────────────────────────────────────────────────────────── */

export type MaxmindLookup = (ip: string) => string | null | Promise<string | null>;

let maxmindLookup: MaxmindLookup | null = null;

/**
 * Registers a local GeoLite2 lookup, loaded once by the caller at module scope
 * (e.g. `maxmind.open(process.env.MAXMIND_DB_PATH)`), never per request. Until
 * something registers one — no DB in the deploy — this provider self-skips, so
 * no dependency is required here.
 */
export function registerMaxmindLoader(lookup: MaxmindLookup | null): void {
  maxmindLookup = lookup;
}

/* ────────────────────────────────────────────────────────────────────
   Providers
   ──────────────────────────────────────────────────────────────────── */

/** first hit wins */
const EDGE_HEADERS = [
  "x-vercel-ip-country",
  "cf-ipcountry",
  "x-nf-geo",
  "cloudfront-viewer-country",
  "fastly-client-geo-country",
] as const;

function readEdgeHeaders(request: DetectRequest): string | null {
  for (const name of EDGE_HEADERS) {
    const value = request.headers.get(name);
    if (!value) continue;
    if (name === "x-nf-geo") {
      // Netlify ships JSON: { country: { code: "GB" }, ... }
      try {
        const parsed = JSON.parse(value) as { country?: { code?: unknown } };
        const code = normalizeCountry(parsed.country?.code);
        if (code) return code;
      } catch {
        /* malformed body — treat as no answer and keep looking */
      }
      continue;
    }
    const code = normalizeCountry(value);
    if (code) return code;
  }
  return null;
}

async function fetchText(url: string, signal: AbortSignal): Promise<string> {
  const response = await fetch(url, {
    signal,
    headers: { accept: "application/json, text/plain" },
  });
  if (!response.ok) throw new Error(`status ${response.status}`);
  return response.text();
}

/**
 * Order, timeouts and enablement live here — adding, reordering or disabling a
 * provider is a one-line edit. Any provider needing a key would read it from
 * env in `isAvailable` and self-disable when absent; none do today.
 */
export const PROVIDERS: readonly Provider[] = [
  {
    name: "edge-header",
    timeoutMs: 0, // synchronous header read
    isAvailable: ({ request }) => EDGE_HEADERS.some((name) => !!request.headers.get(name)),
    resolve: async ({ request }) => readEdgeHeaders(request),
  },
  {
    name: "maxmind",
    timeoutMs: 100,
    isAvailable: ({ ip }) => maxmindLookup !== null && ip !== null,
    resolve: async ({ ip }) => {
      if (!maxmindLookup || !ip) return null;
      return normalizeCountry(await maxmindLookup(ip));
    },
  },
  {
    name: "ipwhois",
    timeoutMs: 400,
    isAvailable: ({ ip }) => ip !== null,
    resolve: async ({ ip }, signal) => {
      const body = await fetchText(`https://ipwhois.app/json/${encodeURIComponent(ip!)}`, signal);
      const parsed = JSON.parse(body) as { country_code?: unknown };
      return normalizeCountry(parsed.country_code);
    },
  },
  {
    name: "ipapi",
    timeoutMs: 400,
    isAvailable: ({ ip }) => ip !== null,
    resolve: async ({ ip }, signal) => {
      const body = await fetchText(`https://ipapi.co/${encodeURIComponent(ip!)}/country/`, signal);
      return normalizeCountry(body);
    },
  },
];

/* ────────────────────────────────────────────────────────────────────
   Budgets, cache, circuit breaker, counters
   ──────────────────────────────────────────────────────────────────── */

const TOTAL_BUDGET_MS = 1200;
const PARALLEL_BUDGET_MS = 600;

const CACHE_MAX = 5000;
const CACHE_TTL_MS = 24 * 60 * 60 * 1000;

type CacheEntry = { country: string; source: DetectionSource; expires: number };
/** insertion-ordered Map used as an LRU */
const ipCache = new Map<string, CacheEntry>();

function cacheGet(ip: string): CacheEntry | null {
  const entry = ipCache.get(ip);
  if (!entry) return null;
  if (entry.expires < Date.now()) {
    ipCache.delete(ip);
    return null;
  }
  // touch for recency
  ipCache.delete(ip);
  ipCache.set(ip, entry);
  return entry;
}

function cacheSet(ip: string, country: string, source: DetectionSource): void {
  ipCache.set(ip, { country, source, expires: Date.now() + CACHE_TTL_MS });
  while (ipCache.size > CACHE_MAX) {
    const oldest = ipCache.keys().next().value;
    if (oldest === undefined) break;
    ipCache.delete(oldest);
  }
}

const BREAKER_THRESHOLD = 5;
const BREAKER_COOLDOWN_MS = 10 * 60 * 1000;

type BreakerState = { failures: number; openUntil: number; probing: boolean };
const breakers = new Map<ProviderName, BreakerState>();

function breaker(name: ProviderName): BreakerState {
  let state = breakers.get(name);
  if (!state) {
    state = { failures: 0, openUntil: 0, probing: false };
    breakers.set(name, state);
  }
  return state;
}

/** Open breaker ⇒ skip, except for a single probe once the cooldown expires. */
function breakerBlocks(name: ProviderName): boolean {
  const state = breaker(name);
  if (state.openUntil === 0) return false;
  if (Date.now() < state.openUntil) return true;
  if (state.probing) return true;
  state.probing = true; // allow exactly one probe through
  return false;
}

function breakerSuccess(name: ProviderName): void {
  const state = breaker(name);
  state.failures = 0;
  state.openUntil = 0;
  state.probing = false;
}

function breakerFailure(name: ProviderName): void {
  const state = breaker(name);
  state.failures += 1;
  state.probing = false;
  if (state.failures >= BREAKER_THRESHOLD) {
    state.openUntil = Date.now() + BREAKER_COOLDOWN_MS;
  }
}

const sourceCounts = new Map<DetectionSource, number>();

function countSource(source: DetectionSource): void {
  sourceCounts.set(source, (sourceCounts.get(source) ?? 0) + 1);
}

/** Snapshot of the source mix — if `ipapi` carries real traffic, the edge
 *  header setup is misconfigured and should be fixed at the host. */
export function getDetectionMetrics(): Record<string, number> {
  return Object.fromEntries(sourceCounts);
}

/* ────────────────────────────────────────────────────────────────────
   Resolution
   ──────────────────────────────────────────────────────────────────── */

type ProviderRun = { outcome: AttemptOutcome; ms: number; country: string | null };

async function runProvider(
  provider: Provider,
  context: ResolveContext,
  budgetMs: number,
): Promise<ProviderRun> {
  const started = Date.now();
  const controller = new AbortController();
  const limit = provider.timeoutMs === 0 ? budgetMs : Math.min(provider.timeoutMs, budgetMs);
  let timedOut = false;
  const timer =
    limit > 0
      ? setTimeout(() => {
          timedOut = true;
          controller.abort();
        }, limit)
      : undefined;

  try {
    const country = await provider.resolve(context, controller.signal);
    const valid = normalizeCountry(country);
    return {
      outcome: valid ? "hit" : "miss",
      ms: Date.now() - started,
      country: valid,
    };
  } catch {
    return {
      outcome: timedOut ? "timeout" : "error",
      ms: Date.now() - started,
      country: null,
    };
  } finally {
    if (timer) clearTimeout(timer);
  }
}

function isNetworkProvider(name: ProviderName): boolean {
  return name === "ipwhois" || name === "ipapi";
}

/**
 * Resolve the visitor's market. Never throws; never exceeds TOTAL_BUDGET_MS.
 */
export async function detectCountry(request: DetectRequest): Promise<DetectionResult> {
  const startedAt = Date.now();
  const attempts: Attempt[] = [];
  const elapsed = () => Date.now() - startedAt;
  const remaining = () => TOTAL_BUDGET_MS - elapsed();

  const finish = (
    country: string | null,
    source: DetectionSource,
    fallback: boolean,
  ): DetectionResult => {
    const result: DetectionResult = {
      market: marketFromCountry(country),
      rawCountry: country,
      source,
      attempts,
      durationMs: elapsed(),
      fallback,
    };
    countSource(source);
    // Debug only, and never the IP next to the country in one record.
    if (process.env.NODE_ENV !== "production") {
      console.debug("[pricing] country resolved", {
        source: result.source,
        market: result.market,
        durationMs: result.durationMs,
        attempts: result.attempts,
      });
    }
    return result;
  };

  /* A manual override short-circuits everything. */
  const cookie = readCookie(request, MARKET_COOKIE);
  if (cookie && isSelectableMarket(cookie)) {
    return finish(cookie.toUpperCase(), "cookie", false);
  }

  const ip = clientIp(request);
  const context: ResolveContext = { request, ip };

  /* Repeat visitors and crawlers must not re-hit the paid-ish providers. */
  if (ip) {
    const cached = cacheGet(ip);
    if (cached) {
      attempts.push({ provider: "cache", outcome: "hit", ms: 0 });
      return finish(cached.country, cached.source, false);
    }
  }

  /* Sequential round: first valid result wins, later providers never run. */
  for (const provider of PROVIDERS) {
    if (remaining() <= 0) break;

    if (!provider.isAvailable(context)) {
      attempts.push({ provider: provider.name, outcome: "skipped", ms: 0 });
      continue;
    }
    if (isNetworkProvider(provider.name) && breakerBlocks(provider.name)) {
      attempts.push({ provider: provider.name, outcome: "skipped", ms: 0 });
      continue;
    }

    const run = await runProvider(provider, context, remaining());
    attempts.push({ provider: provider.name, outcome: run.outcome, ms: run.ms });

    if (isNetworkProvider(provider.name)) {
      if (run.outcome === "hit") breakerSuccess(provider.name);
      else if (run.outcome !== "miss") breakerFailure(provider.name);
    }

    if (run.country) {
      if (ip) cacheSet(ip, run.country, provider.name);
      return finish(run.country, provider.name, false);
    }
  }

  /* Last resort: everything at once, shared budget, first valid wins. This
     rescues a provider that was transiently slow rather than broken. */
  const parallelBudget = Math.min(PARALLEL_BUDGET_MS, Math.max(0, remaining()));
  const candidates = PROVIDERS.filter((provider) => provider.isAvailable(context));

  if (parallelBudget > 0 && candidates.length > 0) {
    const races = candidates.map(async (provider) => {
      const run = await runProvider(provider, context, parallelBudget);
      attempts.push({ provider: `parallel:${provider.name}`, outcome: run.outcome, ms: run.ms });
      if (!run.country) throw new Error("no result");
      return { provider: provider.name, country: run.country };
    });

    try {
      const winner = await Promise.any(races);
      if (ip) cacheSet(ip, winner.country, `parallel:${winner.provider}`);
      return finish(winner.country, `parallel:${winner.provider}`, false);
    } catch {
      /* every provider failed in the parallel round too */
    }
  }

  return finish(null, "default", true);
}
