import type { Metadata } from "next";
import { ContentPage } from "@/components/ContentPage";

export const metadata: Metadata = {
  title: "Brand | PYNGYN",
  description: "PYNGYN brand assets, logo usage, and guidelines.",
  alternates: { canonical: "/brand" },
};

export default function BrandPage() {
  return (
    <ContentPage
      url="/brand"
      metaTitle="Brand | PYNGYN"
      eyebrow="Brand"
      title="Our brand."
      intro="Guidelines and assets for referring to PYNGYN in press, partnerships, and integrations. Please follow these so the brand stays consistent wherever it appears."
      sections={[
        { heading: "Name", body: "Always written as PYNGYN. Don't abbreviate, hyphenate, or alter the spelling. Our mascot is Pyng, the aviator penguin." },
        { heading: "Logo", body: "Use the official logo with clear space around it, and don't recolor, stretch, or add effects. Reach out for the asset pack in SVG and PNG." },
        { heading: "Color", body: "Our primary brand color is indigo. Use it for accents and emphasis; keep large surfaces neutral so the indigo stays distinctive." },
        { heading: "Requests", body: "Need assets or have a usage question? Contact brand@pyngyn.com and we'll get you what you need." },
      ]}
    />
  );
}
