import {
    LocalAsset,
    StoryblokAsset,
    StoryblokBlogPost,
    StoryblokLang,
} from 'src/types/common';
import { apiPlugin, storyblokInit } from '@storyblok/js';
import { RichtextStoryblok } from 'src/types/storyblok';
import { fetchAsset } from '../utils';

const { storyblokApi: Storyblok } = storyblokInit({
    accessToken: process.env.STORYBLOK_TOKEN,
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
                    .map((doc) => Storyblok.richTextResolver.render(doc.text))
                    .join('\n\n'),
            },
        };
    });
}

export async function getTranslatedBlogPosts() {
    const enStories = await getBlogPosts();
    const smeStories = await getBlogPosts('sme');
    const enMap = Object.fromEntries(
        enStories.map((story) => [story.id, story])
    );
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

function getBlokAssets(blok: RichtextStoryblok): StoryblokAsset[] {
    return (
        blok.type === 'image'
            ? [
                  {
                      src: blok.attrs.src || '',
                      alt: blok.attrs.alt || '',
                      title: blok.attrs.title || '',
                      copyright: blok.attrs.copyright || '',
                  },
              ]
            : []
    ).concat(blok.content ? blok.content.flatMap(getBlokAssets) : []);
}

function getBlogPostAssets(story: StoryblokBlogPost): StoryblokAsset[] {
    return (story.content.body || [])
        .map((richText) => richText.text || [])
        .flatMap(getBlokAssets);
}

export function getAllBlogPostAssets(
    translatedStories: {
        default: StoryblokBlogPost;
        sme: StoryblokBlogPost;
    }[]
): StoryblokAsset[] {
    const assetMap = Object.fromEntries(
        translatedStories
            .flatMap((ts) =>
                Object.keys(ts).map((l) => ts[l] as StoryblokBlogPost)
            )
            .flatMap(getBlogPostAssets)
            .map((a) => [a.src, a])
    );
    return Object.keys(assetMap).map((k) => assetMap[k]);
}

export async function fetchStoryblokAssets(assets: StoryblokAsset[]) {
    return Promise.all(
        assets.map(
            (asset) =>
                new Promise<LocalAsset>(async (resolve, reject) => {
                    fetchAsset(
                        asset.src,
                        `assets/${asset.src.split('.com/f/').at(-1)}`
                    )
                        .then((filename) => {
                            resolve({ filename, storyblokAsset: asset });
                        })
                        .catch(reject);
                })
        )
    );
}
