import { client } from "@/sanity/lib/client";
import { query, translationQuery } from "@/sanity/lib/query";
import { Language, toTranslated } from "@/types/language";
import { SanityDocument } from "next-sanity";
import { PortableTextBlock } from "sanity";
import { Translated } from "@/types/language";
import { MenuItem, PageDocument, ResolvableLink } from "@/types/sanity-types";
import { cache } from "react";

type Document = SanityDocument & {
  language: Language;
  slug: string;
  body: PortableTextBlock[];
  title: string;
};

type TranslatedDocument = SanityDocument & {
  _translations: Document[];
};

export function resolveLink(link: ResolvableLink) {
  const { language, slug, _type } = link;
  return `/${language}${_type === "blog-post" ? "/blog" : ""}/${
    (slug.current as any).current || slug.current
  }`;
}

export async function getMenuItems({ language }: { language: Language }) {
  const documents = await client.fetch<PageDocument[]>(
    query({
      schemaType: "page",
      language,
      sort: "menuIndex asc",
    })
  );
  return documents.map((document) => {
    return {
      name: document.title,
      path: resolveLink({
        language,
        slug: {
          _type: "slug",
          current: document.slug,
        },
        _type: document._type,
      }),
    };
  });
}

export async function getDocument({
  schemaType,
  slug,
  language,
}: {
  schemaType: string;
  slug: string;
  language: Language;
}): Promise<Document> {
  return client.fetch<Document>(
    query({
      schemaType,
      slug,
      language,
      firstOnly: true,
    })
  );
}

export async function getTranslatedDocument(
  _id: string
): Promise<Translated<Document>> {
  const data = await client.fetch<TranslatedDocument>(translationQuery(_id));
  return toTranslated<Document>(data._translations);
}
