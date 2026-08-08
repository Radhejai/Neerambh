/**
 * Generates dist/sitemap.xml from the same route list the prerenderer uses,
 * so it can never drift from what's actually built. Regenerated on every
 * `npm run build`. Excludes the private /my-inquiries route (noindex).
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { SERVICES } from '../src/data';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, '..', 'dist');
const SITE_URL = 'https://neerambh.com';

const publicPaths = ['/', '/contact', ...SERVICES.map((s) => `/services/${s.slug}`)];

const urls = publicPaths
  .map((p) => `  <url>\n    <loc>${SITE_URL}${p}</loc>\n  </url>`)
  .join('\n');

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

fs.writeFileSync(path.join(distDir, 'sitemap.xml'), xml, 'utf-8');
console.log(`sitemap.xml written with ${publicPaths.length} URLs`);
