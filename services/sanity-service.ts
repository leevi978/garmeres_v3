import { client } from '@/sanity/lib/client';
import { query, translationQuery } from '@/sanity/lib/query';
import { Language, toTranslated } from '@/types/language';
import { SanityDocument } from 'next-sanity';
import { PortableTextBlock } from 'sanity';
import { Translated } from '@/types/language';

type Document = SanityDocument & {
	language: Language;
	slug: string;
	body: PortableTextBlock[];
	title: string;
};

type TranslatedDocument = SanityDocument & {
	_translations: Document[];
};

export async function getDocument({
	schemaType,
	slug,
	language,
}: {
	schemaType: string;
	slug: string;
	language: Language;
}): Promise<Document> {
	return client.fetch<Document>(
		query({
			schemaType,
			slug,
			language,
			firstOnly: true,
		})
	);
}

export async function getTranslatedDocument(
	_id: string
): Promise<Translated<Document>> {
	const data = await client.fetch<TranslatedDocument>(translationQuery(_id));
	return toTranslated<Document>(data._translations);
}
