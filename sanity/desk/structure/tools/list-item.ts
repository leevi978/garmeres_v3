import { StructureBuilder } from "sanity/desk";
import createViews, { ViewOptions } from "./views";

export type ListItemOptions = {
    title?: string;
    singleton?: boolean;
    translated?: boolean;
} & ViewOptions;

function createFilter(schemaType: string, translated?: boolean) {
    return `_type == "${schemaType}"${
        translated ? ` && language != "se"` : ""
    }`;
}

export default function createListItem(
    S: StructureBuilder,
    schemaType: string,
    options?: ListItemOptions
) {
    const { title, singleton, translated, ...viewOptions } = options || {};
    return S.listItem()
        .id(schemaType)
        .title(title || schemaType)
        .child(
            singleton
                ? S.document()
                      .id(schemaType)
                      .schemaType(schemaType)
                      .documentId(schemaType)
                      .views(createViews(S, schemaType, viewOptions))
                : S.documentList()
                      .id(schemaType)
                      .schemaType(schemaType)
                      .filter(createFilter(schemaType, translated))
                      .child(
                          S.document()
                              .schemaType(schemaType)
                              .views(createViews(S, schemaType, viewOptions))
                      )
        );
}
