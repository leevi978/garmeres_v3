import Image from "next/image";
import { client } from "@/sanity/lib/client";
import imageUrlBuilder from "@sanity/image-url";
import { SanityReference } from "next-sanity";

const imgUrlBuilder = imageUrlBuilder(client);

export type PortableImageProps = {
    _key: string;
    asset: SanityReference;
    alt: string;
};

function urlForImage(image: PortableImageProps) {
    return imgUrlBuilder.image(image);
}

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
