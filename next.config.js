/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Deployed via @cloudflare/next-on-pages, which builds a normal Next.js app
  // and runs route handlers (e.g. app/api/chat) as edge functions on Cloudflare.
  // NOTE: do NOT set `output: "export"` here — static export disables API routes.
  images: { unoptimized: true },
  trailingSlash: true,
};

module.exports = nextConfig;
