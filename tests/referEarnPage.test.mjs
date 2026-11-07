// Renders the Refer and earn page body with a fixed-amount program and checks every
// reward on it comes from the program. Needs the .tsx loader: see package.json "test".
import { test } from "node:test";
import assert from "node:assert/strict";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { ReferEarnContent } from "../components/refer/ReferEarnContent.tsx";
import { ReferEarnLive } from "../components/refer/ReferEarnLive.tsx";
import { shareHref } from "../components/ReferralJoin.tsx";
import {
  DEFAULT_PROGRAM,
  fetchReferralProgram,
  getReferralProgram,
  referralCopy,
  shareMessage,
  watchReferralProgram,
} from "../lib/referralProgram.ts";

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
  return textOf(renderToStaticMarkup(createElement(ReferEarnContent, { program })));
}

function textOf(html) {
  return html
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

test("the default program is the current one: 10% / 10%, $100 minimum, 90 days", () => {
  const text = pageText(DEFAULT_PROGRAM);
  assert.match(text, /They get 10% off their first annual plan, and you earn 10% of what they pay in their first year/);
  assert.match(text, /90-day attribution/);
  assert.match(text, /They save 10%, you earn 10%/);
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
      assert.match(html, /They get 10% off their first annual plan/, name);
      assert.match(html, /90-day attribution/, name);
      assert.match(html, /\$100/, name);
    }
  } finally {
    globalThis.fetch = realFetch;
    delete process.env.NEXT_PUBLIC_REFERRAL_ENDPOINT;
  }
});

test("payouts are bank transfers, not monthly", () => {
  const text = pageText(DEFAULT_PROGRAM);
  assert.match(text, /Bank transfer payouts/);
  assert.doesNotMatch(text, /[Mm]onthly payouts|paid monthly/);
});

