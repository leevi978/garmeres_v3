import { ListItemOptions } from "./structure/tools/list-item";

export const deskDefinition: DeskDefinition[] = [
    {
        schemaType: "blog-post",
        title: "Blog posts",
        translated: true,
        singleton: false,
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
