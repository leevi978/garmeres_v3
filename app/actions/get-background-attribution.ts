"use server";
import { Language } from "@/types/language";
import { sanityFetch } from "@/sanity/lib/fetch";
import { BlogPostDocument } from "@/types/sanity-types";
import { blogPostQuery } from "@/sanity/lib/query";

export async function getPageBySlug({
  slug,
  language,
}: {
  slug: string;
  language: Language;
}): Promise<BlogPostDocument> {
  return sanityFetch<BlogPostDocument>({
    query: blogPostQuery(slug, language),
  });
}
