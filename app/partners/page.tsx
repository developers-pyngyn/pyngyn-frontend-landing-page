import type { Metadata } from "next";
import { ContentPage } from "@/components/ContentPage";

export const metadata: Metadata = {
  title: "Partners | PYNGYN",
  description: "Partner with PYNGYN: agencies, consultants, and technology partners.",
  alternates: { canonical: "/partners" },
};

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
    />
  );
}
