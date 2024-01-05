import {
	ComponentViewBuilder,
	FormViewBuilder,
	StructureBuilder,
} from 'sanity/desk';
import {
	Language,
	defaultLanguage,
	languageNames,
	languages,
} from '@/types/language';
import { Iframe, IframeProps } from 'sanity-plugin-iframe-pane';
import { SanityDocument } from 'sanity';
import { getTranslatedDocument } from '@/services/sanity-service';

type PreviewPath = ((doc: SanityDocument) => string) | string;

function resolvePreviewPath(
	path: PreviewPath,
	document: SanityDocument | null
) {
	if (typeof path === 'function') {
		if (!document) return undefined;
		return path(document);
	}
	return path;
}

type PreviewUrlOptions = {
	document: SanityDocument | null;
	path?: PreviewPath;
};

function createPreviewUrl({ document, path }: PreviewUrlOptions) {
	return `${window.location.protocol}//${window.location.host}/api/preview${
		path ? `?path=${resolvePreviewPath(path, document)}` : ''
	}`;
}

function createPreview(
	S: StructureBuilder,
	id: string,
	path?: PreviewPath,
	language?: Language
) {
	const previewId = `${id}-preview${language ? `-${language}` : ''}`;
	const previewTitle = `Preview${
		language ? ` - ${languageNames[language]}` : ''
	}`;
	return S.view
		.component((props: IframeProps) => {
			return Iframe({
				document: props.document,
				options: {
					url: async (doc) => {
						let document = doc;
						if (doc && language && language !== defaultLanguage) {
							const data = await getTranslatedDocument(
								doc._id.replace('drafts.', '')
							);
							document = data[language];
						}
						return createPreviewUrl({
							document: document != null ? document : props.document.draft,
							path,
						});
					},
					key: previewId,
				},
			});
		})
		.title(previewTitle)
		.id(previewId);
}

export type ViewOptions = {
	preview?: boolean;
	translated?: boolean;
	previewPath?: PreviewPath;
};

export default function createViews(
	S: StructureBuilder,
	id: string,
	options?: ViewOptions
) {
	const { preview, translated, previewPath } = options || {};
	let views: (ComponentViewBuilder | FormViewBuilder)[] = [S.view.form()];

	if (preview) {
		if (translated) {
			languages.forEach((language) => {
				views.push(createPreview(S, id, previewPath, language));
			});
		} else views.push(createPreview(S, id, previewPath));
	}
	return views;
}
