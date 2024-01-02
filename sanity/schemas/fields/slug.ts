import { apiVersion } from "@/sanity/env";
import { query } from "@/sanity/lib/query";
import { Language } from "@/types/language";
import {
    SanityDocument,
    SlugOptions,
    SlugValidationContext,
    SlugValue,
    defineField,
} from "sanity";

import { SLUG } from "@/types/regex";

const isValidSlug = (input?: string): boolean =>
    input != null && SLUG.test(input);

export function isUnique(schemaType: string) {
    return async (slug: string, context: SlugValidationContext) => {
        const client = context.getClient({
            apiVersion,
        });
        const document = context.document;
        const language = context.document?.language as Language;
        const data = await client.fetch<SanityDocument | undefined>(
            query({
                schemaType,
                firstOnly: true,
                slug,
                language,
            })
        );
        return (
            !data ||
            data._id.replace("drafts.", "") ===
                document?._id.replace("drafts.", "")
        );
    };
}

export default function slugField(options?: SlugOptions) {
    return defineField({
        name: "slug",
        title: "Slug",
        description:
            'Used to create the URL of this document. Click "Generate" to set it automatically.',
        type: "slug",
        options,
        validation: (rule) =>
            rule
                .required()
                .custom((slug: SlugValue | undefined) =>
                    isValidSlug(slug?.current) ? true : "Invalid slug value"
                ),
    });
}
