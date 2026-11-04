import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { posts, getPost, getRelatedPosts, formatDate } from "@/components/posts";
import { PostBody, stripLinks } from "@/components/PostBody";
import { BlogCover } from "@/components/BlogCover";
import { ContextualCTA } from "@/components/ContextualCTA";
import {
  OG_IMAGE,
  JsonLd,
  articleSchema,
  breadcrumbSchema,
  faqPageSchema,
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
  const description = post.metaDescription ?? post.excerpt;
  return {
    title: post.seoTitle ?? `${post.title} | PYNGYN Blog`,
    description,
    keywords: post.keywords,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      images: [OG_IMAGE],
      title: post.title,
      description,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      tags: [post.category],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
      images: [OG_IMAGE.url],
    },
  };
}

export default function BlogPost({ params }: { params: Params }) {
  const post = getPost(params.slug);
  if (!post) notFound();
  const related = getRelatedPosts(post);
  const faqs = post.faq?.map((f) => ({ q: f.q, a: stripLinks(f.a) }));

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
            keywords: post.keywords ?? [post.category, "professional services", "PYNGYN"],
          }),
          ...(faqs?.length ? [faqPageSchema(faqs, `/blog/${post.slug}`)] : []),
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

          <PostBody blocks={post.body} />

          {post.faq?.length ? (
            <section className="mt-12" aria-labelledby="post-faq">
              <h2
                id="post-faq"
                className="font-display text-[clamp(22px,2.6vw,28px)] font-semibold leading-snug tracking-[-0.02em]"
              >
                Frequently asked questions
              </h2>
              <div className="mt-5 flex flex-col divide-y divide-line rounded-2xl border border-line">
                {post.faq.map((f) => (
                  <details key={f.q} className="group p-5">
                    <summary className="cursor-pointer list-none font-semibold text-ink marker:hidden">
                      <span className="flex items-start justify-between gap-4">
                        {f.q}
                        <span aria-hidden="true" className="text-accent transition-transform group-open:rotate-45">
                          +
                        </span>
                      </span>
                    </summary>
                    <PostBody blocks={[f.a]} className="mt-3 text-[16px] text-muted" />
                  </details>
                ))}
              </div>
            </section>
          ) : null}

          <ContextualCTA category={post.category} />
        </article>

        {related.length ? (
          <aside className="mx-auto mt-16 max-w-[1040px]" aria-labelledby="related-posts">
            <h2 id="related-posts" className="font-display text-[24px] font-semibold tracking-[-0.02em]">
              Related articles
            </h2>
            <div className="mt-6 grid gap-[22px] md:grid-cols-3">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/blog/${r.slug}`}
                  className="group flex flex-col overflow-hidden rounded-[20px] border border-line bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-soft"
                >
                  <div className="aspect-[16/9] w-full overflow-hidden">
                    <BlogCover post={r} rounded="" />
                  </div>
                  <div className="p-5">
                    <div className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-accent">
                      {r.category}
                    </div>
                    <h3 className="mt-2 font-display text-[17px] font-semibold leading-snug">{r.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </aside>
        ) : null}
      </main>
      <Footer />
    </>
  );
}
