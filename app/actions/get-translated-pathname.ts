'use server';
import { Language, languages } from '@/types/language';
import { getTranslations, resolveLink } from '@/services/sanity-service';
import { BlogPostDocument, PageDocument } from '@/types/sanity-types';

export async function getTranslatedPathname(
	pathname: string,
	language: Language
) {
	const schemaType = pathname.split('/').slice(0, -1).includes('blog')
		? 'blog-post'
		: 'page';
	const slug = pathname.split('/').at(-1) || '';
	const document = await getTranslations({ schemaType, slug, language });

	const translation = document?._translations.find(
		(doc: BlogPostDocument | PageDocument) => doc.language !== language
	);

	if (translation) {
		return resolveLink({
			_type: schemaType,
			language: translation.language,
			slug: translation.slug as any,
		});
	} else {
		const translationLanguage =
			languages.find((lang) => lang !== language) || 'en';
		return `/${translationLanguage}`;
	}
}
