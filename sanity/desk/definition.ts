import { ListItemOptions } from "./structure/tools/list-item";

export const deskDefinition: DeskDefinition[] = [
  {
    type: "group",
    title: "Settings",
    items: [
      {
        schemaType: "contact",
        title: "Contact information",
        singleton: true,
      },
      {
        schemaType: "seo",
        title: "Site metadata",
        singleton: true,
        translated: true,
      },
    ],
  },
  {
    schemaType: "page",
    title: "Pages",
    translated: true,
    singleton: false,
    preview: true,
    previewPath: (doc: any) => {
      return `${doc.language || ""}${
        doc.slug.current ? `/${doc.slug.current}` : ""
      }`;
    },
  },
  {
    schemaType: "blog-post",
    title: "Blog posts",
    translated: true,
    singleton: false,
    preview: true,
    previewPath: (doc: any) =>
      `${doc.language || ""}/blog${
        doc.slug.current ? `/${doc.slug.current}` : ""
      }`,
  },
];

export type DeskDefinition = DeskSchemaType | DeskGroup;

export type DeskSchemaType = {
  schemaType: string;
  type?: "schema";
} & ListItemOptions;

export type DeskGroup = {
  title: string;
  type: "group";
  items: DeskSchemaType[];
};

function definitionIsGroup(
  definition: DeskDefinition
): definition is DeskGroup {
  return definition.type === "group";
}

export const deskSchemaTypes = deskDefinition.flatMap((definition) =>
  definitionIsGroup(definition) ? definition.items : definition
);

export const singletonTypes = new Set(
  deskSchemaTypes
    .filter((type) => type.singleton === true)
    .map((type) => type.schemaType)
);
export const translatedTypes = deskSchemaTypes
  .filter((type) => type.translated === true)
  .map((type) => type.schemaType);
