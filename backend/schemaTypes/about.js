import { InfoOutlineIcon } from "@sanity/icons";
import wysiwyg from "./fields/wysiwyg";

export default {
	name: 'about',
	type: 'document',
	icon: InfoOutlineIcon,
	fieldsets: [

	],
	fields: [
		{
			name: 'title',
			type: 'string',
			hidden: true,
			validation: Rule => Rule.required(),
		},
		wysiwyg("content"),
		{
			name: 'email',
			type: 'string'
		},
		{
			name: 'instagram',
			type: "object",
			options: { columns: 2 },
			fields: [
				{
					name: 'instagramHandle',
					title: 'Handle',
					type: 'string',
				},
				{
					name: 'instagramHref',
					title: 'Href',
					type: 'url',
				},
			]
		},
		{
			name: 'selectedClients',
			type: 'array',
			of: [{
				type: 'reference',
				to: [{ type: 'client' }],
			}],
		},
		wysiwyg("exhibitions"),
		wysiwyg("prizes"),
		wysiwyg("pubblications"),
	],
}