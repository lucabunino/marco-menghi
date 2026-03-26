import { orderRankField } from '@sanity/orderable-document-list'
import { SquareIcon } from "@sanity/icons";
import seoFields from './fields/seoFields';
import wysiwyg from './fields/wysiwyg';

export default {
	name: 'work',
	type: 'document',
	icon: SquareIcon,
	groups: [
		{name: 'Work'},
		{name: 'Seo'},
	],
	fields: [
		orderRankField({ type: "work" }),
		{
			name: 'title',
			type: 'string',
			validation: Rule => Rule.required(),
			group: 'Work',
		},
		{
			name: 'slug',
			type: 'slug',
			validation: Rule => Rule.required(),
			options: {
				source: 'title',
				maxLength: 96,
			},
			group: 'Work',
		},
		{
			name: 'status',
			type: 'string',
			options: {
				list: [
					{ title: 'Public', value: 'public' },
					{ title: 'Hidden', value: 'hidden' },
				],
				layout: 'radio'
			},
			initialValue: 'public',
			group: 'Work',
		},
		{
			name: 'date',
			type: 'date',
			validation: Rule => Rule.required(),
			group: 'Work',
		},
		{
			name: 'kind',
			type: 'string', 
			options: {
				list: [
					{ title: 'Personal', value: 'personal' },
					{ title: 'Commission', value: 'commission' },
				],
				layout: 'radio'
			},
			initialValue: 'commission',
			validation: Rule => Rule.required(),
			group: 'Work',
		},
		{
			name: 'city',
			type: 'reference',
			to: [{ type: 'city' }],
			group: 'Work',
		},
		wysiwyg('moreInfo','Work'),
		{
			name: 'gridThumbnail',
			type: 'image',
			group: 'Work',
		},
		{
			name: 'listThumbnail',
			type: 'image',
			group: 'Work',
		},
		{
			name: 'images',
			type: 'array',
			of: [{
				type: 'image',
			}],
			options: {
				layout: 'list',
			},
			group: 'Work',
		},
		...seoFields('Seo'),
	],

	preview: {
        select: {
            title: 'title',
            date: 'date',
            kind: 'kind',
            city: 'city.title',
            media: 'gridThumbnail', 
        },

        prepare({ title, date, kind, city, media }) {
            const year = date ? date.split('-')[0] : null;
            const subtitle = [year, city, kind.charAt(0).toUpperCase() + kind.slice(1)].filter(Boolean).join(', ');

            return {
                title: title || 'Untitled Work',
                subtitle: subtitle || 'No date set',
                media: media || SquareIcon, 
            };
        }
    },
};