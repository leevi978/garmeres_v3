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
    <div className="flex flex-col mx-auto my-8 gap-4">
      <Image
        src={urlForImage(props).withOptions({}).url()}
        alt={props.alt}
        width={380}
        height={380}
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
  console.log(document);
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
