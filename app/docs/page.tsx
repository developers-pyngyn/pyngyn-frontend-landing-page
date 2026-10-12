import type { Metadata } from "next";
import { ContentPage } from "@/components/ContentPage";
import { OG_IMAGE } from "@/components/schema";

export const metadata: Metadata = {
  title: "Pyngyn Product Documentation & Developer Reference",
  description:
    "Comprehensive documentation for Pyngyn ClientSpace: API integrations, webhook triggers, security architecture, and automated workflow configuration.",
  alternates: { canonical: "/docs" },
  openGraph: {
    title: "Pyngyn Product Documentation & Developer Reference",
    description:
      "Comprehensive documentation for Pyngyn ClientSpace: API integrations, webhook triggers, security architecture, and automated workflow configuration.",
    url: "/docs",
    type: "website",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pyngyn Product Documentation & Developer Reference",
    description:
      "Comprehensive documentation for Pyngyn ClientSpace: API integrations, webhook triggers, and automated workflows.",
    images: [OG_IMAGE.url],
  },
};

export default function DocsPage() {
  return (
    <ContentPage
      url="/docs"
      metaTitle="Documentation | PYNGYN"
      eyebrow="Docs"
      title="Documentation."
      intro="Everything you need to set up PYNGYN, connect your tools, and get your team running. Full reference docs are on the way; in the meantime, book a demo and we'll walk you through your setup."
      sections={[
        { heading: "Getting started", body: "Create your workspace, describe your first project in plain language, and watch PYNGYN draft the plan. Then invite your team and start delivering client work." },
        { heading: "Core concepts", body: "Understand how PYNGYN turns goals into tasks, owners, and timelines, and how it keeps status current from the work itself." },
        { heading: "AI planning", body: "Learn how the AI drafts plans and flags risk, and how to steer it. Every plan is fully editable; the AI assists, you decide." },
        { heading: "Admin & security", body: "Set up SSO, roles, and permissions, and review how PYNGYN handles and protects your data." },
      ]}
    />
  );
}
