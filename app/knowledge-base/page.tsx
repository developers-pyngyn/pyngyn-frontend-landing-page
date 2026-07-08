import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { FinalCTA, Footer } from "@/components/Footer";
import { KnowledgeBase } from "@/components/KnowledgeBase";
import { KB_ARTICLES } from "@/components/kb-data";
import {
  JsonLd,
  breadcrumbSchema,
  collectionPageSchema,
  itemListSchema,
} from "@/components/schema";

export const metadata: Metadata = {
  title: "Knowledge base | PYNGYN",
  description:
    "Guides, how-tos, and answers to help you get the most out of PYNGYN, from getting started to AI features, integrations, and admin.",
  alternates: { canonical: "/knowledge-base" },
};

export default function KnowledgeBasePage() {
  return (
    <>
      <JsonLd
        data={[
          collectionPageSchema({
            url: "/knowledge-base",
            name: "PYNGYN Knowledge Base",
            description:
              "Guides, how-tos, and answers to help you get the most out of PYNGYN.",
            hasPart: KB_ARTICLES.map((a) => ({
              name: a.title,
              url: `/knowledge-base/${a.slug}`,
              description: a.excerpt,
            })),
          }),
          breadcrumbSchema(
            [
              { name: "Home", url: "/" },
              { name: "Knowledge base", url: "/knowledge-base" },
            ],
            "/knowledge-base"
          ),
          itemListSchema({
            url: "/knowledge-base",
            name: "Knowledge base articles",
            items: KB_ARTICLES.map((a) => ({
              name: a.title,
              url: `/knowledge-base/${a.slug}`,
              description: a.excerpt,
            })),
          }),
        ]}
      />
      <Navbar />
      <main id="main">
        <KnowledgeBase />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
