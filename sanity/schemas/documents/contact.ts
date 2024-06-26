import { defineField, defineType } from 'sanity';
import { IBAN, SWIFT } from '@/types/regex';

export default defineType({
	name: 'contact',
	title: 'Contact',
	type: 'document',
	preview: {
		prepare: () => ({
			title: 'Contact information',
		}),
	},
	groups: [
		{
			name: 'general',
			title: 'General',
		},
		{
			name: 'bank',
			title: 'Bank',
		},
		{
			name: 'social',
			title: 'Social media',
		},
	],
	fields: [
		defineField({
			name: 'email',
			title: 'E-mail',
			type: 'string',
			group: 'general',
			validation: (rule) => rule.required().email(),
		}),
		defineField({
			name: 'orgNumber',
			title: 'Organisation number',
			type: 'string',
			group: 'general',
			validation: (rule) =>
				rule
					.required()
					.length(9)
					.custom((value: string | undefined | {}) => {
						if (value && typeof value === 'string' && /^[0-9]*$/.test(value))
							return true;
						return 'Organisation number can only contain digits';
					}),
		}),
		defineField({
			name: 'address',
			title: 'Address',
			type: 'text',
			group: 'general',
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: 'vipps',
			title: 'Vipps number',
			type: 'string',
			group: 'bank',
			validation: (rule) =>
				rule
					.required()
					.length(6)
					.custom((value: string | undefined | {}) => {
						if (value && typeof value === 'string' && /^[0-9]*$/.test(value))
							return true;
						return 'Vipps number can only contain digits';
					}),
		}),
		defineField({
			name: 'bankAccount',
			title: 'Bank account number',
			type: 'string',
			group: 'bank',
			validation: (rule) =>
				rule
					.required()
					.length(11)
					.custom((value: string | undefined | {}) => {
						if (value && typeof value === 'string' && /^[0-9]*$/.test(value))
							return true;
						return 'Account number can only contain digits';
					}),
		}),
		defineField({
			name: 'iban',
			title: 'IBAN',
			type: 'string',
			group: 'bank',
			validation: (rule) =>
				rule.required().custom((value: string | undefined | {}) => {
					if (value && typeof value === 'string' && IBAN.test(value))
						return true;
					return 'Invalid IBAN';
				}),
		}),
		defineField({
			name: 'swift',
			title: 'SWIFT',
			type: 'string',
			group: 'bank',
			validation: (rule) =>
				rule.required().custom((value: string | undefined | {}) => {
					if (value && typeof value === 'string' && SWIFT.test(value))
						return true;
					return 'Invalid SWIFT';
				}),
		}),
		defineField({
			name: 'facebook',
			title: 'Facebook',
			type: 'url',
			group: 'social',
		}),
		defineField({
			name: 'instagram',
			title: 'Instagram',
			type: 'url',
			group: 'social',
		}),
	],
});
