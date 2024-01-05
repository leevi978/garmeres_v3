import { visionTool } from '@sanity/vision';
import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { apiVersion, dataset, projectId } from './sanity/env';
import { schema } from './sanity/schema';
import { documentInternationalization } from '@sanity/document-internationalization';
import structure from './sanity/desk/structure';
import { translatedTypes, singletonTypes } from './sanity/desk/definition';
import { defaultLanguage, languageNames, languages } from './types/language';

const singletonActions = new Set(['publish', 'discardChanges', 'restore']);

export default defineConfig({
	basePath: '/admin',
	projectId,
	dataset,
	schema: {
		...schema,

		templates: (templates) =>
			templates
				.filter(({ schemaType }) => !singletonTypes.has(schemaType))
				.filter(({ id }) => !translatedTypes.includes(id))
				.filter(({ id }) => {
					for (let i = 0; i < languages.length; i++) {
						const language = languages[i];
						for (let k = 0; k < translatedTypes.length; k++) {
							const schemaType = translatedTypes[k];
							if (
								language !== defaultLanguage &&
								id === `${schemaType}-${language}`
							)
								return false;
						}
					}
					return true;
				}),
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
			apiVersion,
		}),
	],
	document: {
		actions: (input, context) => {
			return singletonTypes.has(context.schemaType)
				? input.filter(({ action }) => action && singletonActions.has(action))
				: input;
		},
		newDocumentOptions: (prev, { creationContext }) => {
			const { type } = creationContext;
			if (type === 'global') {
				return [];
			}
			return prev;
		},
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
