import { StructureBuilder } from 'sanity/structure';
import createViews, { ViewOptions } from './views';
import { apiVersion } from '@/sanity/env';

export type ListItemOptions = {
	title?: string;
	singleton?: boolean;
} & ViewOptions;

function createFilter(schemaType: string, translated?: boolean) {
	return `_type == "${schemaType}"${translated ? ` && language != "se"` : ''}`;
}

export default function createListItem(
	S: StructureBuilder,
	schemaType: string,
	options?: ListItemOptions
) {
	const { title, singleton, ...viewOptions } = options || {};
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
						.apiVersion(apiVersion)
						.filter(createFilter(schemaType, viewOptions.translated))
						.child((documentId) =>
							S.document()
								.id(documentId)
								.schemaType(schemaType)
								.views(createViews(S, schemaType, viewOptions))
						)
		);
}
