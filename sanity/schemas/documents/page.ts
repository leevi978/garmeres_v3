import { defineField, defineType } from "sanity";
import slugField from "../fields/slug";
import { isUnique } from "../fields/slug";

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
      isUnique: isUnique("page"),
    }),
    defineField({
      name: "featured",
      title: "Featured banner",
      description: "Banner shown on the top of the page (optional)",
      type: "featured",
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "portable-text",
    }),
    defineField({
      name: "backgroundImage",
      title: "Background image",
      type: "portable-image",
    }),
    defineField({
      name: "language",
      type: "string",
      readOnly: true,
      hidden: true,
    }),
  ],
});
