import type { BlogPost } from "./posts";

const coverThemes = [
  "from-[#111827] via-[#4f46e5] to-[#06b6d4]",
  "from-[#111827] via-[#7c3aed] to-[#f97316]",
  "from-[#0f172a] via-[#0d9488] to-[#84cc16]",
  "from-[#1e1b4b] via-[#db2777] to-[#facc15]",
  "from-[#172554] via-[#2563eb] to-[#22c55e]",
  "from-[#312e81] via-[#9333ea] to-[#14b8a6]",
];

function themeForPost(post: BlogPost): string {
  const seed = [...post.slug].reduce((total, char) => total + char.charCodeAt(0), 0);
  return coverThemes[seed % coverThemes.length];
}

/**
 * Blog featured image.
 * - If `post.cover` is set (e.g. "/blog/my-photo.jpg"), the real image is shown.
 * - Otherwise an on-brand generated cover is shown with the post title.
 */
export function BlogCover({
  post,
  className = "",
  rounded = "rounded-t-[20px]",
}: {
  post: BlogPost;
  className?: string;
  rounded?: string;
}) {
  if (post.cover) {
    // eslint-disable-next-line @next/next/no-img-element
    return (
      <img
        src={post.cover}
        alt={post.title}
        className={`h-full w-full object-cover ${rounded} ${className}`}
      />
    );
  }

  const theme = themeForPost(post);

  return (
    <div
      className={`relative flex h-full w-full overflow-hidden bg-gradient-to-br ${theme} ${rounded} ${className}`}
      role="img"
      aria-label={`Featured image for ${post.title}`}
    >
      <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-white/20 blur-sm" />
      <div className="absolute bottom-[-38px] left-[-22px] h-32 w-32 rounded-full border border-white/25" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_24px_24px,rgba(255,255,255,0.24)_2px,transparent_0)] bg-[length:28px_28px] opacity-40" />
      <div className="relative z-10 flex h-full w-full flex-col justify-between p-6 text-white">
        <div className="flex items-center justify-between gap-4">
          <span className="rounded-full border border-white/30 bg-white/15 px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.16em]">
            {post.category}
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/70">
            PYNGYN
          </span>
        </div>
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/75">
            Featured article
          </p>
          <p className="mt-2 max-w-[92%] font-display text-[clamp(20px,4vw,34px)] font-semibold leading-[1.05] tracking-[-0.03em] drop-shadow-sm">
            {post.title}
          </p>
        </div>
      </div>
    </div>
  );
}

