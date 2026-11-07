// Renders the Refer and earn page body with a fixed-amount program and checks every
// reward on it comes from the program. Needs the .tsx loader: see package.json "test".
import { test } from "node:test";
import assert from "node:assert/strict";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { ReferEarnContent } from "../components/refer/ReferEarnContent.tsx";
import { ReferEarnLive } from "../components/refer/ReferEarnLive.tsx";
import { DEFAULT_PROGRAM, getReferralProgram, referralCopy, shareMessage } from "../lib/referralProgram.ts";

const FIXED = {
  referee: { type: "fixed", value: 50, currency: "USD", label: "$50" },
  referrer: { type: "percent", value: 25, currency: "USD", label: "25%" },
  min_withdrawal_usd: 150,
  hold_days: 14,
  attribution_days: 60,
  discount_days: 60,
  annual_only: true,
  referee_text: "$50 off their first annual plan",
  referrer_text: "25% of what they pay in their first year",
};

/** Page text with tags removed and entities decoded, so sentences can be matched. */
function pageText(program) {
  return renderToStaticMarkup(createElement(ReferEarnContent, { program }))
    .replace(/<[^>]+>/g, " ")
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, " ");
}

test("a fixed $50 / 25% program shows those numbers everywhere and no 20%", () => {
  const text = pageText(FIXED);
  // Hero and badges
  assert.match(text, /They get \$50 off their first annual plan, and you earn 25% of what they pay in their first year\. No cap, no catch\./);
  assert.match(text, /60-day attribution/);
  // How it works, steps 3 and 4
  assert.match(text, /They get \$50 off/);
  assert.match(text, /through your link gets \$50 off their first annual plan/);
  assert.match(text, /You earn 25% You earn 25% of what they pay in their first year/);
  // The "Get my link" card
  assert.match(text, /They save \$50, you earn 25%\. No cost to join\./);
  // Breakdown
  assert.match(text, /60 days from first click/);
  assert.match(text, /from \$150/);
  // Payouts
  assert.match(text, /You earn 25% of what they pay in their first year\. Withdrawals are paid by bank transfer and processed in 3 to 5 business days\./);
  assert.doesNotMatch(text, /PayPal/);
  // FAQ
  assert.match(text, /You earn 25% of what they pay in their first year for every paid referral/);
  assert.match(text, /Can the firm I referred get a refund\? No\. A plan bought with the referral discount is not refundable\. This is shown at checkout before they pay\./);
  assert.match(text, /gets \$50 off their first annual plan\. The discount is applied automatically/);
  assert.match(text, /the attribution lasts for 60 days/);
  assert.match(text, /once your earnings reach \$150/);
  assert.match(text, /rewards annual plan subscriptions only/);
  // Terms summary
  assert.match(text, /referrers earn 25% of what they pay in their first year for each qualifying paid referral, and the referred firm gets \$50 off their first annual plan\. Payouts start once earnings reach \$150\. Withdrawals are paid by bank transfer and processed in 3 to 5 business days\. Only annual plans qualify\. A plan bought with a referral discount is not refundable\./);
  // Share text (used by the share buttons once a link is made)
  assert.match(shareMessage(FIXED).text, /get \$50 off your first annual plan:$/);
  assert.equal(shareMessage(FIXED).subject, "$50 off Pyngyn");
  // Nothing left over from the old fixed copy
  assert.doesNotMatch(text, /30-day/);
  assert.doesNotMatch(text, /20\s?%/);
  assert.doesNotMatch(text, /90[- ]day/);
  assert.doesNotMatch(text, /\$100\b/);
});

test("the default program reads exactly as the page did before", () => {
  const text = pageText(DEFAULT_PROGRAM);
  assert.match(text, /They get 20% off their first annual plan, and you earn 20% of what they pay in their first year/);
  assert.match(text, /90-day attribution/);
  assert.match(text, /They save 20%, you earn 20%/);
  assert.match(text, /the attribution lasts for 90 days/);
  assert.match(text, /once your earnings reach \$100/);
});

test("with the endpoint failing in any way, the page renders the defaults without throwing", async () => {
  const realFetch = globalThis.fetch;
  const failures = {
    "variable unset": null,
    "network error": async () => { throw new TypeError("fetch failed"); },
    "a 500": async () => new Response("Internal Server Error", { status: 500 }),
    "bad JSON": async () => new Response("<html>", { status: 200, headers: { "Content-Type": "application/json" } }),
  };
  try {
    for (const [name, fake] of Object.entries(failures)) {
      if (fake) {
        process.env.NEXT_PUBLIC_REFERRAL_ENDPOINT = "https://example.test/functions/v1/referral-code";
        globalThis.fetch = fake;
      } else {
        delete process.env.NEXT_PUBLIC_REFERRAL_ENDPOINT;
      }
      // What the browser does after load: read the program, then render with it.
      const program = await getReferralProgram();
      assert.deepEqual(program, DEFAULT_PROGRAM, name);
      const html = renderToStaticMarkup(createElement(ReferEarnLive, { initial: program }));
      assert.match(html, /They get 20% off their first annual plan/, name);
      assert.match(html, /90-day attribution/, name);
      assert.match(html, /\$100/, name);
    }
  } finally {
    globalThis.fetch = realFetch;
    delete process.env.NEXT_PUBLIC_REFERRAL_ENDPOINT;
  }
});

test("the FAQ data for search engines has the refund answer and no 30-day window", () => {
  // app/refer-and-earn/page.tsx builds its FAQPage JSON-LD from referralCopy(DEFAULT_PROGRAM).faq.
  const faq = referralCopy(DEFAULT_PROGRAM).faq;
  const refund = faq.find((f) => f.q === "Can the firm I referred get a refund?");
  assert.equal(refund?.a, "No. A plan bought with the referral discount is not refundable. This is shown at checkout before they pay.");
  assert.doesNotMatch(JSON.stringify(faq), /30-day|PayPal/);
});

test("monthly plans are described as qualifying when the program is not annual-only", () => {
  const text = pageText({ ...FIXED, annual_only: false });
  assert.match(text, /Referrals on monthly and annual plans both qualify/);
  assert.doesNotMatch(text, /Only annual plans qualify/);
});
