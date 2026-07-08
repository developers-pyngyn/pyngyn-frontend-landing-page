import type { Metadata } from "next";
import { ContentPage } from "@/components/ContentPage";

export const metadata: Metadata = {
  title: "Support | PYNGYN",
  description: "Get help with PYNGYN.",
  alternates: { canonical: "/support" },
};

export default function SupportPage() {
  return (
    <ContentPage
      url="/support"
      metaTitle="Support | PYNGYN"
      eyebrow="Support"
      title="We're here to help."
      intro="Whether you're evaluating PYNGYN or running your whole firm on it, we're ready to help you get unstuck and get value fast."
      sections={[
        { heading: "Email support", body: "Reach us at support@pyngyn.com. Every plan includes email support; Workspace and Enterprise plans get priority response times." },
        { heading: "Book a session", body: "Prefer to talk it through? Book a working session and we'll help you set up your workspace and connect your tools." },
        { heading: "Status", body: "Checking on an incident or planned maintenance? Our status page has live updates on service health." },
        { heading: "Enterprise support", body: "Enterprise customers get a dedicated account manager, premium support, and training sessions on demand." },
      ]}
    />
  );
}
