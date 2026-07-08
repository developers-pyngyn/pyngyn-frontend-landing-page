# PYNGYN Landing Page

A high-converting, demo-led marketing landing page for **PYNGYN**, the AI project
manager for teams that ship. Built with **Next.js 14 (App Router)**, **TypeScript**,
**Tailwind CSS**, and **Framer Motion**.

The page implements the PYNGYN Landing Page PRD: a white-first, premium aesthetic with
an editorial serif/sans pairing, a demo-first call to action, and a single narrative
scroll (hero → social proof → problem → benefits → how it works → testimonials →
metrics → comparison → integrations → security → FAQ → final CTA → footer).

## Quick start

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Build & deploy (Cloudflare Pages)

This project deploys to Cloudflare Pages via the **@cloudflare/next-on-pages**
adapter, which builds a normal Next.js app and runs the chat API as an edge
function. (The marketing/blog pages are still pre-rendered as static HTML.)

In the Cloudflare Pages dashboard, set:
- **Build command:** `npx @cloudflare/next-on-pages@1`
- **Build output directory:** `.vercel/output/static`
- **Environment variables:** add `GROQ_API_KEY` (Secret) for the chatbot
- A compatibility flag is required for the edge runtime: in
  **Settings → Functions → Compatibility flags**, add `nodejs_compat`.

> Do **not** set `output: "export"` in `next.config.js`; static export disables
> API routes, which the chatbot needs. (This was the cause of the earlier build
> failure.)

> **Note:** the build requires internet access to fetch dependencies and the
> Google fonts.

### Security headers

Custom response headers live in `public/_headers`, which Cloudflare Pages serves
from the build output root and applies to every response (static pages and the
`/api/chat` edge function). It currently sets **Strict-Transport-Security**
(`max-age=31536000; includeSubDomains`) and **clickjacking protection** via
`X-Frame-Options: SAMEORIGIN` plus `Content-Security-Policy: frame-ancestors
'self'`. See the comments in that file before changing values or adding headers.

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start the dev server with hot reload |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run Next.js ESLint |

## Project structure

```
app/
  layout.tsx              Root layout, fonts, metadata/SEO
  page.tsx                Home (full marketing scroll)
  globals.css             Tailwind layers + tokens + a11y + reduced-motion
  features/page.tsx       /features
  pricing/page.tsx        /pricing
  customers/page.tsx      /customers
  blog/page.tsx           /blog index
  blog/[slug]/page.tsx    /blog/<slug> (statically generated)
components/
  config.ts               All URLs (sign in, signup, demo, page routes)
  Navbar.tsx              Sticky nav + mobile menu; nav links go to real pages
  Hero.tsx                Hero with reduced-motion-aware parallax + mockup
  Sections.tsx            Reusable sections (Benefits, Pricing, Testimonials, ...)
  Footer.tsx              FAQ accordion, final CTA, footer
  posts.ts                Blog post content + helpers
  Reveal.tsx              Shared scroll-reveal animation wrapper
```

## Pages & URLs

| URL | What it is |
|---|---|
| `/` | Marketing landing page (full scroll) |
| `/benefits` | Benefits: how-it-works, comparison, integrations (was `/features`) |
| `/pricing` | Pricing tiers, comparison, security, FAQ |
| `/customers` | Logos, testimonials, outcome metrics |
| `/blog`, `/blog/<slug>` | Blog index + posts |
| `/about` | Mission, story, values |
| `/careers` | Open roles + how to apply |
| `/privacy` | Privacy Policy |
| `/terms` | Terms of Service |
| `/refund` | Refund Policy |

External links (configured in `components/config.ts`):
- **Sign in** -> `https://app.pyngyn.ai/`
- **Start free** -> `https://app.pyngyn.ai/?signup=true`
- **Book a demo** -> `https://pyngyn.ai/demo`

