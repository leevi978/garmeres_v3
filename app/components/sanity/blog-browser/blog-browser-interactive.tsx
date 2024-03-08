"use client";
import { Language } from "@/types/language";
import { BlogPostDocument } from "@/types/sanity-types";
import { useEffect, useState } from "react";
import BlogPostCard from "./blog-post-card";
import { Button } from "react-aria-components";
import { getBlogPosts } from "@/services/sanity-service";

export default function BlogBrowserInteractive({
  language,
  perPage,
  initialHasMore,
  initialBlogPosts,
}: {
  language: Language;
  perPage: number;
  initialHasMore: boolean;
  initialBlogPosts: BlogPostDocument[];
}) {
  const [blogPosts, setBlogPosts] = useState(initialBlogPosts);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(initialHasMore);

  useEffect(() => {
    if (page > 1) {
      setLoading(true);
      getBlogPosts({
        language,
        perPage,
        page,
      })
        .then((res) => {
          setBlogPosts(blogPosts.concat(res.blogPosts));
          setHasMore(res.hasMore);
        })
        .finally(() => setLoading(false));
    }
  }, [page]);

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <div className="grid grid-cols-2 gap-16 w-full">
        {blogPosts.map((blogPost) => (
          <BlogPostCard
            key={blogPost._id}
            blogPost={blogPost}
            language={language}
          />
        ))}
      </div>
      {hasMore ? (
        <Button onPress={() => setPage(page + 1)}>Get more...</Button>
      ) : null}
    </div>
  );
}
