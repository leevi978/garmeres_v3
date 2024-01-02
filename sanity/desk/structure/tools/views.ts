import {
    ComponentViewBuilder,
    FormViewBuilder,
    StructureBuilder,
} from "sanity/desk";
import { Translated, isTranslated, languages } from "@/types/language";
import { Iframe } from "sanity-plugin-iframe-pane";
import { SanityDocument } from "sanity";

type PreviewPath = ((doc: SanityDocument) => string) | string;

type PreviewUrlOptions = { doc?: SanityDocument; path?: PreviewPath };

function createPreviewUrl(options?: PreviewUrlOptions) {
    const { doc, path } = options || {};
    const baseUrl = `${window.location.protocol}//${window.location.host}/api/preview`;

    if (!path) return baseUrl;

    let slug: string | undefined;
    if (typeof path === "string" && path.length > 0) slug = path;
    else if (typeof path === "function") {
        if (!doc)
            throw new Error(
                "Preview url path is a function, but no sanity document was provided."
            );
        slug = path(doc);
    }
    return `${baseUrl}${slug ? `?slug=${slug}` : ""}`;
}

type PreviewOptions = {
    id?: string;
    title?: string;
    path?: PreviewPath;
};

function createPreview(S: StructureBuilder, options?: PreviewOptions) {
    const { title, path, id } = options || {};

    return S.view
        .component(({ document }) =>
            Iframe({
                document,
                options: {
                    url: createPreviewUrl({ doc: document, path }),
                    key: id,
                },
            })
        )
        .title(title || "Preview")
        .id(id || "preview");
}

export type ViewOptions = {
    preview?: boolean;
    previewOptions?: PreviewOptions | Translated<PreviewOptions>;
};

export default function createViews(
    S: StructureBuilder,
    id: string,
    options?: ViewOptions
) {
    const { preview, previewOptions } = options || {};
    let views: (ComponentViewBuilder | FormViewBuilder)[] = [S.view.form()];
    if (preview) {
        if (previewOptions && isTranslated(previewOptions))
            languages.forEach((language) => {
                views.push(
                    createPreview(S, {
                        title:
                            previewOptions[language].title ||
                            `Preview - ${language.toUpperCase()}`,
                        id:
                            previewOptions[language].id ||
                            `${id}-preview-${language.toLowerCase()}`,
                        path: previewOptions[language].path,
                    })
                );
            });
        else {
            views.push(createPreview(S, previewOptions));
        }
    }
    return views;
}
