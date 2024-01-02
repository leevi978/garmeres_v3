import { SlugOptions, SlugValue, defineField } from "sanity";

const VALID_SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const isValidSlug = (input?: string): boolean =>
    input != null && VALID_SLUG_PATTERN.test(input);

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
