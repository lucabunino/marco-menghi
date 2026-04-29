import { getSeo, getPolicies, getLogo } from '$lib/utils/sanity';
import { error } from '@sveltejs/kit';

export async function load({ url }) {
	let seo, policies, logo, logoSvg;
	try {
		[seo, policies, logo] = await Promise.all([
		getSeo(),
		getPolicies(),
		getLogo()
		]);
	} catch (err) {
		throw error(500, 'Failed to load page data');
	}

	if (!seo) {
		throw error(404, 'Missing SEO data');
	}

    if (logo?.logoUrl) {
        try {
            const res = await fetch(logo.logoUrl);
            if (res.ok) {
                logoSvg = await res.text();
            }
        } catch (err) {
            console.error('Could not fetch logo SVG text:', err);
        }
    }

	return {
		seo,
		policies,
		logo: logoSvg,
		pathname: url.pathname
	};
}