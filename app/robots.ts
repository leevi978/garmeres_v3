import { MetadataRoute } from "next";
import { siteUrl } from "@/services/seo-service";

export default async function robots(): Promise<MetadataRoute.Robots> {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/admin/",
    },
    sitemap: `${await siteUrl}/sitemap.xml`,
  };
}
