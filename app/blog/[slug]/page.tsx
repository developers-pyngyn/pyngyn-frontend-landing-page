import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { posts, getPost, formatDate } from "@/components/posts";
import { BlogCover } from "@/components/BlogCover";
import { ContextualCTA } from "@/components/ContextualCTA";
import {
  OG_IMAGE,
  JsonLd,
  articleSchema,
  breadcrumbSchema,
  webPageSchema,
} from "@/components/schema";

type Params = { slug: string };

// Pre-render all known posts at build time.
export function generateStaticParams(): Params[] {
  return posts.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const post = getPost(params.slug);
  if (!post) return { title: "Post not found | PYNGYN" };
  return {
    title: `${post.title} | PYNGYN Blog`,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      images: [OG_IMAGE],
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      tags: [post.category],
    },
  };
}

export default function BlogPost({ params }: { params: Params }) {
  const post = getPost(params.slug);
  if (!post) notFound();

  return (
    <>
      <JsonLd
        data={[
          webPageSchema({
            url: `/blog/${post.slug}`,
            name: post.title,
            description: post.excerpt,
            breadcrumbId: `/blog/${post.slug}#breadcrumb`,
            datePublished: post.date,
            dateModified: post.date,
          }),
          breadcrumbSchema(
            [
              { name: "Home", url: "/" },
              { name: "Blog", url: "/blog" },
              { name: post.title, url: `/blog/${post.slug}` },
            ],
            `/blog/${post.slug}`
          ),
          articleSchema({
            type: "BlogPosting",
            url: `/blog/${post.slug}`,
            headline: post.title,
            description: post.excerpt,
            datePublished: post.date,
            dateModified: post.date,
            authorName: post.author,
            articleSection: post.category,
            keywords: [post.category, "professional services", "PYNGYN"],
          }),
        ]}
      />
      <Navbar />
      <main id="main" className="wrap pb-[104px] pt-[150px]">
        <article className="mx-auto max-w-[680px]">
          <Link href="/blog" className="text-[14px] font-semibold text-accent hover:underline">
            ← All posts
          </Link>
          <div className="mt-6 flex items-center gap-2 text-[12px] font-semibold uppercase tracking-wider text-accent">
            {post.category}
          </div>
          <h1 className="mt-3 font-display text-[clamp(30px,4.4vw,46px)] font-semibold leading-[1.08] tracking-[-0.025em]">
            {post.title}
          </h1>
          <div className="mt-4 flex items-center gap-2 text-[14px] text-muted">
            <span>{post.author}</span>
            <span aria-hidden="true">·</span>
            <span>{formatDate(post.date)}</span>
            <span aria-hidden="true">·</span>
            <span>{post.readingTime}</span>
          </div>

          <div className="mt-8 aspect-[16/8] w-full overflow-hidden rounded-[20px] border border-line">
            <BlogCover post={post} rounded="" />
          </div>

          <div className="mt-9 flex flex-col gap-5 text-[17px] leading-[1.7] text-ink">
            {post.body.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          <ContextualCTA category={post.category} />
        </article>
      </main>
      <Footer />
    </>
  );
}
