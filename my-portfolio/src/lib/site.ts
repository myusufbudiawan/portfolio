/**
 * One canonical origin for everything absolute: canonical links, Open Graph,
 * sitemap and robots. Override with NEXT_PUBLIC_SITE_URL when the domain moves.
 *
 * The default is the GitHub Pages project URL, which includes the base path,
 * because that is where the site is deployed by default.
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://myusufbudiawan.github.io/portfolio"
).replace(/\/+$/, "");

/** Scheme + host only, base path removed. */
export const siteOrigin = new URL(siteUrl).origin;

/**
 * Prefix for assets and links; empty on a root deploy or a custom domain.
 * Exported for completeness — Next reads the same value from next.config.ts.
 */
export const basePath = process.env.PAGES_BASE_PATH ?? "";
