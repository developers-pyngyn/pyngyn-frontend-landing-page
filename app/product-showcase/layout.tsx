import type { Metadata } from "next";
import { OG_IMAGE } from "@/components/schema";

export const metadata: Metadata = {
  title: "Interactive Product Showcase | Pyngyn ClientSpace",
  description:
    "Experience Pyngyn ClientSpace interactively: explore real-time client task tables, kanban review boards, statutory calendars, and capacity cockpits.",
  alternates: { canonical: "/product-showcase" },
  openGraph: {
    title: "Interactive Product Showcase | Pyngyn ClientSpace",
    description:
      "Explore real-time client task tables, kanban review boards, statutory calendars, and capacity cockpits in Pyngyn ClientSpace.",
    url: "/product-showcase",
    type: "website",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Interactive Product Showcase | Pyngyn ClientSpace",
    description:
      "Explore real-time client task tables, kanban review boards, statutory calendars, and capacity cockpits in Pyngyn ClientSpace.",
    images: [OG_IMAGE.url],
  },
};

export default function ProductShowcaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
