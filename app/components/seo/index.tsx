import { getSiteMetadata } from "@/services/sanity-service";
import { Language } from "@/types/language";
import { BlogPostDocument, Document, PageDocument } from "@/types/sanity-types";

async function createSeoTags(document: Document) {
  const siteMetadata = await getSiteMetadata({ language: document.language });
}

type SeoProps = {
  title: string;
  description: string;
  language: Language;
  keywords: string[];
};

type MetaTag = {
  name?: string;
  content?: string;
  rel?: string;
  title?: string;
  href?: string;
  hreflang?: string;
  type?: string;
  property?: string;
};

const dynamicMetaTags: MetaTag[] = [
  { property: "og:title", content: "" },
  { property: "og:description", content: "" },
  { property: "og:url", content: "" },
  { property: "og:image", content: "" },
  { property: "og:image_secure_url", content: "" },
  { property: "og:image:type", content: "" },
  { property: "og:image:width", content: "" },
  { property: "og:image:height", content: "" },
  { property: "og:image:alt", content: "" },
  { property: "og:type", content: "website" },
  { name: "twitter:title", content: "" },
  { name: "twitter:description", content: "" },
  { name: "twitter:image", content: "" },
  { name: "twitter:image:alt", content: "" },
  { name: "keywords", content: "" },
  { name: "revised", content: "" },
  { name: "date", content: "" },
  { name: "og:locale", content: "" },
  { name: "og:locale:alternate", content: "" },
  { name: "og:type", content: "" },
  { name: "language", content: "" },
];

const staticMetaTags: MetaTag[] = [
  {
    name: "google-site-verification",
    content: "qXCsNPBHkYWOB9sdM_-WjZiGEBJav4XsiyAdwQf",
  },
  { name: "google", content: "nositelinkssearchbox" },
  { name: "charset", content: "UTF-8" },
  { name: "viewport", content: "width=device-width, initial-scale=1" },
  { name: "color-scheme", content: "only light" },
  { name: "og:type", content: "website" },
  { name: "og:site_name", content: "Garmeres" },
  { name: "twitter:image", content: "" },
  { name: "twitter:image:alt", content: "" },
  { name: "twitter:card", content: "summary" },
  { name: "keywords", content: "" },
];

export default async function SEO({ document }: { document: Document }) {
  await createSeoTags(document);
  return <></>;
}
