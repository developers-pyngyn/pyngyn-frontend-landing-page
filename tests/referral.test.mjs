// Run with `npm test` (Node's built-in runner; Node 22.18+ strips the types in lib/referral.ts).
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  makeReferralCode,
  referralLink,
  cleanRefCode,
  parseRefCookie,
  refFromCookieString,
  withReferral,
} from "../lib/referral.ts";

test("same email always gives the same code (shared with the Pyngyn app)", async () => {
  const cases = [
    ["nikhil.wevois@gmail.com", "nikhilwevo-49fdae"],
    ["  Nikhil.Wevois@Gmail.com ", "nikhilwevo-49fdae"],
    ["anita@sharmaca.in", "anita-2e0428"],
    ["+++@x.com", "friend-8d0f34"],
  ];
  for (const [email, code] of cases) {
    assert.equal(await makeReferralCode(email), code, email);
  }
});

test("shared links open the Pyngyn app's sign-up page", () => {
  delete process.env.NEXT_PUBLIC_APP_SIGNUP_URL;
  assert.equal(referralLink("nikhilwevo-49fdae"), "https://app.pyngyn.ai/?signup=true&ref=nikhilwevo-49fdae");
  assert.equal(referralLink("anita-2e0428"), "https://app.pyngyn.ai/?signup=true&ref=anita-2e0428");
});

test("NEXT_PUBLIC_APP_SIGNUP_URL points shared links at another app", () => {
  process.env.NEXT_PUBLIC_APP_SIGNUP_URL = "https://staging.app.pyngyn.ai/?signup=true";
  try {
    assert.equal(referralLink("anita-2e0428"), "https://staging.app.pyngyn.ai/?signup=true&ref=anita-2e0428");
  } finally {
    delete process.env.NEXT_PUBLIC_APP_SIGNUP_URL;
  }
});

test("ref values are validated and lowercased", () => {
  assert.equal(cleanRefCode("NikhilWevo-49FDAE"), "nikhilwevo-49fdae");
  assert.equal(cleanRefCode("anita-ab12"), "anita-ab12"); // old 4-character codes
  assert.equal(cleanRefCode("toolongbase1-abcdef"), null);
  assert.equal(cleanRefCode("anita-abc"), null);
  assert.equal(cleanRefCode("<script>"), null);
  assert.equal(cleanRefCode(null), null);
});

test("cookie value is CODE.UNIX_SECONDS", () => {
  assert.deepEqual(parseRefCookie("nikhilwevo-49fdae.1793961600"), { code: "nikhilwevo-49fdae", at: 1793961600 });
  assert.equal(parseRefCookie("nikhilwevo-49fdae"), null);
  assert.equal(parseRefCookie("bad code.1793961600"), null);
  assert.deepEqual(refFromCookieString("a=1; pyngyn_ref=anita-2e0428.1700000000; b=2"), { code: "anita-2e0428", at: 1700000000 });
  assert.equal(refFromCookieString("a=1"), null);
});

test("app links carry the referral, other links do not", () => {
  const ref = { code: "nikhilwevo-49fdae", at: 1793961600 };
  assert.equal(
    withReferral("https://app.pyngyn.ai/?signup=true", ref),
    "https://app.pyngyn.ai/?signup=true&ref=nikhilwevo-49fdae&ref_at=1793961600",
  );
  assert.equal(withReferral("https://app.pyngyn.ai/", ref), "https://app.pyngyn.ai/?ref=nikhilwevo-49fdae&ref_at=1793961600");
  assert.equal(
    withReferral("https://app.pyngyn.ai/early-access", ref),
    "https://app.pyngyn.ai/early-access?ref=nikhilwevo-49fdae&ref_at=1793961600",
  );
  assert.equal(withReferral("https://app.pyngyn.ai.evil.com/", ref), "https://app.pyngyn.ai.evil.com/");
  assert.equal(withReferral("/pricing", ref), "/pricing");
  assert.equal(withReferral("https://app.pyngyn.ai/?signup=true", null), "https://app.pyngyn.ai/?signup=true");
});
