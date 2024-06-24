import { SanityDocument } from "next-sanity";
import { Language } from "./language";
import { PortableTextBlock } from "sanity";
import { SanityReference } from "next-sanity";

export type SanityTag = "*";

export type SiteMetadataDocument = SanityDocument & {
  siteTitle: string;
  siteUrl: string;
  siteDescription: string;
  siteThumbnail: PortableImage;
  googleSiteVerification: string;
  language: Language;
  imageUrl: string;
  siteCreator?: string;
  sitePublisher?: string;
};

export type Document = SanityDocument & {
  language: Language;
  slug: string | Slug;
  body: PortableTextBlock[];
  title: string;
  _type: "page" | "blog-post";
};

export type TranslatedDocument<T extends Document> = T & {
  _translations: T[];
};

export type PageDocument = Document & {
  featured: Featured;
  backgroundImage?: PortableImage;
  _type: "page";
};

export type BlogPostDocument = Document & {
  thumbnail: PortableImage;
  _type: "blog-post";
};

export type ContactDocument = Document & {
  address: string;
  bankAccount: string;
  email: string;
  facebook: string;
  iban: string;
  instagram: string;
  orgNumber: string;
  swift: string;
  vipps: string;
};

export type PortableImage = {
  _key: string;
  alt: string;
  asset: SanityReference;
  attribution?: string;
  title?: string;
  caption?: string;
};

export type Slug = {
  current: string;
  _type: "slug";
};

export type ResolvableLink = {
  language: Language;
  slug: Slug;
  _type: "page" | "blog-post";
};

export type MenuItem = {
  name: string;
  path: string;
  languageIcon?: boolean;
};

export type CallToAction = {
  _type: "call-to-action";
  title: string;
  link: ResolvableLink;
};

export type Featured = {
  _type: "featured";
  title: string;
  text: string;
  callToAction: CallToAction;
};
