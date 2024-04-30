import { client } from "@/sanity/lib/client";
import {
  documentsQuery,
  query,
  translationQuery,
  translationsQuery,
} from "@/sanity/lib/query";
import { Language, toTranslated } from "@/types/language";
import { Translated } from "@/types/language";
import {
  BlogPostDocument,
  ContactDocument,
  PageDocument,
  ResolvableLink,
  SiteMetadataDocument,
  TranslatedDocument,
  Document,
} from "@/types/sanity-types";
import imageUrlBuilder from "@sanity/image-url";
import { SanityReference } from "next-sanity";

const imgUrlBuilder = imageUrlBuilder(client);

export function urlForImage(image: { _key: string; asset: SanityReference }) {
  return imgUrlBuilder.image(image);
}

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
          current:
            typeof document.slug === "object"
              ? document.slug.current
              : document.slug,
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

export async function getSiteMetadata({ language }: { language: Language }) {
  return client.fetch<SiteMetadataDocument>(
    query({
      schemaType: "seo",
      language,
      firstOnly: true,
    })
  );
}
export async function getAllSiteMetadata() {
  return client.fetch<SiteMetadataDocument[]>(
    query({
      schemaType: "seo",
      fields: `
        "imageUrl": siteThumbnail.asset->url
      `,
    })
  );
}

export async function getTranslatedDocument(
  _id: string
): Promise<Translated<Document>> {
  const data = await client.fetch<TranslatedDocument<Document>>(
    translationQuery(_id)
  );
  return toTranslated<Document>(data._translations);
}

type BlogPostQueryOptions = {
  perPage?: number;
  page?: number;
  language?: Language;
};

function paginateArray<T>(
  array: T[],
  pageSize: number,
  pageNumber: number
): T[] {
  return array.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
}

export async function getBlogPosts(options?: BlogPostQueryOptions) {
  const blogPosts = await client.fetch<BlogPostDocument[]>(
    query({
      schemaType: "blog-post",
      language: options?.language,
      sort: "_createdAt desc",
    })
  );
  let hasMore = false;
  if (options?.perPage) {
    const maxPages = Math.ceil(blogPosts.length / options.perPage);
    hasMore = (options?.page || 1) < maxPages;
  }
  return {
    blogPosts: options?.perPage
      ? paginateArray(blogPosts, options.perPage, options.page || 1)
      : blogPosts,
    hasMore,
  };
}

export function getPageBySlug({
  slug,
  language,
}: {
  slug: string;
  language: Language;
}) {
  return client.fetch<PageDocument>(
    query({
      schemaType: "page",
      firstOnly: true,
      language,
      slug,
    })
  );
}

export function getContactInfo() {
  return client.fetch<ContactDocument>(
    query({
      schemaType: "contact",
      firstOnly: true,
    })
  );
}

export function getTranslations<T extends PageDocument | BlogPostDocument>({
  schemaType,
  slug,
  language,
}: {
  schemaType: string;
  slug: string;
  language: Language;
}) {
  return client.fetch<TranslatedDocument<T>>(
    translationsQuery({
      schemaType,
      slug,
      language,
    })
  );
}

export function getAllDocuments(): Promise<Document[]> {
  return client.fetch<Document[]>(documentsQuery);
}
