import { generateStaticSlugParams } from "@/app/navigation/slug";
import { Language } from "@/types/language";
import Component from "./component";
import Preview from "./preview";
import { query } from "@/sanity/lib/query";
import { sanityFetch } from "@/sanity/lib/fetch";
import LiveQuery from "next-sanity/preview/live-query";
import { draftMode } from "next/headers";
import { PageDocument } from "@/types/sanity-types";

const schemaType = "page";

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
  const data = await sanityFetch<PageDocument>({ query: documentQuery });
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
