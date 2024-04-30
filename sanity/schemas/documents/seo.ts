import { defineField, defineType } from "sanity";

export default defineType({
  name: "seo",
  type: "document",
  title: "Seo",
  groups: [
    {
      name: "general",
      title: "General",
    },
    {
      name: "google",
      title: "Google",
    },
  ],
  fields: [
    defineField({
      name: "siteTitle",
      title: "Site title",
      type: "string",
      group: "general",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "siteUrl",
      title: "Site URL",
      type: "string",
      group: "general",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "siteDescription",
      title: "Site description",
      type: "text",
      group: "general",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "siteThumbnail",
      title: "Site thumbnail",
      type: "portable-image",
      group: "general",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "siteCreator",
      title: "Site creator",
      type: "string",
      group: "general",
    }),
    defineField({
      name: "sitePublisher",
      title: "Site publisher",
      type: "string",
      group: "general",
    }),
    defineField({
      name: "googleSiteVerification",
      title: "Google site verification",
      type: "string",
      group: "google",
    }),
    defineField({
      name: "keywords",
      title: "Keywords",
      type: "array",
      of: [{ type: "string" }],
      group: "google",
    }),
    defineField({
      name: "language",
      type: "string",
      readOnly: true,
      hidden: true,
    }),
  ],
});
