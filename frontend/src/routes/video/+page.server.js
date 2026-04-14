import { getVideo } from '$lib/utils/sanity';
import { error } from '@sveltejs/kit';

export async function load() {
    try {
        const video = await getVideo();

        if (!video) throw error(404, 'Missing video data');

        return {
            video,
            seoSingle: {
                seoTitle: "Video",
            }
        };
    } catch (err) {
        throw error(500, 'Failed to load page data');
    }
}