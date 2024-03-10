'use client';
import { Language } from '@/types/language';
import { BlogPostDocument } from '@/types/sanity-types';
import { useEffect, useState } from 'react';
import BlogPostCard from './blog-post-card';
import { Button } from 'react-aria-components';
import { getBlogPosts } from '@/app/actions/get-blog-posts';

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
		<div className='flex flex-col justify-center items-center w-full my-8'>
			<div className='grid grid-cols-2 gap-16 w-full'>
				{blogPosts.map((blogPost) => (
					<BlogPostCard
						key={blogPost._id}
						blogPost={blogPost}
						language={language}
					/>
				))}
			</div>
			{loading ? (
				<span>Loading...</span>
			) : hasMore ? (
				<Button onPress={() => setPage(page + 1)}>Get more...</Button>
			) : null}
		</div>
	);
}
