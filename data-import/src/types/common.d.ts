import { StoryblokStory } from 'storyblok-generate-ts';
import { BlogPostStoryblok } from './storyblok';

export type StoryblokBlogPost = StoryblokStory<
	BlogPostStoryblok & { bodyHtml?: string }
> & { lang: StoryblokLang };
export type StoryblokLang = 'default' | 'sme' | 'no';
