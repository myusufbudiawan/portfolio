import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

// Required for the GitHub Pages static export: route handlers are dynamic by
// default, and an export cannot render one at request time.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/add-project"] }],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
