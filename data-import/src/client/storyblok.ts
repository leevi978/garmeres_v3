import { StoryblokBlogPost, StoryblokLang } from 'src/types/common';
import { apiPlugin, storyblokInit } from '@storyblok/js';
import { RichTextStoryblok } from 'src/types/storyblok';

const token = process.env.STORYBLOK_TOKEN;

const { storyblokApi: Storyblok } = storyblokInit({
	accessToken: token,
	use: [apiPlugin],
});

async function getBlogPosts(
	lang?: StoryblokLang
): Promise<StoryblokBlogPost[]> {
	const stories = (await Storyblok.getAll('cdn/stories', {
		content_type: 'blog-post',
		sort_by: 'created_at',
		language: lang,
	})) as StoryblokBlogPost[];
	return stories.map((story) => {
		return {
			...story,
			content: {
				...story.content,
				bodyHtml: story.content.body
					?.map(transformBlok)
					.map((doc) => Storyblok.richTextResolver.render(doc.text))
					.join('\n\n'),
			},
		};
	});
}

export async function getTranslatedBlogPosts() {
	const enStories = await getBlogPosts();
	const smeStories = await getBlogPosts('sme');
	const enMap = Object.fromEntries(enStories.map((story) => [story.id, story]));
	const smeMap = Object.fromEntries(
		smeStories.map((story) => [story.id, story])
	);
	return Object.keys(enMap).map((id) => {
		return {
			default: enMap[id],
			sme: smeMap[id],
		};
	});
}

function transformBlok(blok: RichTextStoryblok): RichTextStoryblok {
	if (blok.component === 'rich_text')
		return {
			...blok,
			text: transformBlok(blok.text as any),
		} as any;
	else if (blok.type === 'image') {
		return {
			...blok,
			attrs: {
				...blok.attrs,
				title: `${[blok.attrs.title, blok.attrs.copyright]
					.filter((s) => s?.length > 0)
					.join(' - ')}`,
			},
		};
	} else if (blok.content)
		return {
			...blok,
			content: blok.content.map(transformBlok),
		};
	else return blok;
}
