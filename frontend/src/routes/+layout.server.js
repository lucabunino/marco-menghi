import { getSeo, getPolicies } from '$lib/utils/sanity';
import { error } from '@sveltejs/kit';

export async function load({ url }) {
	let seo, policies;
	try {
		[seo, policies] = await Promise.all([
		getSeo(),
		getPolicies()
		]);
	} catch (err) {
		throw error(500, 'Failed to load page data');
	}

	if (!seo) {
		throw error(404, 'Missing SEO data');
	}

	return {
		seo,
		policies,
		pathname: url.pathname
	};
}