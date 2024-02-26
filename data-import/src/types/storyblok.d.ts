export interface RichtextStoryblok {
    type: string;
    content?: RichtextStoryblok[];
    marks?: RichtextStoryblok[];
    attrs?: any;
    text?: string;
    [k: string]: any;
}

export type MultilinkStoryblok =
    | {
          id?: string;
          cached_url?: string;
          anchor?: string;
          linktype?: 'story';
          story?: {
              name: string;
              created_at?: string;
              published_at?: string;
              id: number;
              uuid: string;
              content?: {
                  [k: string]: any;
              };
              slug: string;
              full_slug: string;
              sort_by_date?: null | string;
              position?: number;
              tag_list?: string[];
              is_startpage?: boolean;
              parent_id?: null | number;
              meta_data?: null | {
                  [k: string]: any;
              };
              group_id?: string;
              first_published_at?: string;
              release_id?: null | number;
              lang?: string;
              path?: null | string;
              alternates?: any[];
              default_full_slug?: null | string;
              translated_slugs?: null | any[];
              [k: string]: any;
          };
          [k: string]: any;
      }
    | {
          url?: string;
          cached_url?: string;
          anchor?: string;
          linktype?: 'asset' | 'url';
          [k: string]: any;
      }
    | {
          email?: string;
          linktype?: 'email';
          [k: string]: any;
      };

export interface AssetStoryblok {
    alt?: string;
    copyright?: string;
    id: number;
    filename: string;
    name: string;
    title?: string;
    focus?: string;
    [k: string]: any;
}

export interface BlogBrowserStoryblok {
    background_opacity: string;
    card_background_opacity: string;
    source_path?: Exclude<
        MultilinkStoryblok,
        { linktype?: 'email' } | { linktype?: 'asset' }
    >;
    pagination: 'none' | 'numbered' | 'expandable';
    page_capacity: string;
    default_thumbnail?: AssetStoryblok;
    show_more_button_text: string;
    show_more_button_background_opacity: string;
    _uid: string;
    component: 'blog_browser';
    [k: string]: any;
}

export interface BlogPostStoryblok {
    author?: string;
    thumbnail?: AssetStoryblok;
    thumbnail_options?: any;
    body?: RichTextStoryblok[];
    object_fit: 'cover' | 'contain';
    _uid: string;
    component: 'blog-post';
    [k: string]: any;
}

export interface CallToActionStoryblok {
    opacity: string;
    text?: string;
    link?: Exclude<
        MultilinkStoryblok,
        { linktype?: 'email' } | { linktype?: 'asset' }
    >;
    _uid: string;
    component: 'call_to_action';
    [k: string]: any;
}

export interface CookieconsentStoryblok {
    text: string;
    accept_text: string;
    _uid: string;
    component: 'cookieconsent';
    [k: string]: any;
}

export interface CreatedByStoryblok {
    label?: string;
    _uid: string;
    component: 'created_by';
    [k: string]: any;
}

export interface CustomTextStoryblok {
    text?: string;
    _uid: string;
    component: 'custom_text';
    [k: string]: any;
}

export interface EventsBrowserStoryblok {
    title: string;
    no_events_label: string;
    _uid: string;
    component: 'events-browser';
    [k: string]: any;
}

export interface FeaturedStoryblok {
    object_fit?: 'cover' | 'contain';
    overlay_opacity: string;
    background_image?: AssetStoryblok;
    body?: (
        | FeaturedTitleStoryblok
        | FeaturedTextStoryblok
        | CallToActionStoryblok
        | EventsBrowserStoryblok
    )[];
    _uid: string;
    component: 'featured';
    [k: string]: any;
}

export interface FeaturedTextStoryblok {
    text: string;
    _uid: string;
    component: 'featured_text';
    [k: string]: any;
}

export interface FeaturedTitleStoryblok {
    text: string;
    _uid: string;
    component: 'featured_title';
    [k: string]: any;
}

