import { ListItemBuilder, StructureBuilder } from "sanity/desk";
import { deskDefinition, DeskDefinition, DeskGroup } from "../definition";
import { createFolder, createListItem } from "./tools";

export function toListItems(
    S: StructureBuilder,
    definitions: DeskDefinition[]
): ListItemBuilder[] {
    return definitions.map((definition: DeskGroup | DeskDefinition) => {
        if (definition.type === "group")
            return createFolder(
                S,
                definition.title,
                toListItems(S, definition.items)
            );
        const { type, schemaType, ...options } = definition;
        return createListItem(S, schemaType, options);
    });
}

export default function structure(S: StructureBuilder) {
    return S.list().title("Content").items(toListItems(S, deskDefinition));
}
