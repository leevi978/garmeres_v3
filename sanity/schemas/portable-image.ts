import { defineField, defineType } from "sanity";

export default defineType({
    name: "portable-image",
    title: "Image",
    type: "image",
    fields: [
        defineField({
            name: "alt",
            title: "Alternative text",
            description:
                "Describe what is shown in the image, so it can be read by visually impaired users.",
            type: "string",
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: "attribution",
            title: "Attribution",
            description: `E.g. "Photo by Hans Hansen"`,
            type: "string",
        }),
        defineField({
            name: "title",
            title: "Title",
            description:
                "Displayed when hovering the image with the mouse, or if the image fails to render.",
            type: "string",
        }),
        defineField({
            name: "caption",
            title: "Caption",
            description: "Will be displayed underneath the image.",
            type: "string",
        }),
    ],
});
