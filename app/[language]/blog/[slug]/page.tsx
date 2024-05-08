import { generateStaticSlugParams } from "@/app/navigation/slug";
import { Language } from "@/types/language";
import Component from "./component";
import Preview from "./preview";
import { blogPostQuery } from "@/sanity/lib/query";
import { sanityFetch } from "@/sanity/lib/fetch";
import LiveQuery from "next-sanity/preview/live-query";
import { draftMode } from "next/headers";
import { BlogPostDocument } from "@/types/sanity-types";
import { Metadata } from "next";
import { createBlogPostMetadata } from "@/services/seo-service";
import { notFound } from "next/navigation";

export const generateStaticParams = () => generateStaticSlugParams("blog-post");

export const dynamicParams = false;

export default async function Page({
  params,
}: {
  params: {
    language?: Language;
    slug: string;
  };
}) {
  const { slug, language } = params;
  if (!language) notFound();
  const data = await sanityFetch<BlogPostDocument>({
    query: blogPostQuery(slug, language),
  });
  return (
    <LiveQuery
      enabled={draftMode().isEnabled}
      query={blogPostQuery(slug, language)}
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
  if (!language) notFound();
  const document = await sanityFetch<BlogPostDocument>({
    query: blogPostQuery(slug, language),
  });
  return createBlogPostMetadata(document);
}
