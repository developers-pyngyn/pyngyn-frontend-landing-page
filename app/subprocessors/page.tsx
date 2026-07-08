import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Subprocessors | PYNGYN",
  description: "The subprocessors Pyngyn uses to provide the marketing site, free tools, and app.pyngyn.ai.",
  alternates: { canonical: "/subprocessors" },
};

export default function SubprocessorsPage() {
  return (
    <LegalPage
      url="/subprocessors"
      title="Subprocessors"
      updated="June 24, 2026"
      readAlongside="Read alongside our [Privacy Policy](/privacy) and [Data Processing Agreement](/dpa)."
      intro="This page lists the subprocessors we use to provide the Pyngyn marketing site, free tools, and the app.pyngyn.ai product. We review this list periodically and update it when our processing partners change."
      sections={[
        {
          heading: "Infrastructure Subprocessors",
          blocks: [
            {
              type: "table",
              headers: ["Sub-processor", "Purpose of processing", "Location(s)", "More information"],
              rows: [
                [
                  "Google Cloud Platform",
                  "Infrastructure & cloud hosting (asia-south1 region) for app.pyngyn.ai, including database and compute services.",
                  "India",
                  "[cloud.google.com/security/compliance](https://cloud.google.com/security/compliance)",
                ],
              ],
            },
          ],
        },
        {
          heading: "Platform Subprocessors",
          blocks: [
            {
              type: "table",
              headers: ["Sub-processor", "Purpose of processing", "Location(s)", "More information"],
              rows: [
                [
                  "Google Tag Manager",
                  "Tag and script management on the marketing site (loads other analytics/marketing tags below).",
                  "USA",
                  "[policies.google.com/privacy](https://policies.google.com/privacy)",
                ],
                [
                  "Google Analytics (GA4)",
                  "Marketing site analytics, page views, timestamps, referrer paths, and session behavior.",
                  "USA",
                  "[policies.google.com/privacy](https://policies.google.com/privacy)",
                ],
                [
                  "Meta Platforms (Meta Pixel)",
                  "Marketing campaign measurement and conversion tracking on the marketing site.",
                  "USA",
                  "[facebook.com/privacy/policy](https://www.facebook.com/privacy/policy/)",
                ],
                [
                  "Google Fonts",
                  "Web font delivery for site typography; loading a font shares the visitor's IP address with Google.",
                  "USA",
                  "[policies.google.com/privacy](https://policies.google.com/privacy)",
                ],
                [
                  "Microsoft Entra ID",
                  "Identity and access management for internal team accounts and Organization-level SSO.",
                  "USA, EU",
                  "[microsoft.com/trust-center/privacy](https://www.microsoft.com/en-us/trust-center/privacy)",
                ],
                [
                  "Clerk",
                  "User authentication, account creation, session management, SSO, and passwordless login for app.pyngyn.ai.",
                  "USA",
                  "[clerk.com/legal/privacy](https://clerk.com/legal/privacy)",
                ],
              ],
            },
          ],
        },
        {
          heading: "LLM / Gen AI Capabilities Subprocessors",
          blocks: [
            {
              type: "table",
              headers: ["Sub-processor", "Purpose of processing", "Location(s)", "More information"],
              rows: [
                [
                  "Anthropic",
                  "Provides AI functionality across the Pyngyn platform, including automatic task generation, customer support assistance, organizational health summaries, task assignment recommendations, project insights, workflow recommendations, and other AI-powered features available within app.pyngyn.ai.",
                  "USA",
                  "[anthropic.com/legal/privacy](https://www.anthropic.com/legal/privacy)",
                ],
              ],
            },
          ],
        },
        {
          heading: "Customer Support & Scheduling Subprocessors",
          blocks: [
            {
              type: "table",
              headers: ["Sub-processor", "Purpose of processing", "Location(s)", "More information"],
              rows: [
                [
                  "Calendly",
                  "Demo scheduling via the /demo page, collects name, email, and meeting details directly into the Calendly account.",
                  "USA",
                  "[calendly.com/privacy](https://calendly.com/privacy)",
                ],
              ],
            },
          ],
        },
        {
          heading: "Payments Subprocessors",
          blocks: [
            {
              type: "table",
              headers: ["Sub-processor", "Purpose of processing", "Location(s)", "More information"],
              rows: [
                [
                  "Razorpay",
                  "Payment processing for paid subscriptions and invoicing.",
                  "India",
                  "[razorpay.com/privacy](https://razorpay.com/privacy/)",
                ],
              ],
            },
          ],
        },
        {
          heading: "What we don't send anywhere",
          blocks: [
            {
              type: "p",
              text: "Several interactions on our marketing site never reach a subprocessor or our own servers at all:",
            },
            {
              type: "list",
              items: [
                "**Browser-only storage.** The promo popup timer, workspace offer countdown, and roadmap upvotes are stored using your browser's in-memory state or **localStorage** only. None of this is transmitted to Pyngyn or to any subprocessor.",
                "**Calculator tools.** Inputs to our ROI, cost-margin, and team-utilization calculators stay in your browser unless you choose to copy or share the results, there is no backend collection for these tools in our current implementation.",
              ],
            },
          ],
        },
      ]}
    />
  );
}
