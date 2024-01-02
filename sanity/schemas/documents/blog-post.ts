import { defineField, defineType } from "sanity";
import slugField, { isUnique } from "../fields/slug";

export default defineType({
    name: "blog-post",
    type: "document",
    title: "Blog post",
    fields: [
        defineField({
            name: "title",
            title: "Title",
            type: "string",
            validation: (rule) => rule.required(),
        }),
        slugField({
            source: "title",
            isUnique: isUnique("blog-post"),
        }),
        defineField({
            name: "thumbnail",
            title: "Thumbnail",
            type: "portable-image",
        }),
        defineField({
            name: "body",
            title: "Body",
            type: "portable-text",
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: "language",
            type: "string",
            readOnly: true,
            hidden: true,
        }),
    ],
});
