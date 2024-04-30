import {
  Language,
  Translatable,
  Translated,
  toTranslated,
  languages,
} from "@/types/language";
import {
  BlogPostDocument,
  PageDocument,
  PortableImage,
  Slug,
} from "@/types/sanity-types";
import { imageSearch, portableTextSummary } from "../utils/portable-text-utils";
import { Document } from "@/types/sanity-types";
import { Metadata } from "next";
import {
  getAllSiteMetadata,
  getTranslatedDocument,
  urlForImage,
} from "@/services/sanity-service";
import { AlternateURLs } from "next/dist/lib/metadata/types/alternative-urls-types";

type MetadataImage = {
  url: string | URL;
  secureUrl?: string | URL;
  alt?: string;
  type?: string;
  width?: string | number;
  height?: string | number;
};

function getOgImage(image: PortableImage): MetadataImage {
  const sanityImage = urlForImage(image).maxWidth(256).maxHeight(256);
  const url = sanityImage.url();
  return {
    url,
    secureUrl: url,
    alt: image.alt,
    height: sanityImage.options.height,
    width: sanityImage.options.width,
  };
}

export const siteUrl = getAllSiteMetadata().then(
  (siteMetadatas) => siteMetadatas[0].siteUrl
);

const translatedSiteMetadata: Promise<Translated<Metadata>> =
  getAllSiteMetadata().then((siteMetadatas) => {
    return toTranslated(
      siteMetadatas.map((siteMetadata) => {
        const { siteTitle: title, siteDescription: description } = siteMetadata;
        const result: Translatable<Metadata> = {
          generator: "Next.js",
          language: siteMetadata.language,
          title,
          description,
          creator: siteMetadata.siteCreator,
          publisher: siteMetadata.sitePublisher,
          metadataBase: new URL(siteMetadata.siteUrl),
          alternates: {
            canonical: `/${siteMetadata.language}`,
            languages: Object.fromEntries(
              languages.map((lang) => {
                return [lang, `/${lang}`];
              })
            ),
          },
          openGraph: {
            title,
            description,
            type: "website",
            images: [
              {
                url: siteMetadata.imageUrl,
                alt: siteMetadata.siteThumbnail.alt,
              },
            ],
            siteName: siteMetadata.siteTitle,
            url: `${siteMetadata.siteUrl}/${siteMetadata.language}`,
            emails: "",
          },
          twitter: {
            title,
            description,
            images: [
              {
                url: siteMetadata.imageUrl,
                alt: siteMetadata.siteThumbnail.alt,
              },
            ],
          },
          keywords: siteMetadata.keywords,
          referrer: "origin-when-cross-origin",
          verification: {
            google: siteMetadata.googleSiteVerification,
          },
          robots: {
            index: false,
            follow: true,
            nocache: true,
            noarchive: true,
            nositelinkssearchbox: true,
            googleBot: {
              index: false,
              follow: true,
              nocache: true,
              noarchive: true,
              nositelinkssearchbox: true,
            },
          },
          icons: {
            icon: "/garmeres-logo-small.png",
          },
        };
        return result;
      })
    );
  });

async function getSiteMetadata(language: Language): Promise<Metadata> {
  return (await translatedSiteMetadata)[language];
}

async function getCanonical(document: Document): Promise<string> {
  const tsmd = await translatedSiteMetadata;
  return `${tsmd[document.language].alternates?.canonical}${
    document._type === "blog" ? "/blog" : ""
  }/${
    typeof document.slug === "string"
      ? document.slug
      : (document.slug as Slug).current
  }`;
}

async function getAlternates(document: Document): Promise<AlternateURLs> {
  const translatedDocument = await getTranslatedDocument(document._id);
  const translatedLinks = await Promise.all(
    languages.map(
      (lang) =>
        new Promise<string[]>((resolve, reject) =>
          getCanonical(translatedDocument[lang]).then((url) =>
            resolve([lang, url])
          )
        )
    )
  );
  await Promise.all(Object.values(translatedLinks));
  return {
    canonical: await getCanonical(document),
    languages: Object.fromEntries(translatedLinks),
  };
}

async function createDocumentMetadata(document: Document): Promise<Metadata> {
  const siteMetadata = await getSiteMetadata(document.language);
  const title = `${document.title} | ${siteMetadata.title}`;

  const documentDescription = portableTextSummary(document.body, 200);
  const description =
    documentDescription.length > 0
      ? documentDescription
      : siteMetadata.description || "";

  const documentImages = imageSearch(document.body).flatMap(getOgImage);
  const images =
    documentImages.length > 0
      ? documentImages
      : siteMetadata.openGraph?.images || [];
  const alternates = await getAlternates(document);

  return {
    ...siteMetadata,
    title,
    description,
    alternates,
    openGraph: {
      title,
      description,
      images,
    },
    twitter: {
      title,
      description,
      images,
    },
    robots: {
      index: true,
      nocache: false,
      noarchive: false,
      googleBot: {
        index: true,
        nocache: false,
        noarchive: false,
      },
    },
  };
}

export async function createPageMetadata(
  document: PageDocument
): Promise<Metadata> {
  const documentMetadata = await createDocumentMetadata(document);
  let images: MetadataImage[] = document.backgroundImage
    ? [getOgImage(document.backgroundImage)]
    : (documentMetadata.openGraph?.images as MetadataImage[]) || [];
  return {
    ...documentMetadata,
    openGraph: {
      ...documentMetadata.openGraph,
      images,
    },
    twitter: {
      ...documentMetadata.twitter,
      images,
    },
  };
}

export async function createBlogPostMetadata(
  document: BlogPostDocument
): Promise<Metadata> {
  const documentMetadata = await createDocumentMetadata(document);
  let images: MetadataImage[] = document.thumbnail
    ? [getOgImage(document.thumbnail)]
    : (documentMetadata.openGraph?.images as MetadataImage[]) || [];
  return {
    ...documentMetadata,
    openGraph: {
      ...documentMetadata.openGraph,
      images,
    },
    twitter: {
      ...documentMetadata.twitter,
      images,
    },
  };
}
