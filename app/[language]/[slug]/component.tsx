import PortableText from "@/app/components/sanity/portable-text";
import Image from "next/image";
import Featured from "@/app/components/featured";
import { PageDocument } from "@/types/sanity-types";
import { HeaderMargin } from "@/app/components/layout/header";
import PageTextContainer from "@/app/components/layout/page-text-contianer";
import { urlForImage } from "@/services/sanity-service";

export default function Component({ document }: { document: PageDocument }) {
  return (
    <div className="flex flex-col h-full flex-grow">
      {document?.backgroundImage ? (
        <Image
          className="absolute top-0 left-0 right-0 w-screen h-screen min-w-screen max-w-screen min-h-screen max-h-screen object-cover -z-10"
          src={urlForImage(document.backgroundImage)
            .withOptions({
              quality: 70,
              maxWidth: 800,
              maxHeight: 800,
            })
            .url()}
          alt=""
          width={800}
          height={800}
          quality={70}
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
