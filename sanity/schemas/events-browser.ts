import { defineType } from 'sanity';
import EventsBrowserPreview from '../components/events-browser/preview';

export default defineType({
	name: 'events-browser',
	title: 'Events browser',
	type: 'object',
	components: {
		preview: EventsBrowserPreview,
	},
	fields: [
		{
			name: 'language',
			type: 'string',
			options: {
				list: [
					{ title: 'English', value: 'en' },
					{ title: 'Davvisámegiella', value: 'se' },
				],
				layout: 'radio',
			},
			validation: (rule) => rule.required(),
			initialValue: 'en',
		},
	],
});