test("the FAQ data and meta description for search engines carry the defaults", () => {
  const copy = referralCopy(DEFAULT_PROGRAM);
  assert.match(copy.metaDescription, /gets 10% off their first annual plan, and you earn 10% of what they pay/);
  assert.match(copy.faq.find((f) => f.q === "How much do I earn per referral?").a, /10% of what they pay/);
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

// ------------------------------------------------------------ live values (skeletons, polling)

const LIVE_10 = {
  ...DEFAULT_PROGRAM,
  referee: { type: "percent", value: 10, currency: "USD", label: "10%" },
  referrer: { type: "percent", value: 10, currency: "USD", label: "10%" },
  referee_text: "10% off their first annual plan",
  referrer_text: "10% of what they pay in their first year",
};
const LIVE_15_25 = {
  ...DEFAULT_PROGRAM,
  referee: { type: "percent", value: 15, currency: "USD", label: "15%" },
  referrer: { type: "percent", value: 25, currency: "USD", label: "25%" },
  referee_text: "15% off their first annual plan",
  referrer_text: "25% of what they pay in their first year",
};

/** A stand-in for `document` that lets a test hide and show the tab. */
function fakeDocument() {
  const listeners = new Set();
  return {
    visibilityState: "visible",
    addEventListener: (_t, fn) => listeners.add(fn),
    removeEventListener: (_t, fn) => listeners.delete(fn),
    set(state) {
      this.visibilityState = state;
      for (const fn of listeners) fn();
    },
  };
}

const tick = (ms = 0) => new Promise((r) => setTimeout(r, ms));

test("while the values load, every reward is a skeleton and no percentage or amount is on the page", () => {
  // The static HTML is this first render (effects don't run there).
  const html = renderToStaticMarkup(createElement(ReferEarnLive));
  const text = textOf(html);
  assert.match(html, /data-skeleton/);
  assert.match(html, /animate-pulse/);
  assert.doesNotMatch(text, /20\s?%/);
  assert.doesNotMatch(text, /10\s?%/);
  assert.doesNotMatch(text, /\d+\s?%/);
  assert.doesNotMatch(text, /\$\d/);
  assert.doesNotMatch(text, /\d+[- ]day/);
  // Text with no numbers shows at once
  assert.match(text, /How it works\./);
  assert.match(text, /Who this is for\./);
  assert.match(text, /Join in 30 seconds/);
  assert.match(text, /How much do I earn per referral\?/);
  assert.match(text, /Can the firm I referred get a refund\? No\. A plan bought/);
  assert.match(text, /What you earn/);
  assert.match(text, /Commission/);
  // Get my link works while loading
  assert.match(html, /<button type="button"[^>]*>Get my link<\/button>/);
  assert.doesNotMatch(html, /<button type="button" disabled/);
});

test("after the endpoint answers 10% / 10%, the hero, steps, tables and FAQ show 10%; a later poll of 15% / 25% updates them", async () => {
  const doc = fakeDocument();
  const answers = [LIVE_10, LIVE_15_25];
  let calls = 0;
  const seen = [];
  const stop = watchReferralProgram((p) => seen.push(p), {
    doc,
    pollMs: 20,
    load: async () => answers[Math.min(calls++, answers.length - 1)],
  });
  try {
    await tick();
    assert.deepEqual(seen, [LIVE_10]);
    let html = renderToStaticMarkup(createElement(ReferEarnLive, { initial: seen.at(-1) }));
    let text = textOf(html);
    assert.doesNotMatch(html, /data-skeleton/);
    assert.match(text, /They get 10% off their first annual plan, and you earn 10% of what they pay in their first year/); // hero
    assert.match(text, /They get 10% off/); // step 3
    assert.match(text, /You earn 10% You earn 10% of what they pay/); // step 4
    assert.match(text, /What you earn 10%/); // table
    assert.match(text, /What your friend gets 10% off/); // table
    assert.match(text, /You earn 10% of what they pay in their first year for every paid referral/); // FAQ
    assert.match(text, /They save 10%, you earn 10%/); // under Get my link
    assert.doesNotMatch(text, /20\s?%/);

    await tick(60); // a poll
    assert.deepEqual(seen, [LIVE_10, LIVE_15_25]); // only changes are reported
    text = pageText(seen.at(-1));
    assert.match(text, /They get 15% off their first annual plan, and you earn 25% of what they pay/);
    assert.match(text, /They save 15%, you earn 25%/);
    assert.match(text, /What you earn 25%/);
    assert.doesNotMatch(text, /10\s?%/);
  } finally {
    stop();
  }
});

test("each failure shows the defaults with no skeleton left, and a later success replaces them", async () => {
  const realFetch = globalThis.fetch;
  const ENDPOINT = "https://example.test/functions/v1/referral-code";
  const failures = {
    "variable unset": null,
    "network error": async () => { throw new TypeError("fetch failed"); },
    "a non-200": async () => new Response("Internal Server Error", { status: 500 }),
    "bad JSON": async () => new Response("<html>", { status: 200, headers: { "Content-Type": "application/json" } }),
    "no answer within the timeout": () => new Promise(() => {}),
  };
  try {
    for (const [name, fake] of Object.entries(failures)) {
      if (fake) {
        process.env.NEXT_PUBLIC_REFERRAL_ENDPOINT = ENDPOINT;
        globalThis.fetch = fake;
      } else {
        delete process.env.NEXT_PUBLIC_REFERRAL_ENDPOINT;
      }
      const seen = [];
      const stop = watchReferralProgram((p) => seen.push(p), {
        doc: fakeDocument(),
        pollMs: 60_000,
        load: () => fetchReferralProgram(30),
      });
      await tick(60);
      stop();
      assert.deepEqual(seen, [DEFAULT_PROGRAM], name);
      const html = renderToStaticMarkup(createElement(ReferEarnLive, { initial: seen[0] }));
      assert.doesNotMatch(html, /data-skeleton|animate-pulse/, name);
      assert.match(textOf(html), /They get 10% off their first annual plan/, name);
      assert.match(html, /90-day attribution/, name);
      assert.match(html, /\$100/, name);
    }
  } finally {
    globalThis.fetch = realFetch;
    delete process.env.NEXT_PUBLIC_REFERRAL_ENDPOINT;
  }

  // Defaults first, then a poll that succeeds; a failure after that keeps the live values.
  const answers = [null, LIVE_15_25, null];
  let calls = 0;
  const seen = [];
  const stop = watchReferralProgram((p) => seen.push(p), {
    doc: fakeDocument(),
    pollMs: 15,
    load: async () => answers[Math.min(calls++, answers.length - 1)],
  });
  await tick(80);
  stop();
  assert.deepEqual(seen, [DEFAULT_PROGRAM, LIVE_15_25]);
});

test("reads again when the tab becomes visible and does not poll while it is hidden", async () => {
  const doc = fakeDocument();
  let calls = 0;
  const stop = watchReferralProgram(() => {}, {
    doc,
    pollMs: 15,
    load: async () => {
      calls++;
      return LIVE_10;
    },
  });
  try {
    await tick();
    assert.equal(calls, 1); // on load
    doc.set("hidden");
    const hiddenAt = calls;
    await tick(80);
    assert.equal(calls, hiddenAt, "no requests while hidden");
    doc.set("visible");
    await tick();
    assert.equal(calls, hiddenAt + 1, "a request as soon as the tab is visible");
    await tick(60);
    assert.ok(calls >= hiddenAt + 3, "polling again while visible");
  } finally {
    stop();
  }
  const after = calls;
  await tick(50);
  assert.equal(calls, after, "stop() ends polling");
});

test("the share buttons are disabled while loading and use the live values after", () => {
  const link = "https://app.pyngyn.ai/?signup=true&ref=abc";
  for (const net of ["x", "linkedin", "whatsapp", "email"]) assert.equal(shareHref(net, link, null), undefined, net);
  const email = decodeURIComponent(shareHref("email", link, LIVE_15_25));
  assert.match(email, /subject=15% off Pyngyn&body=.*get 15% off your first annual plan:/);
});
