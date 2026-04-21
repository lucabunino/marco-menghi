import { getCookies } from '$lib/utils/sanity';
import { error } from '@sveltejs/kit';

export async function load() {
    try {
        const cookies = await getCookies();

        if (!cookies) throw error(404, 'Missing cookies data');

        return {
            cookies,
            seoSingle: {
                seoTitle: "Cookies",
            }
        };
    } catch (err) {
        throw error(500, 'Failed to load page data');
    }
}