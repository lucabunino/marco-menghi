import { getWorksSlugs } from "$lib/utils/sanity";

export async function GET() {
	const pages = [
		{ path: '', priority: 1.0 },
		{ path: 'works', priority: 0.8 },
		{ path: 'about', priority: 0.8 },
		{ path: 'video', priority: 0.8 },
	];
	const works = await getWorksSlugs();
	const workPages = works.map(work => ({
		path: `works/${work.slug.current}`,
		priority: 0.7
	}));
	const allPages = [...pages, ...workPages];
	
	const base = 'https://www.marcomenghi.com';
	const body = `
		<?xml version="1.0" encoding="UTF-8"?>
		<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
	${allPages.map(
		({ path, priority }) => `
			<url>
				<loc>${base}/${path}</loc>
				<priority>${priority}</priority>
			</url>
		`)
		.join('')}
		</urlset>`.trim();

	return new Response(body, {
		headers: {
		'Content-Type': 'application/xml'
		}
	});
}