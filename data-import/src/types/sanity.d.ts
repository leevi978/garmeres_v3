export type SanityLang = 'en' | 'se';

export type SanityBlogPost = {
    _id?: string;
    _type: 'blog-post';
    title: string;
    slug: SanitySlug;
    thumbnail?: SanityPortableImage;
    body: SanityPortableText;
    language: 'en' | 'se';
};

export type SanityPortableText = (SanityBlock | SanityPortableImage)[];

export type SanityBlock = {
    _type: string;
    children: any[];
    style: string;
    markDefs: any[];
};

export type SanitySlug = {
    _type: 'slug';
    current: string;
};

export type SanityPortableImage = {
    _type: 'portable-image';
    _sanityAsset: string;
    alt: string;
    attribution?: string;
    title?: string;
    caption?: string;
};

export type SanityTranslationMetadata = {
    _type: 'translation.metadata';
    schemaTypes: 'blog-post'[];
    translations: {
        value: {
            _ref: string;
            _type: 'reference';
        };
        _type: 'internationalizedArrayReferenceValue';
        _key: 'en' | 'se';
    }[];
};
