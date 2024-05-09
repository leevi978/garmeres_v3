import { generateStaticSlugParams } from "@/app/navigation/slug";
import { Language, forceLanguage } from "@/types/language";
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
  const language = forceLanguage(params.language);
  const slug = params.slug;
  const data = await sanityFetch<BlogPostDocument>({
    query: blogPostQuery(slug, language),
  });
  if (!data) notFound();
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
  const language = forceLanguage(params.language);
  const slug = params.slug;
  const document = await sanityFetch<BlogPostDocument>({
    query: blogPostQuery(slug, language),
  });
  if (!document) notFound();
  return createBlogPostMetadata(document);
}
