import { createClient } from '@sanity/client';
import { PUBLIC_SANITY_DATASET, PUBLIC_SANITY_PROJECT_ID } from '$env/static/public';

if (!PUBLIC_SANITY_PROJECT_ID || !PUBLIC_SANITY_DATASET) {
	throw new Error('Did you forget to run sanity init --env?');
}

export const client = createClient({
	projectId: PUBLIC_SANITY_PROJECT_ID,
	dataset: PUBLIC_SANITY_DATASET,
	useCdn: false, // `false` if you want to ensure fresh data
	apiVersion: '2026-03-26', // date of setup
});

export async function getSeo() {
	return await client.fetch(
		`*[_type == "seo" && !(_id in path('drafts.**'))] {
			seoTitle,
			seoDescription,
			seoImage,
		}`
	);
}
export async function getPolicies() {
	return await client.fetch(
		`*[(_type == "cookies" || _type == "privacy") && !(_id in path('drafts.**'))] {
			_type,
			title,
			slug,
		}`
	);
}
export async function getLogo() {
	return await client.fetch(
		`*[_type == "about" && !(_id in path('drafts.**'))][0] {
			"logoUrl": logo.asset->url
		}`
	);
}
export async function getCookies() {
	return await client.fetch(
		`
		*[(_type == "cookies") && !(_id in path('drafts.**'))] {
			_type,
			title,
			slug,
			content,
		}
		`
	);
}
export async function getPrivacy() {
	return await client.fetch(
		`
		*[(_type == "privacy") && !(_id in path('drafts.**'))] {
			_type,
			title,
			slug,
			content,
		}
		`
	);
}
export async function getHomepage() {
    return await client.fetch(
        `*[_type == "homepage" && !(_id in path('drafts.**'))][0] {
            images[] {
                _type,
                _type == 'single' => {
                    wide { asset->{ _id, _ref, _type, title, description, altText, metadata { dimensions, lqip } } },
                    work->{ title, slug }
                },
                _type == 'pair' => {
                    left { asset->{ _id, _ref, _type, title, description, altText, metadata { dimensions, lqip } } },
                    right { asset->{ _id, _ref, _type, title, description, altText, metadata { dimensions, lqip } } },
                    work->{ title, slug }
                }
            },
			imagesMobile[] {
                image { asset->{ _id, _ref, _type, title, description, altText, metadata { dimensions, lqip } } },
				work->{ title, slug }
            }
        }`
    );
}
export async function getAbout() {
    return await client.fetch(
        `*[_type == "about" && !(_id in path('drafts.**'))][0] {
            content,
			email,
			instagram,
			clients[]-> {
				title,
				href
			},
			exhibitions,
			prizes,
			publications[] {
				title,
				href,
				"pdf": pdf.asset->url
			},

        }`
    );
}
export async function getWorks() {
    return await client.fetch(
        `*[_type == "work" && status == "public" && !(_id in path('drafts.**'))]|order(orderRank) {
			_id,
            kind,
			title,
			slug,
			date,
			city->{ title, slug },
			gridThumbnail { asset->{ _id, _ref, _type, title, description, altText, metadata { dimensions, lqip } } },
			listThumbnail { asset->{ _id, _ref, _type, title, description, altText, metadata { dimensions, lqip } } },
        }`
    );
}
export async function getWork(slug) {
	return await client.fetch(
		`
		*[_type == "work" && slug.current == $slug] {
			_id,
			title,
			slug,
			date,
			kind,
			city->{ title, slug },
			moreInfo,
			images[] { asset->{ _id, _ref, _type, title, description, altText, metadata { dimensions, lqip } } },
			"seoSingle": {
				"seoTitle": title,
				seoDescription,
				seoImage,
			},
			orderRank,
            "prev": coalesce(
                *[_type == "work" && orderRank < ^.orderRank] | order(orderRank desc)[0],
                *[_type == "work"] | order(orderRank desc)[0],
            ) { title, slug, "imagesCount": count(images) },
            "next": coalesce(
                *[_type == "work" && orderRank > ^.orderRank] | order(orderRank asc)[0],
                *[_type == "work"] | order(orderRank asc)[0],
            ) { title, slug }
		}
		`, { slug });
}
export async function getVideo() {
    return await client.fetch(
        `*[_type == "video" && !(_id in path('drafts.**'))][0] {
			videoDesktop {
				"url": video.asset->url,
				poster { asset->{ _id, _ref, _type, title, description, altText, metadata { dimensions, lqip } } },
			},
			videoMobile {
				"url": video.asset->url,
				poster { asset->{ _id, _ref, _type, title, description, altText, metadata { dimensions, lqip } } },
			}
        }`
    );
}