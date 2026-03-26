export default function seoFields(groupName) {
	return [
		{
			name: 'seoDescription',
			description: 'Optional. To be used as preview text of the page',
			type: 'text',
			rows: 5,
			group: groupName,
		},
		{
			name: 'seoImage',
			description: 'Optional. To be used as preview image of the page. Suggested dimension is 1200x630px',
			type: 'image',
			group: groupName,
		}
	]
}