import { htmlToBlocks } from '@sanity/block-tools';
import { StoryblokBlogPost, UploadedAsset } from './types/common';
import {
    SanityBlogPost,
    SanityLang,
    SanityPortableImage,
    SanityPortableText,
    SanitySlug,
    SanityTranslationMetadata,
} from './types/sanity';
import { Schema } from '@sanity/schema';
import { readJsonFile } from './utils';

export function transformTranslatedBlogPost(translatedStory: {
    default: StoryblokBlogPost;
    sme: StoryblokBlogPost;
}) {
    let documents: (SanityBlogPost | SanityTranslationMetadata)[] = Object.keys(
        translatedStory
    ).map((sbLang) => {
        const story: StoryblokBlogPost = translatedStory[sbLang];
        return transformBlogPost(story);
    });
    return documents.concat([
        {
            _type: 'translation.metadata',
            schemaTypes: ['blog-post'],
            translations: documents.map((document) => {
                const doc = document as SanityBlogPost;
                return {
                    _key: doc.language,
                    _type: 'internationalizedArrayReferenceValue',
                    value: {
                        _type: 'reference',
                        _ref: doc._id,
                    },
                };
            }),
        },
    ]);
}

function transformBlogPost(story: StoryblokBlogPost): SanityBlogPost {
    return {
        _id: transformId(story),
        _type: 'blog-post',
        language: transformLang(story),
        slug: transformSlug(story),
        title: transformTitle(story),
        thumbnail: transformThumbnail(story),
        body: transformBody(story),
        _createdAt: story.first_published_at,
        _updatedAt: story.published_at,
    };
}

function transformLang(story: StoryblokBlogPost) {
    return {
        default: 'en',
        sme: 'se',
    }[story.lang] as SanityLang;
}

function transformId(story: StoryblokBlogPost) {
    return `blog-post-sb-${story.id}-${transformLang(story)}`;
}

function transformSlug(story: StoryblokBlogPost): SanitySlug {
    return {
        _type: 'slug',
        current: story.full_slug.split('/').at(-1),
    };
}

function transformTitle(story: StoryblokBlogPost) {
    return story.lang === 'default'
        ? story.name
        : story.translated_slugs.find((s) => s.lang === story.lang)?.name;
}

function transformThumbnail(
    story: StoryblokBlogPost
): SanityPortableImage | undefined {
    if (
        story.content.thumbnail?.filename == null ||
        story.content.thumbnail?.filename == ''
    ) {
        return undefined;
    }
    return {
        _type: 'portable-image',
        _sanityAsset: `image@${story.content.thumbnail.filename}`,
        alt: story.content.thumbnail.alt,
        attribution: '',
        caption: '',
        title: story.content.thumbnail.title,
    };
}

const defaultSchema = Schema.compile({
    name: 'myBlog',
    types: [
        {
            type: 'image',
            name: 'portable-image',
            fields: [
                {
                    name: 'alt',
                    type: 'string',
                },
                {
                    name: 'attribution',
                    type: 'string',
                },
                {
                    name: 'title',
                    type: 'string',
                },
                {
                    name: 'caption',
                    type: 'string',
                },
            ],
        },
        {
            type: 'object',
            name: 'blog-post',
            fields: [
                {
                    title: 'Body',
                    name: 'body',
                    type: 'array',
                    of: [
                        { type: 'block' },
                        {
                            type: 'image',
                            fields: [
                                {
                                    name: 'alt',
                                    type: 'string',
                                },
                                {
                                    name: 'attribution',
                                    type: 'string',
                                },
                                {
                                    name: 'title',
                                    type: 'string',
                                },
                                {
                                    name: 'caption',
                                    type: 'string',
                                },
                            ],
                        },
                    ],
                },
            ],
        },
    ],
});

const blockContentType = defaultSchema
    .get('blog-post')
    .fields.find((field: any) => field.name === 'body').type;

export function findSanityPortableImage(storyblokImgUrl: string) {
    const uaMap = readJsonFile('./data/uploaded-assets-map.json') as {
        [k: string]: UploadedAsset;
    };
    return uaMap[storyblokImgUrl]?.sanityAssetDocument._id || undefined;
}

const { JSDOM } = require('jsdom');
function transformBody(story: StoryblokBlogPost) {
    return htmlToBlocks(story.content.bodyHtml, blockContentType, {
        parseHtml: (html: string) => new JSDOM(html).window.document,
        rules: [
            {
                deserialize(el: any, next, block) {
                    if (el.tagName?.toLowerCase() != 'img') return undefined;
                    return block({
                        _type: 'portable-image',
                        asset: {
                            _type: 'reference',
                            _ref: findSanityPortableImage(el.src),
                        },
                        alt: el.alt,
                        title: el.title,
                    });
                },
            },
        ],
    }) as SanityPortableText;
}

export function uploadedAssetMap(uploadedAssets: UploadedAsset[]) {
    return Object.fromEntries(
        uploadedAssets.map((ua) => [ua.storyblokAsset.src, ua])
    );
}
