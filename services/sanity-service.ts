import { client } from "@/sanity/lib/client";
import { query } from "@/sanity/lib/query";
import { Language } from "@/types/language";
import { SanityDocument } from "next-sanity";
import { PortableTextBlock } from "sanity";

type Document = SanityDocument & {
    language: Language;
    slug: string;
    body: PortableTextBlock[];
    title: string;
};

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
