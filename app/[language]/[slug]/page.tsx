import { generateStaticSlugParams } from "@/app/navigation/slug";
import { Language } from "@/types/language";
import Component from "./component";
import Preview from "./preview";
import { pageQuery } from "@/sanity/lib/query";
import { sanityFetch } from "@/sanity/lib/fetch";
import LiveQuery from "next-sanity/preview/live-query";
import { draftMode } from "next/headers";
import { PageDocument } from "@/types/sanity-types";
import { Metadata } from "next";
import { createPageMetadata } from "@/services/seo-service";

export const generateStaticParams = () => generateStaticSlugParams("page");

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
  const data = await sanityFetch<PageDocument>({
    query: pageQuery(slug, language),
  });
  return (
    <LiveQuery
      enabled={draftMode().isEnabled}
      query={pageQuery(slug, language)}
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
  const document = await sanityFetch<PageDocument>({
    query: pageQuery(slug, language),
  });
  return createPageMetadata(document);
}
