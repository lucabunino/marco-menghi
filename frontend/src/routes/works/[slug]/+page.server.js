import { getWork } from '$lib/utils/sanity';
import { error } from '@sveltejs/kit';

export async function load({ params, url, setHeaders }) {
	setHeaders({
        'cache-control': 'public, max-age=3600'
    });
	
    const workData = await getWork(params.slug);

    if (!workData || workData.length === 0) {
        throw error(404, 'Work not found');
    }

    const work = workData[0];
    const images = work.images || [];
    const iParam = parseInt(url.searchParams.get('i'));
    const displayIndex = (!isNaN(iParam) && iParam > 0) ? iParam : 1;

    return {
        work: workData,
        seoSingle: {
            ...work.seoSingle,
            seoTitle: `${work.seoSingle.seoTitle} (${displayIndex}/${images.length})`
        }
    };
}