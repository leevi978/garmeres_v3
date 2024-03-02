import PortableText from "@/app/components/sanity/portable-text";
import PageTextContainer from "@/app/components/layout/page-text-contianer";
import { HeaderMargin } from "@/app/components/layout/header";
import { BlogPostDocument, PortableImage } from "@/types/sanity-types";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import imageUrlBuilder from "@sanity/image-url";
import { SanityReference } from "next-sanity";

const imgUrlBuilder = imageUrlBuilder(client);

function urlForImage(image: { _key: string; asset: SanityReference }) {
  return imgUrlBuilder.image(image);
}

function BlogPostThumbnail(props: PortableImage) {
  return (
    <div className="flex flex-col mx-auto mb-8 gap-8">
      <Image
        className="max-h-[512px] object-contain"
        src={urlForImage(props)
          .withOptions({ maxHeight: 512, maxWidth: 720, auto: "format" })
          .url()}
        alt={props.alt}
        width={720}
        height={512}
        quality={70}
      />
      {props.attribution ? (
        <span className="items-center text-center">{props.attribution}</span>
      ) : null}
    </div>
  );
}

export default function Component({
  document,
}: {
  document: BlogPostDocument;
}) {
  return (
    <PageTextContainer>
      <HeaderMargin />
      {document?.thumbnail ? (
        <BlogPostThumbnail {...document.thumbnail} />
      ) : null}
      <h1>{document?.title}</h1>
      <PortableText value={document?.body} />
    </PageTextContainer>
  );
}