export interface FooterStoryblok {
    body?: (
        | CustomTextStoryblok
        | LastPublishedStoryblok
        | CreatedByStoryblok
    )[];
    body_text: RichtextStoryblok;
    _uid: string;
    component: 'footer';
    [k: string]: any;
}

export interface GridStoryblok {
    title?: string;
    items: (RichTextStoryblok | PersonStoryblok)[];
    max_columns: string;
    _uid: string;
    component: 'grid';
    [k: string]: any;
}

export interface LanguageSelectorStoryblok {
    _uid: string;
    component: 'language_selector';
    [k: string]: any;
}

export interface LastPublishedStoryblok {
    label?: string;
    _uid: string;
    component: 'last_published';
    [k: string]: any;
}

export interface LogoImageStoryblok {
    image: AssetStoryblok;
    _uid: string;
    component: 'logo_image';
    [k: string]: any;
}

export interface PageLocationStoryblok {
    _uid: string;
    component: 'page_location';
    [k: string]: any;
}

export interface PageNotFoundStoryblok {
    body?: RichtextStoryblok;
    _uid: string;
    component: 'page_not_found';
    [k: string]: any;
}

export interface PersonStoryblok {
    name: string;
    title?: string;
    image?: AssetStoryblok;
    _uid: string;
    component: 'person';
    [k: string]: any;
}

export interface RichTextStoryblok {
    text?: RichtextStoryblok;
    _uid: string;
    component: 'rich_text';
    [k: string]: any;
}

export interface SeoStoryblok {
    seo?: {
        _uid?: string;
        title?: string;
        plugin?: string;
        og_image?: string;
        og_title?: string;
        description?: string;
        twitter_image?: string;
        twitter_title?: string;
        og_description?: string;
        twitter_description?: string;
        [k: string]: any;
    };
    _uid: string;
    component: 'seo';
    [k: string]: any;
}

export interface SettingsStoryblok {
    language_label: string;
    language_code: string;
    _uid: string;
    component: 'settings';
    [k: string]: any;
}

export interface SiteSeoStoryblok {
    site_url: string;
    seo?: {
        _uid?: string;
        title?: string;
        plugin?: string;
        og_image?: string;
        og_title?: string;
        description?: string;
        twitter_image?: string;
        twitter_title?: string;
        og_description?: string;
        twitter_description?: string;
        [k: string]: any;
    };
    _uid: string;
    component: 'site_seo';
    [k: string]: any;
}

export interface SocialStoryblok {
    facebook?: Exclude<
        MultilinkStoryblok,
        { linktype?: 'email' } | { linktype?: 'asset' }
    >;
    instagram?: Exclude<
        MultilinkStoryblok,
        { linktype?: 'email' } | { linktype?: 'asset' }
    >;
    items: SocialItemStoryblok[];
    _uid: string;
    component: 'social';
    [k: string]: any;
}

export interface SocialItemStoryblok {
    name: string;
    url: Exclude<
        MultilinkStoryblok,
        { linktype?: 'email' } | { linktype?: 'asset' }
    >;
    _uid: string;
    component: 'social-item';
    [k: string]: any;
}

export interface TranslationsStoryblok {
    title: string;
    description: string;
    no_description: string;
    time: string;
    date: string;
    location: string;
    language: string;
    image: string;
    news: string;
    hide_menu: string;
    show_menu: string;
    home: string;
    duration: string;
    second: string;
    seconds: string;
    minute: string;
    minutes: string;
    hour: string;
    hours: string;
    day: string;
    days: string;
    week: string;
    weeks: string;
    month: string;
    months: string;
    year: string;
    years: string;
    january: string;
    february: string;
    march: string;
    april: string;
    may: string;
    june: string;
    july: string;
    august: string;
    september: string;
    october: string;
    november: string;
    december: string;
    page: string;
    next_page: string;
    prev_page: string;
    last_updated: string;
    _uid: string;
    component: 'translations';
    [k: string]: any;
}
