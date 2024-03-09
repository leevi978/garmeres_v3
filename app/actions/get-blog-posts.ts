'use server';
import { getBlogPosts as getData } from '@/services/sanity-service';
import { Language } from '@/types/language';

export async function getBlogPosts({
	page,
	perPage,
	language,
}: {
	page: number;
	perPage: number;
	language: string;
}) {
	return getData({
		page,
		perPage,
		language: language as Language,
	});
}
