import { generateStaticSlugParams } from "@/app/navigation/slug";
import { Language } from "@/types/language";
import Component from "./component";
import Preview from "./preview";
import { query } from "@/sanity/lib/query";
import { sanityFetch } from "@/sanity/lib/fetch";
import LiveQuery from "next-sanity/preview/live-query";
import { draftMode } from "next/headers";
import { BlogPostDocument } from "@/types/sanity-types";
import { Metadata } from "next";
import { createBlogPostMetadata } from "@/services/seo-service";

const schemaType = "blog-post";

export const generateStaticParams = () => generateStaticSlugParams(schemaType);

export const dynamicParams = false;

export default async function Page({
  params,
}: {
  params: {
    language: Language;
    slug: string;
  };
}) {
  const { slug, language } = params;
  const documentQuery = query({
    schemaType,
    slug,
    language,
    firstOnly: true,
  });
  const data = await sanityFetch<BlogPostDocument>({ query: documentQuery });
  return (
    <LiveQuery
      enabled={draftMode().isEnabled}
      query={documentQuery}
      initialData={data}
      as={Preview}
    >
      <Component document={data} />
    </LiveQuery>
  );
}

export async function generateMetadata({
  params,
}: {
  params: {
    language: Language;
    slug: string;
  };
}): Promise<Metadata> {
  const { slug, language } = params;
  const document = await sanityFetch<BlogPostDocument>({
    query: query({
      schemaType,
      slug,
      language,
      firstOnly: true,
    }),
  });
  return createBlogPostMetadata(document);
}
