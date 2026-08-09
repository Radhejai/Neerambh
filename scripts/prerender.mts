/**
 * Build-time static prerenderer.
 *
 * This app is pure client-side React (no SSR framework). Search engines can
 * usually execute JS, but for a compliance/tax site we want guaranteed,
 * crawlable HTML for every real route rather than relying on that. This
 * script runs after `vite build`: it renders each known route to a static
 * HTML string and writes it to dist/<route>/index.html, reusing the same
 * hashed JS/CSS bundle Vite already produced so the page still hydrates
 * into a fully interactive SPA on load.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import App from '../src/App';
import { SERVICES } from '../src/data';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, '..', 'dist');
const shellPath = path.join(distDir, 'index.html');

const SITE_URL = 'https://neerambh.com';

interface RouteMeta {
  path: string;
  title: string;
  description: string;
  noindex?: boolean;
}

const routes: RouteMeta[] = [
  {
    path: '/',
    title: 'Neerambh — GST, Tax & Corporate Compliance Advisory',
    description:
      'Neerambh is a finance and tax advisory firm handling GST compliance, incorporation, income tax, TDS, statutory audits and accounting for growing Indian businesses.',
  },
  {
    path: '/contact',
    title: 'Contact Us | Neerambh Compliance Advisors',
    description:
      'Get in touch with Neerambh for GST, tax, incorporation, and audit compliance advisory. Submit an inquiry and our advisors will respond with a tailored compliance plan.',
  },
  {
    path: '/my-inquiries',
    title: 'My Inquiries | Neerambh',
    description: 'View the status of compliance inquiries submitted to Neerambh.',
    noindex: true,
  },
  ...SERVICES.map((s) => ({
    path: `/services/${s.slug}`,
    title: `${s.title} | Neerambh Compliance Advisory`,
    description: s.description,
  })),
];

if (!fs.existsSync(shellPath)) {
  console.error('dist/index.html not found — run `vite build` first.');
  process.exit(1);
}

const shell = fs.readFileSync(shellPath, 'utf-8');

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function renderRoute(route: RouteMeta): string {
  const appHtml = renderToString(
    React.createElement(StaticRouter, { location: route.path }, React.createElement(App))
  );

  const canonicalUrl = `${SITE_URL}${route.path === '/' ? '/' : route.path}`;
  const escTitle = escapeHtml(route.title);
  const escDesc = escapeHtml(route.description);

  let html = shell;

  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${escTitle}</title>`);
  html = html.replace(
    /<meta name="description" content="[^"]*" \/>/,
    `<meta name="description" content="${escDesc}" />`
  );
  html = html.replace(
    /<link rel="canonical" href="[^"]*" \/>/,
    `<link rel="canonical" href="${canonicalUrl}" />`
  );
  html = html.replace(
    /<meta property="og:title" content="[^"]*" \/>/,
    `<meta property="og:title" content="${escTitle}" />`
  );
  html = html.replace(
    /<meta property="og:description" content="[^"]*" \/>/,
    `<meta property="og:description" content="${escDesc}" />`
  );
  html = html.replace(
    /<meta property="og:url" content="[^"]*" \/>/,
    `<meta property="og:url" content="${canonicalUrl}" />`
  );

  if (route.noindex) {
    html = html.replace('</title>', '</title>\n  <meta name="robots" content="noindex, nofollow" />');
  }

  html = html.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);

  return html;
}

for (const route of routes) {
  const html = renderRoute(route);
  const outDir = route.path === '/' ? distDir : path.join(distDir, route.path);
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, 'index.html'), html, 'utf-8');
  console.log(`prerendered ${route.path}${route.noindex ? '  (noindex)' : ''}`);
}

console.log(`\nDone — ${routes.length} routes prerendered.`);
