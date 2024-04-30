import imageUrlBuilder from "@sanity/image-url";
import { client } from "@/sanity/lib/client";
import { SanityReference } from "next-sanity";

const imgUrlBuilder = imageUrlBuilder(client);

export function urlForImage(image: { _key: string; asset: SanityReference }) {
  return imgUrlBuilder.image(image);
}
