# PYNGYN marketing site — handoff notes

Everything below was built and verified against a real `npm run build` (clean compile, all 113 routes generate, no type errors) before packaging. Where noted, changes were also checked against a running production server, not just a build log.

## What changed, and why

### 1. Cookie consent banner (new)
**Files:** `components/consent.ts`, `components/CookieConsent.tsx`, `components/ConsentScripts.tsx`, `app/layout.tsx`, `.gitignore` (new — none existed before)

`/cookie-policy` promised Google Analytics and the Meta Pixel are "blocked/disabled until you consent" via a cookie banner. No such banner existed, and both trackers fired unconditionally on every page load — a real gap between the published policy and actual behavior.

- GTM and the Meta Pixel now load **only** after the visitor accepts (Accept all / Reject all / Customize, matching the exact wording in `/cookie-policy`).
- Removed the old `<noscript>` tracker fallbacks in `layout.tsx` — they'd fire unconditionally for JS-disabled visitors with no way to check consent first, which would have quietly defeated the whole gate.
- Added a "Cookie preferences" link in the footer so a visitor can change their mind later.
- Verified: raw server-rendered HTML contains zero GTM/Facebook references pre-consent; the tracker IDs now only exist inside `ConsentScripts.tsx`.

### 2. Google Ads conversion tracking via GTM
**Files:** `components/analytics.ts` (new), `components/CalendlyEmbed.tsx`

