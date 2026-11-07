import { test, afterEach } from "node:test";
import assert from "node:assert/strict";
import { fetchReferralProgram, getReferralProgram, DEFAULT_PROGRAM, mergeProgram, shareMessage } from "../lib/referralProgram.ts";

const ENDPOINT = "https://example.test/functions/v1/referral-code";
const realFetch = globalThis.fetch;

afterEach(() => {
  globalThis.fetch = realFetch;
  delete process.env.NEXT_PUBLIC_REFERRAL_ENDPOINT;
});

/** Stubs fetch with one answer and records the calls. */
function stubFetch(answer) {
  const calls = [];
  globalThis.fetch = async (url, init) => {
    calls.push({ url: String(url), method: init?.method, cache: init?.cache });
    if (answer instanceof Error) throw answer;
    return answer;
  };
  return calls;
}

const json = (body, status = 200) =>
  new Response(typeof body === "string" ? body : JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });

const FIXED = {
  referee: { type: "fixed", value: 50, currency: "USD", label: "$50" },
  referrer: { type: "percent", value: 25, currency: "USD", label: "25%" },
  min_withdrawal_usd: 150,
  hold_days: 14,
  attribution_days: 60,
  discount_days: 60,
  annual_only: false,
  referee_text: "$50 off their first annual plan",
  referrer_text: "25% of what they pay in their first year",
};

test("returns the endpoint's values, with a GET to the referral endpoint", async () => {
  process.env.NEXT_PUBLIC_REFERRAL_ENDPOINT = ENDPOINT;
  const calls = stubFetch(json({ ok: true, program: FIXED, fallback: false }));
  assert.deepEqual(await getReferralProgram(), FIXED);
  // Fresh every time: no-store, and no Next.js revalidate
  assert.deepEqual(calls, [{ url: ENDPOINT, method: "GET", cache: "no-store" }]);
});

test("returns the defaults when the endpoint variable is missing", async () => {
  const calls = stubFetch(json({ ok: true, program: FIXED }));
  assert.deepEqual(await getReferralProgram(), DEFAULT_PROGRAM);
  assert.equal(calls.length, 0);
});

test("returns the defaults on a network error", async () => {
  process.env.NEXT_PUBLIC_REFERRAL_ENDPOINT = ENDPOINT;
  stubFetch(new TypeError("fetch failed"));
  assert.deepEqual(await getReferralProgram(), DEFAULT_PROGRAM);
});

test("returns the defaults on a non-200", async () => {
  process.env.NEXT_PUBLIC_REFERRAL_ENDPOINT = ENDPOINT;
  stubFetch(json({ ok: true, program: FIXED }, 503));
  assert.deepEqual(await getReferralProgram(), DEFAULT_PROGRAM);
});

test("returns the defaults on bad JSON or an answer without a program", async () => {
  process.env.NEXT_PUBLIC_REFERRAL_ENDPOINT = ENDPOINT;
  stubFetch(json("<html>oops</html>"));
  assert.deepEqual(await getReferralProgram(), DEFAULT_PROGRAM);
  stubFetch(json({ ok: false }));
  assert.deepEqual(await getReferralProgram(), DEFAULT_PROGRAM);
});

test("merges a partial answer over the defaults", async () => {
  process.env.NEXT_PUBLIC_REFERRAL_ENDPOINT = ENDPOINT;
  stubFetch(json({ ok: true, program: { referrer: { label: "30%", value: 30 }, attribution_days: 45 } }));
  const p = await getReferralProgram();
  assert.equal(p.attribution_days, 45);
  assert.deepEqual(p.referrer, { type: "percent", value: 30, currency: "USD", label: "30%" });
  assert.deepEqual(p.referee, DEFAULT_PROGRAM.referee);
  assert.equal(p.referee_text, DEFAULT_PROGRAM.referee_text);
  assert.equal(p.min_withdrawal_usd, 100);
});

test("ignores fields with the wrong type, so nothing goes blank", () => {
  const p = mergeProgram({ referee_text: "", min_withdrawal_usd: "lots", referee: { type: "weird", label: 5 }, annual_only: "no" });
  assert.deepEqual(p, DEFAULT_PROGRAM);
});

test("share text is written to the friend and follows the referee reward", () => {
  assert.deepEqual(shareMessage(DEFAULT_PROGRAM), {
    text: "I use Pyngyn to run my practice. Sign up with my link and get 10% off your first annual plan:",
    subject: "10% off Pyngyn",
  });
  // FIXED is not annual-only, so no "annual"
  assert.deepEqual(shareMessage(FIXED), {
    text: "I use Pyngyn to run my practice. Sign up with my link and get $50 off your first plan:",
    subject: "$50 off Pyngyn",
  });
});

test("never throws, even when AbortSignal.timeout is missing", async () => {
  process.env.NEXT_PUBLIC_REFERRAL_ENDPOINT = ENDPOINT;
  const original = AbortSignal.timeout;
  AbortSignal.timeout = undefined;
  try {
    stubFetch(json({ ok: true, program: FIXED }));
    assert.deepEqual(await getReferralProgram(), FIXED);
  } finally {
    AbortSignal.timeout = original;
  }
});

test("returns the defaults when the endpoint gives no answer in time", async () => {
  process.env.NEXT_PUBLIC_REFERRAL_ENDPOINT = ENDPOINT;
  let aborted = false;
  globalThis.fetch = (_url, init) =>
    new Promise(() => {
      init?.signal?.addEventListener("abort", () => (aborted = true));
    });
  assert.deepEqual(await getReferralProgram(30), DEFAULT_PROGRAM);
  assert.equal(aborted, true);
});

test("fetchReferralProgram gives null on failure, so the page can keep what it shows", async () => {
  process.env.NEXT_PUBLIC_REFERRAL_ENDPOINT = ENDPOINT;
  stubFetch(json({ ok: true, program: FIXED }, 500));
  assert.equal(await fetchReferralProgram(), null);
  stubFetch(json({ ok: true, program: FIXED }));
  assert.deepEqual(await fetchReferralProgram(), FIXED);
});
