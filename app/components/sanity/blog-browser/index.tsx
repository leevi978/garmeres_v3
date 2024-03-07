import { getBlogPosts } from "@/services/sanity-service";
import { Language } from "@/types/language";
import BlogBrowserInteractive from "./blog-browser-interactive";

const perPage = 6;

export default async function BlogBrowser({
  language,
}: {
  language: Language;
}) {
  const { blogPosts, hasMore } = await getBlogPosts({
    language,
    perPage,
    page: 1,
  });
  return (
    <BlogBrowserInteractive
      language={language}
      perPage={6}
      initialBlogPosts={blogPosts}
      initialHasMore={hasMore}
    />
  );
}
