import { defineType } from "sanity";
import BlogBrowserPreview from "../components/blog-browser/preview";

export default defineType({
  name: "blog-browser",
  title: "Blog browser",
  type: "object",
  components: {
    preview: BlogBrowserPreview,
  },
  fields: [
    {
      name: "language",
      type: "string",
      options: {
        list: [
          { title: "English", value: "en" },
          { title: "Davvisámegiella", value: "se" },
        ],
        layout: "radio",
      },
      validation: (rule) => rule.required(),
      initialValue: "en",
    },
  ],
});
