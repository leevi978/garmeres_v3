import { SanityDocument } from "next-sanity";
import { Language } from "./language";
import { PortableTextBlock } from "sanity";
import { SanityReference } from "next-sanity";
import { PortableImageProps } from "@/app/components/sanity/portable-image";

export type Document = SanityDocument & {
  language: Language;
  slug: string;
  body: PortableTextBlock[];
  title: string;
};

export type TranslatedDocument = SanityDocument & {
  _translations: Document[];
};

export type PageDocument = Document & {
  featured: Featured;
  backgroundImage: PortableImage;
  _type: "page";
};

export type PortableImage = {
  _key: string;
  alt: string;
  asset: SanityReference;
  attribution?: string;
  title?: string;
  caption?: string;
};

export type ResolvableType = "page" | "blog-post";

export type Slug = {
  current: string;
  _type: "slug";
};

export type ResolvableLink = {
  language: Language;
  slug: Slug;
  _type: ResolvableType;
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
