import { Language } from '@/types/language';
import { BlogPostDocument } from '@/types/sanity-types';
import Image from 'next/image';
import { client } from '@/sanity/lib/client';
import imageUrlBuilder from '@sanity/image-url';
import { PortableImageProps } from '../portable-image';
import { PortableTextBlock } from 'sanity';
import Link from 'next/link';
import { getDateString } from '@/utils/date-utils';

export default function BlogPostCard({
	blogPost,
	language,
}: {
	blogPost: BlogPostDocument;
	language: Language;
}) {
	const imgUrlBuilder = imageUrlBuilder(client);

	function urlForImage(image: PortableImageProps) {
		return imgUrlBuilder.image(image);
	}
	const { title, thumbnail, body, slug, _createdAt } = blogPost;

	const date = new Date(_createdAt);

	return (
		<Link
			href={blogPostHref((slug as any).current, language)}
			className='flex flex-col justify-between items-center w-[340px] mx-auto gap-4'
		>
			<Image
				src={
					thumbnail
						? urlForImage(thumbnail).width(600).url()
						: '/garmeres-logo-small.png'
				}
				alt={thumbnail?.alt || ''}
				width={340}
				height={340}
				quality={70}
				className='w-[340px] h-[340px] object-cover'
			/>
			<div className='flex flex-col gap-4'>
				<h3>{title}</h3>
				<p>{getDateString(_createdAt)}</p>
				<p>{portableTextSummary(body, 150)}</p>
			</div>
		</Link>
	);
}

function toPlainText(blocks: any[]): string {
	return blocks
		.map((block) => {
			if (block._type !== 'block' || !block.children) {
				return '';
			}
			return block.children.map((child: any) => child.text).join('');
		})
		.join('\n\n');
}

function portableTextSummary(
	portableText: PortableTextBlock[],
	maxLength: number
) {
	let res = toPlainText(portableText);
	return res.length > maxLength ? `${res.slice(0, maxLength - 3)}...` : res;
}

function blogPostHref(slug: string, language: Language) {
	return `/${language}/blog/${slug}`;
}
