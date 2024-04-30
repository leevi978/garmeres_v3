import Image from "next/image";
import { SanityReference } from "next-sanity";
import { urlForImage } from "@/sanity/lib/image";

export type PortableImageProps = {
  _key: string;
  asset: SanityReference;
  alt: string;
};

export default function PortableImage({
  value,
}: {
  value: PortableImageProps;
}) {
  return (
    <Image
      src={urlForImage(value).width(600).url()}
      alt={value.alt}
      width={600}
      height={600}
      quality={70}
      className="py-6"
    />
  );
}
