import { MetadataRoute } from "next";
import { siteUrl as asyncSiteUrl } from "@/services/seo-service";
import { getAllDocuments, resolveLink } from "@/services/sanity-service";
import { ResolvableType, Document, Slug } from "@/types/sanity-types";

const documents = getAllDocuments();

function getPriority(document: Document) {
  if (document._type === "page")
    return (document.slug as Slug).current === "home" ||
      (document.slug as Slug).current === "ruoktot"
      ? 1.0
      : 0.8;
  else if (document._type === "blog-post") return 0.6;
  else return 0.1;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = await asyncSiteUrl;
  return await Promise.all(
    (
      await documents
    ).map(async (document) => {
      const url = `${siteUrl}${resolveLink({
        _type: document._type as ResolvableType,
        language: document.language,
        slug:
          typeof document.slug === "object"
            ? document.slug
            : { _type: "slug", current: document.slug },
      })}`;
      return {
        url,
        lastModified: new Date(document._updatedAt),
        priority: getPriority(document),
      };
    })
  );
}
