import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { apiVersion, dataset, projectId } from "./sanity/env";
import { schema } from "./sanity/schema";
import { documentInternationalization } from "@sanity/document-internationalization";
import structure from "./sanity/desk/structure";
import { translatedTypes } from "./sanity/desk/definition";
import { languageNames, languages } from "./types/language";

export default defineConfig({
    basePath: "/admin",
    projectId,
    dataset,
    schema,
    plugins: [
        deskTool({
            structure,
        }),
        visionTool({ defaultApiVersion: apiVersion }),
        documentInternationalization({
            supportedLanguages: languages.map((language) => {
                return {
                    id: language,
                    title: languageNames[language],
                };
            }),
            schemaTypes: translatedTypes,
        }),
    ],
    redirects: () => {
        return [
            {
                source: "/",
                destination: "/se",
                permanent: true,
            },
        ];
    },
});
