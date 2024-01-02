import { type SchemaTypeDefinition } from "sanity";
import portableText from "./schemas/portable-text";
import portableImage from "./schemas/portable-image";
import blogPost from "./schemas/documents/blog-post";
import page from "./schemas/documents/page";
import contact from "./schemas/documents/contact";

export const schema: { types: SchemaTypeDefinition[] } = {
    types: [portableText, portableImage, blogPost, page, contact],
};
