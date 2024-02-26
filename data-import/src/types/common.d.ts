import { StoryblokStory } from 'storyblok-generate-ts';
import { BlogPostStoryblok } from './storyblok';
import { SanityAssetDocument } from '@sanity/client';

export type StoryblokBlogPost = StoryblokStory<
    BlogPostStoryblok & { bodyHtml?: string }
> & { lang: StoryblokLang };
export type StoryblokLang = 'default' | 'sme' | 'no';

export type StoryblokAsset = {
    src: string;
    alt: string;
    copyright: string;
    title: string;
};

export type LocalAsset = {
    filename: string;
    storyblokAsset: StoryblokAsset;
};

export type UploadedAsset = {
    filename: string;
    storyblokAsset: StoryblokAsset;
    sanityAssetDocument: SanityAssetDocument;
};
