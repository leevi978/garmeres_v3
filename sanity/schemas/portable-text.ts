import { defineType } from "sanity";

export default defineType({
    name: "portable-text",
    title: "Rich text",
    type: "array",
    of: [
        {
            type: "block",
        },
        {
            type: "portable-image",
        },
    ],
});
