export async function GET() {
	return new Response(`
	User-agent: *
	Disallow: /cgi-bin/
	Sitemap: https://www.marcomenghi.com/sitemap.xml
	`,
		{
			headers: {
				'Content-Type': 'text/plain; charset=utf-8',
			},
		}
	);
}