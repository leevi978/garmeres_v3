import PortableText from "@/app/components/sanity/portable-text";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import imageUrlBuilder from "@sanity/image-url";
import { SanityReference } from "next-sanity";
import Featured from "@/app/components/featured";
import { PageDocument } from "@/types/sanity-types";
import { HeaderMargin } from "@/app/components/layout/header";
import PageTextContainer from "@/app/components/layout/page-text-contianer";

const imgUrlBuilder = imageUrlBuilder(client);

function urlForImage(image: { _key: string; asset: SanityReference }) {
  return imgUrlBuilder.image(image);
}

export default function Component({ document }: { document: PageDocument }) {
  return (
    <div className="flex flex-col h-full flex-grow">
      {document?.backgroundImage ? (
        <Image
          className="absolute top-0 left-0 right-0 min-w-full min-h-screen max-h-screen object-cover -z-10"
          src={urlForImage(document.backgroundImage).withOptions({}).url()}
          alt=""
          width={1200}
          height={1200}
          quality={90}
        />
      ) : null}
      {document?.featured ? (
        <Featured {...document.featured} />
      ) : (
        <HeaderMargin />
      )}
      {document?.body ? (
        <PageTextContainer>
          <PortableText value={document.body} />
        </PageTextContainer>
      ) : null}
    </div>
  );
}
