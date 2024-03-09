import { defineField, defineType } from 'sanity';

export default defineType({
	name: 'call-to-action',
	title: 'Call to action',
	type: 'object',
	fields: [
		defineField({
			name: 'title',
			title: 'Title',
			type: 'string',
		}),
		{
			name: 'link',
			title: 'Link',
			type: 'reference',
			to: [{ type: 'page' }, { type: 'blog-post' }],
		},
	],
});