Added a `demo_scheduled` event pushed to `dataLayer` the moment a visitor actually books a call via the Calendly embed on `/demo` (listens for Calendly's `event_scheduled` postMessage) — this is the strongest available conversion signal, and previously nothing captured it. No booking details (name/email/time) are included, just the event.

**Still needs your action in the Google Ads / GTM dashboards** (can't be done from code — needs your login):
1. Create a Conversion Action in Google Ads, get the Conversion ID + Label.
2. In GTM: add a **Conversion Linker** tag (trigger: All Pages).
3. Add a **Google Ads Conversion Tracking** tag, triggered on the custom event `demo_scheduled`.
4. Test in GTM Preview, then publish.
5. Optional: click-based micro-conversions (e.g. "Start free trial" clicks) can be added as a GTM Click trigger with no further code — ask if you'd rather have those as `dataLayer` events instead for more reliability.
6. Heads-up: signup happens on `app.pyngyn.ai`, a different subdomain/codebase than this repo. If you want actual signups (not just demo bookings) as a second Ads conversion, that needs cross-domain linking or tracking added over there — outside what I can touch from this repo.

### 3. Two missing integrations added
**File:** `components/integrations-data.tsx`

Added **Computax** and **Zoho Books** under "Accounting & Billing," matching the tone of the existing QuickBooks/Xero entries. (Slack, Google Calendar, and n8n were already present — no change needed there.)

### 4. Fixed a real trust-signal inconsistency (SOC 2 wording)
**Files:** `components/Sections.tsx`, `components/Footer.tsx`, `components/schema.tsx`

The homepage Security section and footer badge both said the harder, specific claim **"SOC 2 Type II"** (implies a completed third-party audit), while the FAQ and JSON-LD elsewhere said the softer **"SOC 2 aligned"**. Since there's no confirmed completed audit, standardized on **"SOC 2 aligned"** everywhere — homepage badge, footer badge, and structured data (`schema.tsx`, which feeds Google/AI answers). `llms.txt` already had the correct wording.

**If you complete an actual SOC 2 Type II audit later:** search the repo for `"SOC 2 aligned"` and swap back to the harder claim — it's now a single consistent phrase everywhere.

### 5. Clientspace-specific closing CTA
**Files:** `components/Footer.tsx` (the `FinalCTA` component), `app/clientspace/page.tsx`

`/clientspace` ended on the shared, generic `FinalCTA` component, whose copy is Workspace-flavored ("Stop managing the tool... let AI handle the project management busywork") — a message-match break at the highest-leverage spot on the page (the last thing before the visitor decides).

`FinalCTA` now accepts optional `headline` / `body` / `primaryLabel` / `secondaryLabel` / `note` props, all defaulting to the **original copy unchanged** — so the other 29 pages using bare `<FinalCTA />` render identically to before (verified against `/workspace`, `/pricing`, `/about`). `/clientspace` now passes Client-Space-specific copy: *"Give every client their own portal, not another email thread,"* with "Start free trial" as the button label to match the rest of that page.

This also means any other page can get its own tailored close with a two-line prop change — no new component needed.

### 6. PromoPopup made more conversion-friendly
**File:** `components/PromoPopup.tsx`

Three changes:
- **Trigger logic rewritten.** It used to fire on a blind 6-second timer for every visitor on every page. Now it arms three ways and fires on whichever happens first: exit-intent (cursor heading for the tab bar — the highest-converting moment), 50% scroll depth (works on mobile, where exit-intent can't), or a 20-second fallback so nobody's missed. A 3-second arm delay avoids false triggers from page-load cursor jitter.
- **Removed a popup collision.** `ExitIntentModal` already runs on `/pricing` and `/demo`, but `PromoPopup` wasn't excluded from those pages — meaning a visitor there could get hit by two different competing popups in the same session. Now excluded alongside the existing `/lp/*` exclusion.
- **Tightened copy**, and added a reassurance line under the CTAs reusing the exact "30 minutes · Tailored to your firm · No commitment" wording already established on `/clientspace` and elsewhere, rather than inventing a new claim.

**Deliberately not touched:** the 15-minute countdown and the "extended trial" claim itself. Quantifying "extended trial" as a specific number of days would likely help conversion more than anything above, but that's a business commitment that needs a real number from you, not a copy decision I can make.

### 7. Cloudflare Pages deployment fix
**File:** `.npmrc` (new)

Your deployment log showed `npx @cloudflare/next-on-pages@1` failing with an `ERESOLVE` error. Root cause: Cloudflare's build image auto-installs the latest `wrangler` (currently `4.108.0`) to read `wrangler.toml`, and that version now requires `@cloudflare/workers-types@^5.x` as a peer — but `@cloudflare/next-on-pages@1.13.16` (now in maintenance mode upstream) still requires `^4.x`. Two incompatible peer requirements for the same package, in the same install, npm refuses to resolve it.

Reproduced the exact error locally first, then confirmed the fix: a one-line `.npmrc` with `legacy-peer-deps=true` at the repo root. Verified the full `next-on-pages` build completes successfully with it in place (218 prerendered routes, 4 edge function routes, correct `.vercel/output/static` output). No app code was involved — this is purely a toolchain version conflict.

Longer-term note: `@cloudflare/next-on-pages` is Cloudflare's own maintenance-mode adapter; `@opennextjs/cloudflare` (Workers + OpenNext) is the officially recommended path for new Next.js-on-Cloudflare projects as of 2026. Not urgent, but worth knowing if this class of conflict recurs.

### 8. Footer legal bar forced onto one line (desktop)
**File:** `components/Footer.tsx`

The copyright line and the legal links (Privacy, Terms, Cookie Policy, etc.) were wrapping onto two lines even on wide screens, because the content container caps at 1180px max-width regardless of browser width. Measured the actual rendered content in a headless browser (493px for the copyright text, 547px for the links row) and tightened spacing/font-size to fit both in the available 1124px. Forces onto one line at 1280px+ viewport width specifically (not the more common 1024px breakpoint) because the container hasn't reached its true max-width until then — using a lower breakpoint would have caused clipping in the 1024–1279px range. Below 1280px it still stacks gracefully, same as before.

### 9. Fixed a real gap in the desktop "Product" mega-menu's hover behavior
**File:** `components/MegaNav.tsx`

Reported as "links aren't opening." Measured the actual hover hit-box geometry in a headless browser: the trigger row's hoverable wrapper was only 38.5px tall while the header is 68px tall, leaving an ~15px strip between the "Product" button and the dropdown panel that belonged to neither element (hit-tested to a plain background div with no hover handlers). Extended the wrapper to the full header height (verified: zero gap now) and gave the close timer more tolerance (140ms → 220ms). Re-verified the full hover → move → click → navigate flow afterward.

**Caveat:** I couldn't fully reproduce "click does nothing" against the original code in my environment (tested a smooth hover path and a deliberate pause in the dead zone; both succeeded even before this fix). The gap was real and worth closing regardless, but if this doesn't fully resolve what you're seeing, the next thing to check is whether it's actually the *mobile* accordion menu (a completely different code path in `Navbar.tsx`) rather than this desktop hover panel.

### 10. Six mega-menu items didn't have their own pages
**Files:** `components/config.ts`, `components/mega-menu-data.ts`, `app/sitemap.ts`, plus 6 new page files

Turned out the real complaint wasn't a click bug — six items in the "Product" mega-menu (Risk detection, Branded client portal, Secure documents, Approvals & sign-off, Reporting, Admin & security) all redirected to either `/benefits` or `/clientspace` instead of having dedicated content. Audited the entire mega-menu (`Solutions`, `Resources`, `Compare` menus were already fine — every item there has a real page) and confirmed this was isolated to those 6 items in the `Product` menu.

Built all 6 as real pages (hero, detail sections, FAQ with schema markup, tailored closing CTA), added URL constants for each in `config.ts`, repointed the mega-menu at them, and added all 6 to `sitemap.ts`:

- `/clientspace/branded-portal`
- `/clientspace/secure-documents`
- `/clientspace/approvals`
- `/benefits/risk-detection`
- `/benefits/reporting`
- `/benefits/admin-security`

Verified in a headless browser: hovered the Product menu and read each link's actual `href` attribute post-render to confirm they point at the new pages, not the old duplicates.

**Note on the "focus more on Clientspace, less on Workspace" priority from earlier:** the three Client Space pages (branded-portal, secure-documents, approvals) support that directly. Risk detection and Reporting are honestly-labeled as Workspace features on their own pages ("Part of Workspace, from $9/seat/month") — building them out does add some surface area to Workspace, not away from it. If you'd rather scale those two back or fold them into the main Benefits page, flag it and I'll adjust.

### 11. The three "peripheral trust" issues from the conversion review, fixed
**Files:** `app/workspace/page.tsx`, `components/StickyCTABar.tsx` (new), `components/EvergreenTimer.tsx` (deleted), `components/kb-data.ts`, `public/llms.txt`, `public/llm.txt`

Three issues flagged as risks for a "diligent buyer who pokes around," now fixed:

- **`/workspace`'s fake countdown.** "Launch pricing, ending soon" advertised a discount that didn't exist anywhere on `/pricing` — the price was the same regardless of the timer. Removed both instances (hero banner and sticky bar) and replaced with an honest, still-effective alternative: the real 7-day trial and "no credit card required," both facts already established and repeated elsewhere on the site (footer FAQ, refund policy, demo page), so nothing new was invented. Built a small `StickyCTABar` component to replace `EvergreenTimer`'s sticky variant, then deleted `EvergreenTimer.tsx` entirely since nothing else used it and its whole design was the fake-deadline mechanic — didn't want it sitting around as a temptation to reuse later. **You'll need to delete `components/EvergreenTimer.tsx` from your repo manually** since a deleted file doesn't show up as something to copy in.

- **Knowledge Base placeholder text.** 20 of 21 KB articles were rendering the literal dev note "Replace this placeholder text with the real walkthrough..." Wrote real, specific content for all 20 (each 4-6 sections, grounded in features already established elsewhere on the site — dependencies, risk detection, SSO, roles, the actual integrations you offer, etc.) so nothing contradicts existing site copy. Also hardened the fallback template itself so if a 22nd article ever gets added without content, visitors see a graceful "still being written, contact support" message instead of internal dev instructions.

- **Stale `llms.txt` / `llm.txt`.** These claimed "a free tier and a 14-day Pro trial" — actual pricing has no free tier, a 7-day trial, and no "Pro" plan. Also caught two additional inaccuracies while in there: the integrations list mentioned "GitHub" and "Linear," neither of which exists in the current integrations list. Rewrote the core description to reflect the actual two-product structure (Client Space / Workspace) with correct pricing throughout, since the file's whole purpose is feeding accurate facts to AI assistants and the old version didn't mention the current product split at all.

### 12. Added a `/compare/wrike` page
**Files:** `components/config.ts`, `components/compare-data.ts`

Added Wrike to the 8-way competitor comparison set. Before writing anything, I searched for Wrike's current facts rather than relying on memory, since it's a real named competitor. Worth knowing what shaped the comparison:

- Wrike restructured pricing in January 2026 — Free/Team ($10/user)/Business ($25/user, 5-seat minimum, sold in seat bands)/Pinnacle/Apex (both custom-quote), with several premium capabilities (Integrate, Sync, Whiteboard, Datahub) sold as separate paid add-ons even at the Business tier. Used this directly as a real pricing contrast against your flat $9/$19/$24.99.
- Wrike's AI (Agents, Copilot) has genuinely expanded since January 2026 — the comparison acknowledges this fairly rather than pretending Wrike lacks AI.
- Wrike does market toward creative agencies and professional-services firms, so "PS & consulting native" is scored `partial` rather than a flat no, to stay fair.

Adding Wrike to `COMPETITORS` in `config.ts` was the only change needed to drive everything else (static page generation, the `/compare` landing page matrix, the mega-menu's Compare column, and the sitemap all pull from that one array) — verified `/compare/wrike` renders, appears on `/compare`, shows up correctly in the nav dropdown, and is in the sitemap.

### 13. Homepage trust stat + consistency pass ("500+ customers")
**Files:** `components/Hero.tsx`, `app/customers/page.tsx`, `app/investors/page.tsx`

Added "Trusted by 500+ professional-services firms" under the hero CTA. Before adding it, I flagged that this would directly contradict two other pages: `/customers` said *"PYNGYN is onboarding its first professional-services firms"* with "founding customer" framing, and `/investors` listed the stage as *"Early & focused... design partners."* Confirmed with you that 500+ is the real, current number, then updated both pages to match rather than just adding the stat to the homepage and leaving the contradiction live elsewhere:

- `/customers`: title, meta description, JSON-LD, H1, and section headings all dropped the "onboarding our first" / "founding customer" language. Renamed `FOUNDING_BENEFITS` → `CUSTOMER_BENEFITS` in the data array.
- `/investors`: Stage highlight changed from "Early & focused / design partners" to "Scaling / 500+ professional-services firms live on the platform."

**Deliberately left untouched:** the anonymized "From discovery calls" quotes (still honest, still true regardless of scale, no names or logos invented) and the `Metrics` component's ROI-calculator-derived stats (already labeled "illustrative... not customer averages" — didn't want to blend a hard number into a block explicitly flagged as hypothetical). Also didn't add a customer logo wall — that needs real company names and permission, which I don't have; say the word whenever you're ready to supply that.

### 14. Sitewide popup's fake countdown removed
**File:** `components/PromoPopup.tsx`

Same category of fix as item 11's `/workspace` countdown, applied to the popup that fires sitewide (excluded from `/lp`, `/pricing`, `/demo`). It carried a 15-minute countdown and an unquantified "extended trial plus white-glove onboarding" offer that was never confirmed as a real, honored offer. Rather than patch around it again, removed the countdown mechanic entirely — the deadline tracking, the timer display, the "Limited-time offer" badge — and replaced the copy with facts already verified elsewhere on the site: "Trusted by 500+ firms," 7-day free trial, no credit card required, cancel anytime. Trigger logic (exit-intent / scroll-depth / 20s fallback, no stacking with `ExitIntentModal`) was already sound from the earlier CRO pass and is unchanged. Verified in a headless browser: triggered the popup via the fallback timer and confirmed zero countdown digits appear anywhere in the rendered content.

---

## Known issues NOT addressed this session

These came up in an earlier full-site audit and are still live. Flagging them here so they don't get lost:

| Issue | Where |
|---|---|
| Broken image: `/kb/connect-quickbooks.png` doesn't exist (404) — the KB article text itself is now real, but this cover image is still missing | `components/kb-data.ts` / `public/kb/` |
| Roadmap vote counts are hardcoded and never change — upvotes only write to the visitor's own `localStorage`, nothing is aggregated anywhere | `app/roadmap/page.tsx`, `components/RoadmapUpvote.tsx` |
| `/status` page is fully hardcoded to "All systems operational" — no real monitoring integration | `app/status/page.tsx` |
| No rate limiting on `/api/chat`, `/api/plan`, `/api/status-report` — all three proxy a paid Groq API key with no throttling, a cost-abuse vector | `app/api/*/route.ts` |
| `/api/demo` silently drops bookings to a console log if `DEMO_WEBHOOK_URL` isn't set in production, while still telling the visitor it succeeded | `app/api/demo/route.ts` — worth confirming that env var is actually set on Cloudflare Pages |
| `components/DemoBooking.tsx` (~24KB) is dead code — never imported anywhere, the only caller of `/api/demo`'s form fields | `components/DemoBooking.tsx` |
| Stray "PYNGYN Pro" reference (a plan name that no longer exists) + the ROI calculator's default tool cost uses Client Space pricing where Workspace pricing is more relevant | `components/RoiCalculator.tsx` |
| **`/lp/professional-services` still has unaddressed placeholder content — and it's the page Google Ads traffic almost certainly lands on.** Testimonials are still explicitly marked `{/* PLACEHOLDER, replace with real written quotes when available */}` in the code. Also found during a later review: the hero says **"Limited cohort - May 2026"** — today is well past that date, so this is now a stale, visibly-expired claim, not just an unverified one. The page's own top comment says to search for "TODO: replace" before driving paid traffic to it. | `app/lp/professional-services/page.tsx` |
| 8 of 12 screenshots in `public/screens/` are unused (repo bloat, not a live bug) | `public/screens/` |
| Referral codes (`ReferralJoin.tsx`) are generated client-side via `Math.random()` with nothing registering them before they're shared — worth confirming `app.pyngyn.ai` actually credits arbitrary `?ref=` codes | `components/ReferralJoin.tsx` |
| `README.md` is stale — references a `/features` route (renamed to `/benefits`) and describes the product generically rather than the current Clientspace/Workspace split | `README.md` |
| No `X-Content-Type-Options`, `Referrer-Policy`, or `Permissions-Policy` headers | `public/_headers` |
| `/api/chat` returns raw upstream error text to the client on failure (minor info disclosure) | `app/api/chat/route.ts` |

---

## Pushing this to GitHub

This zip is your full source tree (`node_modules`, `.next`, and `next-env.d.ts` stripped out) — verified against a clean build immediately before packaging. It's cumulative: everything from the first handoff through item 14 above, all in one tree, not a diff. **Remember to also delete `components/EvergreenTimer.tsx` from your repo** (see item 11) — a deletion doesn't show up as a file to copy in. Since I don't have access to your actual repo history, overlay it onto your existing local clone rather than starting fresh:

```bash
cd path/to/your/pyngyn-repo
unzip -o pyngyn-site-v5.zip -d /tmp/pyngyn-update
cp -r /tmp/pyngyn-update/pyngyn-site-v5/. .
rm -f components/EvergreenTimer.tsx   # deleted this session, not in the zip

git status   # review the diff
git add -A
git commit -m "Cookie consent banner, GTM consent gating, Google Ads conversion event, \
integrations (Computax, Zoho Books), SOC 2 wording fix, Clientspace-specific final CTA, \
PromoPopup CRO improvements, Cloudflare Pages .npmrc fix, footer single-line layout, \
mega-menu hover-gap fix, six dedicated capability pages, workspace countdown removed, \
KB placeholder content rewritten, llms.txt corrected, Wrike comparison page, \
500+ customers stat and consistency pass, popup countdown removed"
git push
```
