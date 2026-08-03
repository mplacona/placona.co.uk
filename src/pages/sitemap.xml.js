// Jekyll published its sitemap at /sitemap.xml and that URL is what Search Console
// and older crawlers already know. @astrojs/sitemap emits sitemap-index.xml instead,
// so serve a sitemap index here that points at the generated file.
export async function GET(context) {
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap><loc>${new URL('/sitemap-0.xml', context.site).href}</loc></sitemap>
</sitemapindex>
`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml' } });
}
