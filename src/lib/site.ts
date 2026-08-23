/**
 * Single source of truth for the deployed origin.
 *
 * Set this once after the first deploy. It feeds metadataBase (OG/canonical),
 * robots.txt and sitemap.xml — previously the URL was hardcoded in layout.tsx
 * only, so adding robots/sitemap would have meant three places to keep in sync.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://muhammadshaban.vercel.app";
