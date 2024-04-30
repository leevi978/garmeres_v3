import { generateStaticSlugParams } from "@/app/navigation/slug";
import { Language } from "@/types/language";
import Component from "./component";
import Preview from "./preview";
import { query } from "@/sanity/lib/query";
import { sanityFetch } from "@/sanity/lib/fetch";
import LiveQuery from "next-sanity/preview/live-query";
import { draftMode } from "next/headers";
import { PageDocument } from "@/types/sanity-types";
import { Metadata } from "next";
import { createPageMetadata } from "@/services/seo-service";

const schemaType = "page";

export const generateStaticParams = () => generateStaticSlugParams(schemaType);

export const dynamicParams = false;

function documentQuery(language: Language, slug: string): string {
  return query({
    schemaType,
    slug,
    language,
    firstOnly: true,
    fields: `featured {
        _type,
        text,
        title,
        callToAction {
          title,
          link->{
			_id,
			_type,
			slug,
			language
		  }
        }
      }`,
  });
}

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
    query: documentQuery(language, slug),
  });
  return (
    <LiveQuery
      enabled={draftMode().isEnabled}
      query={documentQuery(language, slug)}
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
    query: query({
      schemaType,
      slug,
      language,
      firstOnly: true,
    }),
  });
  return createPageMetadata(document);
}
