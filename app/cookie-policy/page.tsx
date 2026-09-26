import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Cookie Policy | PYNGYN",
  description:
    "How VIMOVI GlobalTech Private Limited (Pyngyn) uses cookies, browser storage, and tracking technologies across pyngyn.ai and app.pyngyn.ai.",
  alternates: { canonical: "/cookie-policy" },
};

export default function CookiePolicyPage() {
  return (
    <LegalPage
      url="/cookie-policy"
      title="Pyngyn Cookie Policy"
      updated="September 26, 2026"
      readAlongside="Read alongside our [Privacy Policy](/privacy) and [Subprocessors](/subprocessors)."
      intro="This Cookie Policy explains how VIMOVI GlobalTech Private Limited (“Pyngyn,” “we,” “us,” or “our”) uses cookies, web beacons, local browser storage, and related tracking technologies across our marketing website at [pyngyn.ai](https://pyngyn.ai) and the ClientSpace / Workspace SaaS application at [app.pyngyn.ai](https://app.pyngyn.ai). We believe in total transparency: non-essential analytics and marketing cookies remain strictly disabled by default until you grant explicit consent through our cookie consent banner."
      sections={[
        {
          heading: "What Are Cookies and Browser Storage Technologies?",
          blocks: [
            {
              type: "p",
              text: "When you interact with our websites and applications, two primary types of client-side storage technologies may be utilized:",
            },
            {
              type: "list",
              items: [
                "**Cookies:** Small text files placed into your browser cache by a web server. Cookies enable a website to recognize your browser, maintain secure authenticated sessions, remember user preferences, and, with your permission, measure visitor traffic and advertising attribution.",
                "**Browser Local Storage (localStorage & sessionStorage):** HTML5 web storage mechanisms that allow websites to store data locally on your device without sending it over the network on every HTTP request. Data stored in your browser's local storage (such as interactive calculator inputs or your cookie consent choices) never leaves your device unless explicitly submitted through a form.",
              ],
            },
          ],
        },
        {
          heading: "Cookie Classification & Actual Implementation",
          blocks: [
            {
              type: "p",
              text: "We classify all cookies and client storage used across our platform into four transparent categories. Only strictly necessary storage is active by default; all optional analytics and marketing trackers require your affirmative consent:",
            },
            {
              type: "table",
              headers: ["Category", "What it Does", "Lifespan", "Default Status"],
              rows: [
                [
                  "Strictly Necessary",
                  "Maintains secure sessions on app.pyngyn.ai (Clerk authentication tokens), protects against Cross-Site Request Forgery (CSRF) and DDoS attacks (Cloudflare security headers), and saves your cookie preference choice (`pyngyn_cookie_consent_v1`).",
                  "Session to 1 year",
                  "Always Active (Cannot be disabled)",
                ],
                [
                  "Functional Storage",
                  "Remembers client-side UI configurations, such as sidebar expansion states, dark/light theme preferences, and roadmap feature upvotes in browser localStorage.",
                  "Persistent until cleared",
                  "Active (Local to device only)",
                ],
                [
                  "Analytics & Performance",
                  "Google Tag Manager (GTM-WB3T85N7) and Google Analytics 4 (GA4) deployed solely on the public marketing site to measure aggregate visitor counts, page performance, and referral channels. Never active inside app.pyngyn.ai.",
                  "Up to 13 months",
                  "Strictly Blocked until Consented",
                ],
                [
                  "Marketing & Conversion Tracking",
                  "Meta/Facebook Pixel (ID: 2093696051447626) deployed on the marketing website to measure campaign conversion efficiency and ad attribution. Never deployed inside app.pyngyn.ai.",
                  "Up to 90 days",
                  "Strictly Blocked until Consented",
                ],
              ],
            },
          ],
        },
        {
          heading: "Third-Party Technologies Operating on Our Sites",
          blocks: [
            {
              type: "p",
              text: "Here is how specific third-party integrations interact with browser cookies across our domains:",
            },
            {
              type: "list",
              items: [
                "**Google Analytics 4 & Google Tag Manager (GTM):** Loaded on pyngyn.ai solely after you click “Accept all” or enable Analytics in the preference center. If you click “Reject all” or navigate without consenting, GTM and GA4 scripts are completely uninitialized and zero analytics cookies are written to your device.",
                "**Meta Platforms (Meta Pixel):** Gated strictly behind Marketing consent on pyngyn.ai. Used solely to attribute ad campaigns. It is never installed or executed within the authenticated ClientSpace or Workspace SaaS product.",
                "**Clerk (Authentication):** Used on app.pyngyn.ai to manage secure sign-ins, Multi-Factor Authentication (MFA), and session persistence. These cookies are strictly necessary for the authenticated platform to operate.",
                "**Calendly (Demo Booking on /demo):** When scheduling a consultation on our /demo page, Calendly embeds its scheduling widget, which sets cookies necessary to remember selected time slots and prevent double bookings. Submissions go directly to Calendly.",
                "**Anthropic & Groq (AI Features):** Interactions with our AI features transmit text prompts over encrypted TLS to Anthropic (for app.pyngyn.ai) and Groq (for marketing tools). Neither provider uses these API calls to set advertising cookies or track visitors across the web.",
                "**Google Fonts:** Web font stylesheets fetched from Google's edge CDN may share your device's IP address with Google as part of standard HTTP asset delivery.",
              ],
            },
          ],
        },
        {
          heading: "Managing Your Cookie Preferences & Withdrawing Consent",
          blocks: [
            {
              type: "p",
              text: "In accordance with Section 6 of India's DPDP Act, 2023 and the GDPR, you have the right to withdraw previously granted consent at any time, with the same ease with which consent was provided. You can manage your preferences through the following mechanisms:",
            },
            {
              type: "list",
              items: [
                "**On-Site Cookie Preference Modal:** You can reopen our cookie preference center at any time by clicking the **“Cookie preferences”** link permanently situated in our website footer. From there, you can view your current choices, toggle Analytics or Marketing on/off, or click “Reject all” to revoke consent immediately.",
                "**Immediate Effect:** When you reject or withdraw consent, the preference is saved immediately to your browser and an event is dispatched to halt non-essential tracking for the remainder of your visit.",
                "**Browser Settings:** You can configure your browser to block, reject, or alert you to cookies. Please note that if you configure your browser to block strictly necessary cookies, you will not be able to log in to app.pyngyn.ai or access your ClientSpace workspace.",
              ],
            },
            {
              type: "p",
              text: "To clear cookies already stored in your browser, refer to the official guides for your browser:",
            },
            {
              type: "list",
              items: [
                "[Google Chrome](https://support.google.com/chrome/answer/95647)",
                "[Mozilla Firefox](https://support.mozilla.org/en-US/kb/clear-cookies-and-site-data-firefox)",
                "[Apple Safari](https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac)",
                "[Microsoft Edge](https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09)",
              ],
            },
          ],
        },
        {
          heading: "Policy Updates & Contact Information",
          blocks: [
            {
              type: "p",
              text: "We review this Cookie Policy periodically to ensure alignment with technological updates and regulatory guidance from the Data Protection Board of India. The “Last updated” date at the top of this document will always reflect the date of latest deployment.",
            },
            {
              type: "contact",
              heading: "Privacy Team — Cookie Inquiries",
              lines: [
                "Entity: VIMOVI GlobalTech Private Limited (Pyngyn)",
                "Email: **[vivek.pandey@pyngyn.com](mailto:vivek.pandey@pyngyn.com)**",
                "Website: **[pyngyn.ai](https://pyngyn.ai)**",
                "Location: Bengaluru, Karnataka, India",
              ],
            },
          ],
        },
      ]}
    />
  );
}
