import type { Metadata } from "next";
import { ContentPage } from "@/components/ContentPage";
import { OG_IMAGE } from "@/components/schema";

export const metadata: Metadata = {
  title: "Pyngyn Client Support | Help Desk & Assistance",
  description:
    "Contact Pyngyn customer support for assistance with your account, client portal setup, statutory calendar configuration, or billing questions. We are here to help.",
  alternates: { canonical: "/support" },
  openGraph: {
    title: "Pyngyn Client Support | Help Desk & Assistance",
    description:
      "Contact Pyngyn customer support for assistance with your account, client portal setup, statutory calendar configuration, or billing questions.",
    url: "/support",
    type: "website",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pyngyn Client Support | Help Desk & Assistance",
    description:
      "Contact Pyngyn customer support for help with client portals, statutory calendar setup, or billing.",
    images: [OG_IMAGE.url],
  },
};

const SUPPORT_FAQS = [
  {
    q: "How can I contact PYNGYN customer support?",
    a: "You can reach the PYNGYN support team directly at support@pyngyn.com. All subscription plans include email assistance, and our support team typically responds within a few business hours.",
  },
  {
    q: "How do our clients get help if they experience trouble logging in?",
    a: "Clients do not need to manage passwords. They simply request a one-click magic link sent instantly to their registered email or WhatsApp number. If an email address changes, your firm administrator can update the client contact details in seconds.",
  },
  {
    q: "Do you provide live onboarding and migration support?",
    a: "Yes. We offer complimentary hands-on onboarding sessions to help you import your client masters, set up recurring statutory workflows, and connect third-party integrations like Google Drive, Slack, and accounting software.",
  },
  {
    q: "Where can I check real-time platform uptime and scheduled maintenance?",
    a: "You can view live system health and uptime metrics on our public status page at pyngyn.ai/status, which provides 24/7 incident tracking and scheduled maintenance notices.",
  },
];

export default function SupportPage() {
  return (
    <ContentPage
      url="/support"
      metaTitle="Support | PYNGYN"
      eyebrow="Support"
      title="We're here to help."
      intro="Whether you're evaluating PYNGYN or running your whole firm on it, we're ready to help you get unstuck and get value fast."
      sections={[
        { heading: "Email support", body: "Reach us at support@pyngyn.com. Every plan includes email support; Business and Enterprise plans get priority response times." },
        { heading: "Book a session", body: "Prefer to talk it through? Book a working session and we'll help you set up your ClientSpace and connect your tools." },
        { heading: "Status", body: "Checking on an incident or planned maintenance? Our status page has live updates on service health." },
        { heading: "Enterprise support", body: "Enterprise customers get a dedicated account manager, premium support, and training sessions on demand." },
      ]}
      faqs={SUPPORT_FAQS}
      faqTitle="Frequently asked questions about support & access."
    />
  );
}
