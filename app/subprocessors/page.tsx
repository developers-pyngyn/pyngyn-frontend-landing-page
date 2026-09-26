import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Subprocessors | PYNGYN",
  description:
    "The verified third-party subprocessors used by VIMOVI GlobalTech Private Limited to provide the Pyngyn website, tools, and ClientSpace application.",
  alternates: { canonical: "/subprocessors" },
};

export default function SubprocessorsPage() {
  return (
    <LegalPage
      url="/subprocessors"
      title="Pyngyn Subprocessors"
      updated="September 26, 2026"
      readAlongside="Read alongside our [Privacy Policy](/privacy) and [Data Processing Agreement](/dpa)."
      intro="This page provides a transparent and verified list of third-party subprocessors engaged by VIMOVI GlobalTech Private Limited (“Pyngyn”) to provide cloud hosting, authentication, payment processing, AI capabilities, and edge security across our marketing website at pyngyn.ai and the ClientSpace / Workspace SaaS application at app.pyngyn.ai. Every subprocessor is bound by rigorous data protection, security, and confidentiality agreements consistent with India's DPDP Act, 2023 and the GDPR."
      sections={[
        {
          heading: "Cloud Infrastructure & Edge Hosting",
          blocks: [
            {
              type: "table",
              headers: ["Subprocessor", "Service & Purpose", "Processing Location", "Compliance & Privacy"],
              rows: [
                [
                  "Google Cloud Platform (GCP)",
                  "Primary cloud infrastructure, multi-tenant PostgreSQL database hosting, object storage, and encrypted snapshot backups for app.pyngyn.ai.",
                  "India (asia-south1, Mumbai region)",
                  "[cloud.google.com/security/compliance](https://cloud.google.com/security/compliance)",
                ],
                [
                  "Cloudflare, Inc.",
                  "Edge DNS routing, global Content Delivery Network (CDN), Web Application Firewall (WAF), automated DDoS mitigation, and edge runtime compute for pyngyn.ai.",
                  "USA & Global Edge Network",
                  "[cloudflare.com/privacypolicy](https://www.cloudflare.com/privacypolicy/)",
                ],
              ],
            },
          ],
        },
        {
          heading: "Identity, Authentication & Team Access",
          blocks: [
            {
              type: "table",
              headers: ["Subprocessor", "Service & Purpose", "Processing Location", "Compliance & Privacy"],
              rows: [
                [
                  "Clerk, Inc.",
                  "User identity management, self-serve registration, Single Sign-On (SSO), multi-factor authentication (MFA), session tokens, and passwordless authentication for app.pyngyn.ai.",
                  "USA",
                  "[clerk.com/legal/privacy](https://clerk.com/legal/privacy)",
                ],
                [
                  "Microsoft Corporation",
                  "Microsoft Entra ID identity and access management for internal Pyngyn administration and enterprise SAML SSO federation.",
                  "USA & EU",
                  "[microsoft.com/trust-center/privacy](https://www.microsoft.com/en-us/trust-center/privacy)",
                ],
              ],
            },
          ],
        },
        {
          heading: "Artificial Intelligence (AI) Engines",
          blocks: [
            {
              type: "table",
              headers: ["Subprocessor", "Service & Purpose", "Processing Location", "Compliance & Privacy"],
              rows: [
                [
                  "Anthropic, PBC",
                  "Generative AI model provider powering ClientSpace and Workspace features within app.pyngyn.ai (automatic project breakdown, weekly client status summaries, and deliverable recommendations). Processes inputs transiently; no customer data used for base model training.",
                  "USA",
                  "[anthropic.com/legal/privacy](https://www.anthropic.com/legal/privacy)",
                ],
                [
                  "Groq Inc.",
                  "High-speed LPU inference engine powering the free public interactive tools on pyngyn.ai (/tools/ai-project-plan, /tools/status-report, and /api/chat). Ephemeral prompt processing; no model training.",
                  "USA",
                  "[groq.com/privacy-policy](https://groq.com/privacy-policy/)",
                ],
              ],
            },
          ],
        },
        {
          heading: "Payment Processing & Billing",
          blocks: [
            {
              type: "table",
              headers: ["Subprocessor", "Service & Purpose", "Processing Location", "Compliance & Privacy"],
              rows: [
                [
                  "Razorpay Software Pvt. Ltd.",
                  "PCI-DSS Level 1 compliant payment gateway handling subscription recurring billing, credit/debit card tokenization, UPI transactions, net banking, and automated GST tax invoicing.",
                  "India",
                  "[razorpay.com/privacy](https://razorpay.com/privacy/)",
                ],
              ],
            },
          ],
        },
        {
          heading: "Sales Scheduling & Communications",
          blocks: [
            {
              type: "table",
              headers: ["Subprocessor", "Service & Purpose", "Processing Location", "Compliance & Privacy"],
              rows: [
                [
                  "Calendly LLC",
                  "Demo scheduling widget on /demo allowing prospective firms to select consultation time slots. Collects name, work email, phone (optional), and meeting topics directly into Calendly.",
                  "USA",
                  "[calendly.com/privacy](https://calendly.com/privacy)",
                ],
              ],
            },
          ],
        },
        {
          heading: "Analytics & Campaign Attribution (Consent-Gated)",
          blocks: [
            {
              type: "table",
              headers: ["Subprocessor", "Service & Purpose", "Processing Location", "Compliance & Privacy"],
              rows: [
                [
                  "Google LLC",
                  "Google Tag Manager and Google Analytics 4 (GA4) deployed on the marketing website to measure traffic volume and page performance. Strictly blocked until visitor consents. Also delivers Google Fonts.",
                  "USA",
                  "[policies.google.com/privacy](https://policies.google.com/privacy)",
                ],
                [
                  "Meta Platforms, Inc.",
                  "Meta/Facebook Pixel deployed on the public marketing site to measure advertising conversion attribution. Strictly blocked until visitor consents. Never active inside app.pyngyn.ai.",
                  "USA",
                  "[facebook.com/privacy/policy](https://www.facebook.com/privacy/policy/)",
                ],
              ],
            },
          ],
        },
        {
          heading: "Local Browser Storage (Data Not Sent to Servers)",
          blocks: [
            {
              type: "p",
              text: "Several interactive features across our marketing site operate entirely client-side without transmitting inputs to our servers or to any subprocessor:",
            },
            {
              type: "list",
              items: [
                "**Browser LocalStorage:** Cookie consent choices (`pyngyn_cookie_consent_v1`), promotional banner dismissals, and roadmap feature upvotes are stored locally in your browser and never leave your device.",
                "**Financial & Margin Calculators:** Inputs to our ROI Calculator, Cost Margin Estimator, Team Utilization Calculator, and Any Update Cost Calculator are evaluated locally using JavaScript in your browser memory and are not logged or stored on our servers.",
              ],
            },
          ],
        },
        {
          heading: "Subprocessor Change Notification Process",
          blocks: [
            {
              type: "p",
              text: "Pyngyn reviews its subprocessor network regularly to maintain high standards of security, availability, and privacy. Before engaging any new subprocessor that will process Customer Personal Data, Pyngyn will update this page and provide notice to subscribed account administrators in accordance with our [Data Processing Agreement](/dpa).",
            },
          ],
        },
      ]}
    />
  );
}
