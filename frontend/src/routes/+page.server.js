import { getHomepage } from '$lib/utils/sanity';
import { error } from '@sveltejs/kit';

export async function load() {
    try {
        const homepage = await getHomepage();

        if (!homepage) throw error(404, 'Missing about data');

        return {
            homepage,
        };
    } catch (err) {
        throw error(500, 'Failed to load page data');
    }
}