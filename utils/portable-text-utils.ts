import { PortableImage } from "@/types/sanity-types";
import { PortableTextBlock } from "sanity";

export function portableToPlainText(blocks: any[]): string {
  return blocks
    .map((block) => {
      if (block._type !== "block" || !block.children) {
        return "";
      }
      return block.children.map((child: any) => child.text).join("");
    })
    .join("\n\n");
}

export function portableTextSummary(
  portableText: PortableTextBlock[],
  maxLength: number
) {
  let res = portableToPlainText(portableText);
  return res.length > maxLength ? `${res.slice(0, maxLength - 3)}...` : res;
}

export function imageSearch(
  portableText: PortableTextBlock[]
): PortableImage[] {
  return portableText.flatMap((block: PortableTextBlock) => {
    if (block._type === "portable-image") {
      return block as unknown as PortableImage;
    } else if (block.children) {
      return imageSearch(block.children as PortableTextBlock[]);
    } else return [];
  });
}
