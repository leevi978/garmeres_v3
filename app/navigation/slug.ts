import { client } from "@/sanity/lib/client";
import { query } from "@/sanity/lib/query";
import { Language } from "@/types/language";
import { SanityDocument } from "next-sanity";

type SanityPage = SanityDocument & {
    language: Language;
    slug: { current: string };
};

export async function generateStaticSlugParams(schemaType: string) {
    const data = await client.fetch<SanityPage>(
        query({
            schemaType,
            sort: "_createdAt desc",
        })
    );

    return data
        .filter((item: SanityPage) => item.slug != null)
        .map((item: SanityPage) => {
            return {
                slug: item.slug.current,
                language: item.language,
            };
        });
}
