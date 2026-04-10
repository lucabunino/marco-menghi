import { HomeIcon, ImageIcon, ProjectsIcon } from "@sanity/icons";

export default {
	name: 'homepage',
	type: 'document',
	icon: HomeIcon,
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
			name: 'images',
			type: 'array',
			of: [
                {
                    name: 'single',
                    type: 'object',
                    icon: ImageIcon,
                    fields: [
                        { name: 'wide', type: 'image' },
                        { name: 'work', type: 'reference', to: [{ type: 'work' }] }
                    ],
                    preview: {
                        select: {
                            title: 'work.title',
                            media: 'wide'
                        },
                        prepare({ title, media }) {
                            return {
                                title: `Single: ${title || 'No work selected'}`,
                                media
                            }
                        }
                    }
                },
                {
                    name: 'pair',
                    type: 'object',
                    icon: ProjectsIcon,
                    fields: [
                        { name: 'left', type: 'image' },
                        { name: 'right', type: 'image' },
                        { name: 'work', type: 'reference', to: [{ type: 'work' }], validation: Rule => Rule.required(), }
                    ],
                    preview: {
                        select: {
                            title: 'work.title',
                            media: 'left'
                        },
                        prepare({ title, media }) {
                            return {
                                title: `Pair: ${title || 'No work selected'}`,
                                media
                            }
                        }
                    }
                }
            ],
			options: {
				layout: 'list',
			},
		},
		{
			name: 'imagesMobile',
			type: 'array',
			of: [
                {
                    name: 'imageMobile',
                    type: 'object',
                    icon: ImageIcon,
                    fields: [
                        {
							name: 'image',
							type: 'image'
						},
                        {
							name: 'work',
							type: 'reference',
							to: [{ type: 'work' }],
							validation: Rule => Rule.required(),
						}
                    ],
                    preview: {
                        select: {
                            title: 'work.title',
                            media: 'image'
                        },
                        prepare({ title, media }) {
                            return {
                                title: `Image mobile: ${title || 'No work selected'}`,
                                media
                            }
                        }
                    }
                },
            ],
			options: {
				layout: 'list',
			},
		},
	],
}