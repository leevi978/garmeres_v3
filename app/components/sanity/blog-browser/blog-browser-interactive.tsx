"use client";
import { Language, Translated } from "@/types/language";
import { BlogPostDocument } from "@/types/sanity-types";
import { useEffect, useState } from "react";
import BlogPostCard from "./blog-post-card";
import { Button } from "react-aria-components";
import { getBlogPosts } from "@/app/actions/get-blog-posts";
import Spinner from "react-spinners/ClipLoader";

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
      getBlogPosts({ page, perPage, language })
        .then((res: any) => {
          setBlogPosts(blogPosts.concat(res.blogPosts));
          setHasMore(res.hasMore);
        })
        .finally(() => setLoading(false));
    }
  }, [page, perPage, language]);

  return (
    <div className="flex flex-col justify-center items-center w-full my-6 gap-y-32">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-32 w-full">
        {blogPosts.map((blogPost) => (
          <BlogPostCard
            key={blogPost._id}
            blogPost={blogPost}
            language={language}
          />
        ))}
      </div>
      {hasMore ? (
        <Button
          className="min-w-48 min-h-12 xl:min-h-14 max-h-12 xl:max-h-14 xl:text-lg px-8 xl:px-8 font-extralight rounded-full disabled:bg-slate-600 bg-slate-700 text-white text-center enabled:hover:bg-slate-600"
          onPress={() => setPage(page + 1)}
          isDisabled={loading}
        >
          {loading ? (
            <Spinner
              loading={loading}
              color={"white"}
              size={25}
              aria-label="Loading Spinner"
              data-testid="loader"
              className="my-auto border-2 border-red-500 align-middle"
            />
          ) : (
            "Get more..."
          )}
        </Button>
      ) : null}
    </div>
  );
}

const title: Translated<string> = {
  se: "Ođđasat",
  en: "Latest news",
};
