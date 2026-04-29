import { InfoOutlineIcon, TextIcon, LinkIcon, BinaryDocumentIcon } from "@sanity/icons";
import wysiwyg from "./fields/wysiwyg";

export default {
	name: 'about',
	type: 'document',
	icon: InfoOutlineIcon,
	groups: [
		{name: 'Logo'},
		{name: 'About'},
		{name: 'Clients'},
		{name: 'Exhibitions'},
		{name: 'Prizes'},
		{name: 'Publications'},
	],
	fields: [
		{
			name: 'title',
			type: 'string',
			hidden: true,
			validation: Rule => Rule.required(),
			group: 'About',
		},
		{
			name: 'logo',
			type: 'file',
			group: 'Logo',
		},
		wysiwyg("content", 'About'),
		{
			name: 'email',
			type: 'string',
			group: 'About',
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
			],
			group: 'About',
		},
		{
			name: 'clients',
			type: 'array',
			of: [{
				type: 'reference',
				to: [{ type: 'client' }],
			}],
			group: 'Clients',
		},
		wysiwyg("exhibitions", 'Exhibitions'),
		wysiwyg("prizes", 'Prizes'),
		{
			name: 'publications',
			type: 'array',
			of: [
				{
					type: 'object',
					name: 'publication',
					fields: [
						{
							name: 'title',
							type: 'string',
							validation: Rule => Rule.required()
						},
						{
							name: 'href',
							type: 'url',
						},
						{
							name: 'pdf',
							type: 'file',
							options: {
								accept: '.pdf'
							},
						},
					],
					preview: {
						select: {
							title: 'title',
							href: 'href',
							pdf: 'pdf'
						},
						prepare({ title, href, pdf }) {
							let selectedIcon = TextIcon;
							if (pdf) selectedIcon = BinaryDocumentIcon;
							else if (href) selectedIcon = LinkIcon;

							return {
								title: title,
								subtitle: pdf ? 'PDF Document' : (href || 'Text only'),
								media: selectedIcon
							}
						}
					}
				},
			],
			group: 'Publications',
		},
	],
}