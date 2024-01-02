import { defineField, defineType } from "sanity";
import slugField from "../fields/slug";

export default defineType({
    name: "page",
    type: "document",
    title: "Page",
    fields: [
        defineField({
            name: "title",
            title: "Title",
            type: "string",
            validation: (rule) => rule.required(),
        }),
        slugField({
            source: "title",
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
