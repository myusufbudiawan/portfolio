import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/add-project"] }],
    sitemap: "https://myusufbudiawan.vercel.app/sitemap.xml",
  };
}
