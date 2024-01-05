import { visionTool } from '@sanity/vision';
import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { apiVersion, dataset, projectId } from './sanity/env';
import { schema } from './sanity/schema';
import { documentInternationalization } from '@sanity/document-internationalization';
import structure from './sanity/desk/structure';
import { translatedTypes, singletonTypes } from './sanity/desk/definition';
import { languageNames, languages } from './types/language';

const singletonActions = new Set(['publish', 'discardChanges', 'restore']);

export default defineConfig({
	basePath: '/admin',
	projectId,
	dataset,
	schema: {
		...schema,

		templates: (templates) =>
			templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
	},
	plugins: [
		deskTool({
			structure,
			defaultDocumentNode: (S) => S.document(),
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
	document: {
		actions: (input, context) =>
			singletonTypes.has(context.schemaType)
				? input.filter(({ action }) => action && singletonActions.has(action))
				: input,
	},
	redirects: () => {
		return [
			{
				source: '/',
				destination: '/se',
				permanent: true,
			},
		];
	},
});
