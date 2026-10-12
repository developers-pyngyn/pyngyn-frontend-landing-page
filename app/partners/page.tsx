import type { Metadata } from "next";
import { ContentPage } from "@/components/ContentPage";

export const metadata: Metadata = {
  title: "Partners | PYNGYN",
  description: "Partner with PYNGYN: agencies, consultants, and technology partners.",
  alternates: { canonical: "/partners" },
};

const PARTNER_FAQS = [
  {
    q: "Who is eligible for the PYNGYN Partner Program?",
    a: "Our partner program is open to practice management consultants, CA technology advisors, digital agencies, and software developers who advise or build solutions for accounting and professional-services firms.",
  },
  {
    q: "How does the referral commission and revenue share work?",
    a: "Affiliate and Solution partners receive recurring commissions for every firm they introduce to PYNGYN, with transparent dashboard tracking and monthly payouts.",
  },
  {
    q: "What enablement and training resources do Solution Partners receive?",
    a: "Solution partners receive full sandbox environments, dedicated partner manager access, co-marketing collateral, and technical training on client onboarding and workflow design.",
  },
  {
    q: "How can technology developers integrate with PYNGYN?",
    a: "Technology partners can access our REST APIs, webhook infrastructure, and developer documentation to build native connectors or bidirectional practice syncs.",
  },
];

export default function PartnersPage() {
  return (
    <ContentPage
      url="/partners"
      metaTitle="Partners | PYNGYN"
      eyebrow="Partners"
      title="Grow with PYNGYN."
      intro="We work with agencies, consultants, and technology partners who help teams run better projects. If that's you, let's talk."
      sections={[
        { heading: "Solution partners", body: "Agencies and consultants who implement PYNGYN for clients. Get enablement, referral rewards, and a direct line to our team." },
        { heading: "Technology partners", body: "Build an integration with PYNGYN and reach teams who want their tools to work together. We'll support the build and the launch." },
        { heading: "Affiliates", body: "Recommend PYNGYN to your audience and earn for every firm you bring on. Simple terms, transparent tracking." },
        { heading: "Become a partner", body: "Tell us about your business and how you'd like to work together. Email partners@pyngyn.com to get started." },
      ]}
      faqs={PARTNER_FAQS}
      faqTitle="Frequently asked questions about our partner program."
    />
  );
}
