import { type SchemaTypeDefinition } from "sanity";
import portableText from "./schemas/portable-text";
import portableImage from "./schemas/portable-image";
import blogPost from "./schemas/documents/blog-post";
import page from "./schemas/documents/page";
import contact from "./schemas/documents/contact";
import featured from "./schemas/fields/featured";
import callToAction from "./schemas/fields/call-to-action";
import blogBrowser from "./schemas/blog-browser";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    portableText,
    portableImage,
    blogPost,
    page,
    contact,
    featured,
    callToAction,
    blogBrowser,
  ],
};
