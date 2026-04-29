import wysiwyg2 from "./fields/wysiwyg2";

export default {
  name: 'privacy',
  type: 'document',
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
	wysiwyg2('content'),
  ],
}