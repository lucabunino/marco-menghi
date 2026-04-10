import { getWorks } from '$lib/utils/sanity';
import { error, redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ url, cookies }) {
    const viewParam = url.searchParams.get('view');
    const storedView = cookies.get('works-view-preference');
    if (!viewParam && storedView) {
        throw redirect(302, `/works?view=${storedView}`);
    }
    const view = viewParam || storedView || 'grid';

    try {
        const works = await getWorks();
        if (!works || works.length === 0) {
            throw error(404, 'No works found');
        }
        return {
            works,
            view,
            seoSingle: {
                seoTitle: `Works • ${view.charAt(0).toUpperCase() + view.slice(1)}`,
            }
        };

    } catch (err) {
        if (err.status === 302 || err.status === 303 || err.status === 404) {
            throw err;
        }
        console.error("Critical Load Error:", err);
        throw error(500, {
            message: 'Failed to load projects from the gallery'
        });
    }
}