import PortableText from "@/app/components/sanity/portable-text";
import PageTextContainer from "@/app/components/layout/page-text-contianer";
import { HeaderMargin } from "@/app/components/layout/header";
import { BlogPostDocument, PortableImage } from "@/types/sanity-types";
import Image from "next/image";
import { getDateString } from "@/utils/date-utils";
import { Translated } from "@/types/language";
import { urlForImage } from "@/services/sanity-service";

function BlogPostThumbnail(props: PortableImage) {
  return (
    <div className="not-prose items-center flex flex-col mx-auto gap-4 mb-16">
      <Image
        className="max-h-[420px] object-contain"
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
  const dateString = getDateString(document?._createdAt);
  return (
    <PageTextContainer>
      <HeaderMargin />
      {document?.thumbnail ? (
        <BlogPostThumbnail {...document.thumbnail} />
      ) : null}
      <div>
        <h1 className="!leading-3">{document?.title}</h1>
        <p
          aria-label={`${dateLabel[document.language || "en"]}: ${dateString}`}
          className="text-base text-gray-500"
        >
          - {dateString}
        </p>
      </div>
      <PortableText value={document?.body} />
    </PageTextContainer>
  );
}

const dateLabel: Translated<string> = {
  se: "Čállán",
  en: "Published",
};