The nav links (Features, Pricing, Customers, Blog) each go to their own real
page -- no more in-page scrolling. To repoint anything, edit the one-liners in
`components/config.ts`.
## Design tokens

| Token | Value | Use |
|---|---|---|
| Canvas | `#ffffff` | Page background |
| Ink | `#16161a` | Headlines / body |
| Muted | `#6b7280` | Secondary text |
| Accent | `#4f46e5` | Primary CTA, links, accents |
| Accent dark | `#3730a3` | Hover / emphasis |
| Accent light | `#eef0ff` | Subtle fills, callouts |

## Customizing

- **Swap copy:** all text lives directly in the component files as plain arrays/strings.
- **Change motion intensity:** edit `components/Reveal.tsx` (duration/offset) and the
  hero parallax range in `components/Hero.tsx` (`useTransform(... [0, 80])`).
- **Fonts:** change the `next/font/google` imports in `app/layout.tsx`.
- **Primary CTA:** the page is demo-led. To make trial signup primary, swap the
  `btn-primary` / `btn-ghost` classes on the CTA links in `Navbar.tsx`, `Hero.tsx`,
  and the final CTA in `Footer.tsx`.

## Before launch (from the PRD)

- Replace placeholder customer logos with cleared, real logos.
- Replace example testimonials with real, permissioned quotes.
- Replace illustrative metrics and pricing with audited/final figures.
- Confirm security certifications shown are actually held.
- Set `SIGNUP_URL` and `PRICING_URL` in `components/site.tsx`.
- Wire the demo form in `components/DemoModal.tsx` to your scheduler/CRM endpoint
  (look for the `// TODO: POST` comment).
- Add real product screenshots / a demo loop in the hero.

## What was fixed in this revision

- Added an accessible mobile navigation menu (hamburger + animated drawer).
- Built the missing Pricing section and fixed the broken `#pricing` nav anchor.
- "Book a demo" now opens a focus-trapped booking modal everywhere.
- Replaced bare `href="#"` links with real anchors / configurable URLs.
- Accessibility: `aria-hidden` on decorative icons, accessible comparison table
  (caption + `scope`), visible focus rings, and a "Skip to content" link.
- Parallax and reveal animations now respect `prefers-reduced-motion`.
- Guarded against horizontal overflow from the hero glow.

## Chatbot (Pyng): Groq-powered

A floating chat widget with the PYNGYN penguin mascot, mounted globally via
`app/layout.tsx` (so it appears on every page).

**How it connects (production-safe):**
- The widget (`components/ChatWidget.tsx`) calls `POST /api/chat` on your own site.
- That route is a Next.js **edge route handler** at `app/api/chat/route.ts`, which
  proxies to Groq with your secret key. The key never reaches the browser.

**Setup:**
1. Get a free key at https://console.groq.com/keys
2. In the Cloudflare Pages dashboard → your project → **Settings → Environment
   variables**, add:
   - `GROQ_API_KEY` = your key (mark as a Secret)
   - *(optional)* `GROQ_MODEL` = e.g. `llama-3.3-70b-versatile` (the default)
3. Redeploy. The widget calls `/api/chat` on your own domain automatically.

**Customizing Pyng:**
- Edit the `SYSTEM_PROMPT` in `app/api/chat/route.ts` to change its personality
  or knowledge.
- Swap the mascot images in `public/` (`mascot-avatar.png` is the launcher/header).
- Model + temperature live in `app/api/chat/route.ts`.

**Standalone tester:** `pyng_chatbot_standalone.html` (separate file) is a single
HTML page you can open locally, paste a Groq key, and chat immediately. It calls
Groq directly from the browser, fine for testing, NOT for production (the key is
visible). Use the edge route handler for the live site.

**Note on hosting:** Deployed with `@cloudflare/next-on-pages`, the static pages and
the `/api/chat` edge function run together in one Cloudflare Pages deployment. Remember
to add the `nodejs_compat` compatibility flag and the `GROQ_API_KEY` env var.
