import type { NextConfig } from "next";

/**
 * Two targets from one config:
 *
 * - `npm run build` → a normal server build (`next start`), used for local
 *   preview and by any host that runs Node.
 * - `npm run build:pages` → a fully static export to `out/` for GitHub Pages,
 *   driven by `.github/workflows/nextjs.yml`. `PAGES_BASE_PATH` comes from the
 *   `actions/configure-pages` output, so a project site gets `/repo-name` and a
 *   user site or custom domain gets an empty prefix without touching code.
 *
 * Images stay optimised in server mode and are marked unoptimised in export
 * mode, because static hosting has no image service to resize anything.
 */
const isExport = process.env.PAGES_EXPORT === "1";
const basePath = isExport ? (process.env.PAGES_BASE_PATH ?? "") : "";

const nextConfig: NextConfig = {
  ...(isExport
    ? { output: "export" as const, images: { unoptimized: true } }
    : {}),
  basePath,
  // GitHub Pages serves `/work/slug/` from `work/slug/index.html`. Without this
  // the export writes `work/slug.html` and every link takes a redirect.
  trailingSlash: isExport,
};

export default nextConfig;
