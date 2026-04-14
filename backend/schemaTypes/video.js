import { PlayIcon } from "@sanity/icons";

export default {
	name: 'video',
	type: 'document',
	icon: PlayIcon,
	fieldsets: [

	],
	fields: [
		{
			name: 'title',
			type: 'string',
			hidden: true,
			validation: Rule => Rule.required(),
		},
		{
            name: 'videoDesktop',
            type: 'object',
            fields: [
                {
                    name: 'video',
                    type: 'file',
                    options: { accept: 'video/*' }
                },
                {
                    name: 'poster',
                    type: 'image',
                },
            ],
        },
        {
            name: 'videoMobile',
            type: 'object',
            fields: [
                {
                    name: 'video',
                    type: 'file',
                    options: { accept: 'video/*' }
                },
                {
                    name: 'poster',
                    type: 'image',
                },
            ],
        }
	],
}