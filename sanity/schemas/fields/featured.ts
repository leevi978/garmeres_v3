import { defineField, defineType } from "sanity";

export default defineType({
  name: "featured",
  title: "Featured banner",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "text",
      title: "Text",
      type: "text",
    }),
    defineField({
      name: "callToAction",
      title: "Call to action",
      description: "Link button on the featured banner (optional)",
      type: "call-to-action",
    }),
  ],
});
