import { MarkerIcon } from "@sanity/icons";

export default {
	name: 'city',
	type: 'document',
	icon: MarkerIcon,
	fieldsets: [

	],
	fields: [
		{
			name: 'title',
			type: 'string',
			validation: Rule => Rule.required(),
		},
		{
			name: 'slug',
			type: 'slug',
			validation: Rule => Rule.required(),
			options: {
				source: 'title',
				maxLength: 96,
			},
		},
	],
}