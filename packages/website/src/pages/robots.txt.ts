import { absoluteUrl } from '../data/seo';

export function GET() {
  return new Response(
    [
      'User-agent: *',
      'Allow: /',
      '',
      `Sitemap: ${absoluteUrl('/sitemap.xml')}`,
      '',
    ].join('\n'),
    {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
      },
    },
  );
}
