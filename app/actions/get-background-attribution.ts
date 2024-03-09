'use server';
import { getPageBySlug as getData } from '@/services/sanity-service';
import { Language } from '@/types/language';

export async function getPageBySlug({
	slug,
	language,
}: {
	slug: string;
	language: Language;
}) {
	return getData({
		slug,
		language,
	});
}
