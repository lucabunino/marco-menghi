import { getPrivacy } from '$lib/utils/sanity';
import { error } from '@sveltejs/kit';

export async function load() {
    try {
        const privacy = await getPrivacy();

        if (!privacy) throw error(404, 'Missing privacy data');

        return {
            privacy,
            seoSingle: {
                seoTitle: "Privacy",
            }
        };
    } catch (err) {
        throw error(500, 'Failed to load page data');
    }
}