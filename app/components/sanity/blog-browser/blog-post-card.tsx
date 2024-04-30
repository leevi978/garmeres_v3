import { Language } from "@/types/language";
import { BlogPostDocument } from "@/types/sanity-types";
import Image from "next/image";
import Link from "next/link";
import { getDateString } from "@/utils/date-utils";
import { portableTextSummary } from "@/utils/portable-text-utils";
import { urlForImage } from "@/sanity/lib/image";

export default function BlogPostCard({
  blogPost,
  language,
}: {
  blogPost: BlogPostDocument;
  language: Language;
}) {
  const { title, thumbnail, body, slug, _createdAt } = blogPost;

  return (
    <Link
      href={blogPostHref((slug as any).current, language)}
      className="no-prose text-black flex flex-col justify-start items-center w-full max-w-[340px] mx-auto gap-6 no-underline"
    >
      <Image
        src={
          thumbnail
            ? urlForImage(thumbnail).width(600).url()
            : "/garmeres-logo-small.png"
        }
        alt={thumbnail?.alt || ""}
        width={340}
        height={340}
        quality={70}
        className="w-[340px] h-[340px] object-cover"
      />
      <div className="flex flex-col flex-grow gap-4">
        <h3 className="!leading-7">{title}</h3>
        <p className="!leading-7">{getDateString(_createdAt)}</p>
        <p className="!leading-7">{portableTextSummary(body, 150)}</p>
      </div>
    </Link>
  );
}

function blogPostHref(slug: string, language: Language) {
  return `/${language}/blog/${slug}`;
}
