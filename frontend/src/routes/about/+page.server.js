import { getAbout } from '$lib/utils/sanity';
import { error } from '@sveltejs/kit';

export async function load() {
    try {
        const about = await getAbout();

        if (!about) throw error(404, 'Missing about data');

        return {
            about,
            seoSingle: {
                seoTitle: "About",
            }
        };
    } catch (err) {
        throw error(500, 'Failed to load page data');
    }
}