import { Language } from "@/types/language";
import { BlogPostDocument } from "@/types/sanity-types";

export default function BlogPostCard({
  blogPost,
  language,
}: {
  blogPost: BlogPostDocument;
  language: Language;
}) {
  return <span>{blogPost.title}</span>;
}
