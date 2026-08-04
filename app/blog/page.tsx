import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BlogCover } from "@/components/BlogCover";
import { posts, formatDate } from "@/components/posts";
import {
  JsonLd,
  blogSchema,
  breadcrumbSchema,
  webPageSchema,
} from "@/components/schema";

export const metadata: Metadata = {
  title: "Blog | PYNGYN",
  description:
    "Ideas on running professional-services firms, client work, and operations, from the team building PYNGYN.",
  alternates: { canonical: "/blog" },
};

export default function BlogIndex() {
  return (
    <>
      <JsonLd
        data={[
          webPageSchema({
            url: "/blog",
            name: "Blog | PYNGYN",
            description:
              "Notes on running professional-services firms, client work, and operations, from the team building PYNGYN.",
            breadcrumbId: "/blog#breadcrumb",
          }),
          breadcrumbSchema(
            [
              { name: "Home", url: "/" },
              { name: "Blog", url: "/blog" },
            ],
            "/blog"
          ),
          blogSchema({
            url: "/blog",
            posts: posts.map((p) => ({
              slug: p.slug,
              title: p.title,
              excerpt: p.excerpt,
              date: p.date,
              category: p.category,
              author: p.author,
            })),
          }),
        ]}
      />
      <Navbar />
      <main id="main" className="wrap pb-[104px] pt-[150px]">
        <div className="max-w-[720px]">
          <span className="eyebrow">Blog</span>
          <h1 className="mt-3 font-display text-[clamp(34px,4.6vw,52px)] font-semibold leading-[1.05] tracking-[-0.025em]">
            Notes on running a services firm with AI.
          </h1>
          <p className="lead mt-4">
            Practical thinking on planning, status, and risk, from the team building PYNGYN.
          </p>
        </div>

        <div className="mt-[54px] grid gap-[22px] md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex h-full flex-col overflow-hidden rounded-[20px] border border-line bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-soft"
            >
              <div className="aspect-[16/9] w-full overflow-hidden">
                <BlogCover post={post} rounded="" className="transition-transform duration-500 group-hover:scale-[1.04]" />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <div className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-accent">
                  {post.category}
                </div>
                <h2 className="mt-3 font-display text-[20px] font-semibold leading-snug tracking-[-0.01em]">
                  {post.title}
                </h2>
                <p className="mt-2.5 flex-1 text-[15px] text-muted">{post.excerpt}</p>
                <div className="mt-5 flex items-center gap-2 text-[13px] text-muted">
                  <span>{formatDate(post.date)}</span>
                  <span aria-hidden="true">·</span>
                  <span>{post.readingTime}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
