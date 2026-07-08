import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Cookie Policy | PYNGYN",
  description: "How Pyngyn uses cookies, web beacons, browser storage, and similar technologies.",
  alternates: { canonical: "/cookie-policy" },
};

export default function CookiePolicyPage() {
  return (
    <LegalPage
      url="/cookie-policy"
      title="Cookie Policy"
      updated="June 24, 2026"
      readAlongside="Read alongside our [Privacy Policy](/privacy)."
      intro="Hi, we're Pyngyn. You're probably here because you're interested to know more about how we use cookies, web beacons, browser storage, and other similar technologies. As part of our commitment to upholding a high standard of transparency in our [Privacy Policy](/privacy), we've created this guide to explain the tracking technologies we use across our marketing site at [pyngyn.ai](https://pyngyn.ai) and our product application at [app.pyngyn.ai](https://app.pyngyn.ai)."
      sections={[
        {
          heading: "What are cookies, web beacons, and similar technologies?",
          blocks: [
            { type: "p", text: "Typically, there are two types of tracking technologies we might use on our sites:" },
            {
              type: "list",
              items: [
                "**Cookies:** these aren't the type you eat. They're actually a small data file sent from a server to your web browser or mobile device, then stored in your browser cache or device memory. There are ways you can control your cookie preferences and set whether you want to accept or reject cookies (see what your options are below).",
                "**Browser storage:** some of the data we describe in this policy isn't a traditional cookie at all, it's stored using your browser's **localStorage** or held only in page memory. This data never leaves your browser and is never transmitted to our servers.",
              ],
            },
          ],
        },
        {
          heading: "What do we do with these technologies?",
          blocks: [
            { type: "p", text: "We use these tracking technologies for a few general purposes:" },
            {
              type: "list",
              items: [
                "To allow our sites and product application to function correctly, including keeping you securely logged in to your workspace.",
                "To understand how our marketing site is performing and to inform improvements to our content and user experience.",
                "To enhance your experience on our sites and provide functionality, for example, so you don't have to reset your interface preferences each time you visit.",
                "To gather relevant, aggregated data that helps us measure marketing performance and the content that's relevant to your interests.",
              ],
            },
            {
              type: "p",
              text: "We sometimes partner with trusted third-party services that use their own tracking technologies to provide certain features on our site, such as analytics, on-site messaging, or scheduling. These third-party services may use cookies to anonymously collect data and allow them to recognize your computer or mobile device each time you visit any of our sites. No personally identifiable information is collected by these cookies for our own use, and the anonymous data they collect is kept separate from any personal information about you that we collect directly.",
            },
          ],
        },
        {
          heading: "The categories of cookies we use",
          blocks: [
            {
              type: "p",
              text: "Here's a breakdown of how we classify the cookies, scripts, and local storage mechanisms across our sites:",
            },
            {
              type: "table",
              headers: ["Category", "What it does", "Lifespan"],
              rows: [
                [
                  "Strictly Necessary",
                  "Keeps you logged in to app.pyngyn.ai, protects against CSRF and DDoS, and runs core UI features on the marketing site (promo timers, offer countdowns, roadmap votes). Always active, cannot be disabled.",
                  "Session-based or short-lived",
                ],
                [
                  "Functional",
                  "Remembers your dashboard preferences, dark mode, sidebar state, default workspace view, and language selection.",
                  "Persistent, until cleared",
                ],
                [
                  "Analytics & Performance",
                  "Google Tag Manager and Google Analytics (GA4) on our marketing site, page views, load times, error rates, and referral paths. Aggregated and anonymized; blocked until you consent.",
                  "Up to 1 year",
                ],
                [
                  "Marketing & Targeting",
                  "Meta/Facebook Pixel, deployed via GTM on the marketing site only, to measure campaign performance and conversions. Never used inside app.pyngyn.ai. Disabled until you consent.",
                  "Varies by provider",
                ],
              ],
            },
          ],
        },
        {
          heading: "Third-party integrations on our sites",
          blocks: [
            { type: "p", text: "**Calendly (Demo bookings)**" },
            {
              type: "p",
              text: "When you visit our **/demo** scheduling page to book time with our team, Calendly powers the booking experience. Calendly may set its own cookies to secure the booking form, prevent duplicate submissions, and remember your selected time slot. Information you submit there (such as your name, email, and meeting time) goes directly to our Calendly account and does not pass through Pyngyn's application database. Calendly's use of cookies is governed by its own privacy policy.",
            },
            { type: "p", text: "**Anthropic (AI-powered features)**" },
            {
              type: "p",
              text: "AI-powered features within app.pyngyn.ai (including task generation, support assistance, organizational reporting, workload recommendations, and project insights) send the information you submit to Anthropic, our AI processing partner, to generate outputs. This processing happens transiently; per our current implementation, these submissions are not stored in our own database. Anthropic does not use this exchange to set persistent advertising cookies or trackers on your device.",
            },
            { type: "p", text: "**Google Tag Manager, Google Analytics & Meta Pixel**" },
            {
              type: "p",
              text: "These are loaded only on our public marketing site, and only after you consent through our cookie banner. They are never active inside the authenticated app.pyngyn.ai product.",
            },
            { type: "p", text: "**Google Fonts**" },
            {
              type: "p",
              text: "Our sites may load typefaces from Google Fonts. Loading a font can share your IP address with Google as part of that request, in the same way it would for any resource fetched from a third-party server.",
            },
          ],
        },
        {
          heading: "Your options when it comes to cookies, web beacons, and similar technologies",
          blocks: [
            {
              type: "p",
              text: "You can change your web browser's settings to reflect your cookie preferences. Use these links to find out more information about cookie settings for common browsers:",
            },
            {
              type: "list",
              items: [
                "[Chrome](https://support.google.com/chrome/answer/95647)",
                "[Firefox](https://support.mozilla.org/en-US/kb/clear-cookies-and-site-data-firefox)",
                "[Safari](https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac)",
                "[Microsoft Edge](https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09)",
              ],
            },
            {
              type: "p",
              text: "When you first visit our marketing website, you'll see a cookie banner letting you accept all tracking technologies, reject all non-essential analytics and marketing tags, or customize your preferences in detail. If you click \"Reject All\", or simply close the banner without acting, Google Analytics and the Meta Pixel will remain completely uninitialized.",
            },
            {
              type: "p",
              text: "**Please keep in mind:** if you disable Strictly Necessary cookies through your browser settings, you won't be able to log in to app.pyngyn.ai or maintain a workspace session, and some marketing site features may not work or operate correctly.",
            },
          ],
        },
        {
          heading: "Updates to this policy",
          blocks: [
            {
              type: "p",
              text: "We may update this Cookie Policy periodically to reflect changes in our technology, hosting infrastructure, partner integrations, or applicable privacy regulations. The effective date at the top of this document will always reflect our most recent update.",
            },
          ],
        },
        {
          heading: "Contact us",
          blocks: [
            {
              type: "p",
              text: "If you have any questions about our use of cookies, browser storage, or this policy, please contact our privacy team at **[vivek.pandey@pyngyn.com](mailto:vivek.pandey@pyngyn.com)**, or write to us at:",
            },
            {
              type: "contact",
              heading: "Vimovi Global Tech, Privacy & Compliance Team",
              lines: ["Email: **[vivek.pandey@pyngyn.com](mailto:vivek.pandey@pyngyn.com)**", "Website: **[pyngyn.ai](https://pyngyn.ai)**"],
            },
          ],
        },
      ]}
    />
  );
}
