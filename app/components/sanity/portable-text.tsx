import {
	PortableText as SanityPortableText,
	PortableTextComponents,
	PortableTextTypeComponentProps,
} from '@portabletext/react';
import PortableImage, { PortableImageProps } from './portable-image';
import { PortableTextBlock } from 'sanity';
import BlogBrowser from './blog-browser';
import { Language } from '@/types/language';

export default function PortableText({
	value,
	disableImages,
}: {
	value: PortableTextBlock[];
	disableImages?: boolean;
}) {
	const components: PortableTextComponents = {
		types: {
			'portable-image': ({ value }: { value: PortableImageProps }) => {
				return disableImages === true ? null : <PortableImage value={value} />;
			},
			'blog-browser': (
				props: PortableTextTypeComponentProps<{ language: Language }>
			) => {
				return <BlogBrowser {...props.value} />;
			},
		},
		list: {
			bullet: ({ children }) => (
				<ul className='list-disc list-inside'>{children}</ul>
			),
			number: ({ children }) => (
				<ol className='list-decimal list-inside'>{children}</ol>
			),
		},
	};
	return (
		<SanityPortableText
			value={value}
			components={components}
		/>
	);
}
