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
import { GENERAL_FAQS } from '../src/generalFaqs';

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
    path: '/services',
    title: 'Compliance & Registration Services | Neerambh',
    description:
      'Browse GST registration, company incorporation, MSME/Udyam registration, IEC code, tax filing, audit, and other compliance services offered by Neerambh.',
  },
  {
    path: '/about',
    title: 'About Us | Neerambh',
    description:
      'Neerambh helps founders and growing businesses manage GST, income tax, and company compliance — precise, founder-focused, and end-to-end.',
  },
  {
    path: '/contact',
    title: 'Contact Us | Neerambh Compliance Advisors',
    description:
      'Get in touch with Neerambh for GST, tax, incorporation, and audit compliance advisory. Submit a message and our advisors will respond with a tailored compliance plan.',
  },
  ...SERVICES.map((s) => ({
    path: `/services/${s.slug}`,
    title: `${s.title} | Neerambh Compliance Advisory`,
    description: s.description,
  })),
  {
    path: '/insights',
    title: 'FAQ & Feedback | Neerambh Compliance Advisory',
    description:
      'Answers to the most common questions about GST registration, incorporation, tax filing, and compliance services from Neerambh, plus a place to share feedback.',
  },
  {
    path: '/insights/feedback',
    title: 'Feedback & Reviews | Neerambh Insights',
    description: 'Share your feedback on Neerambh\u2019s compliance advisory services.',
  },
  {
    path: '/calculators/income-tax',
    title: 'Income Tax Calculator (FY 2026-27) | Neerambh',
    description:
      'Free income tax calculator for FY 2026-27 \u2014 compare New Regime vs Old Regime tax liability for resident individuals in seconds.',
  },
  {
    path: '/calculators/gst-late-fee-interest',
    title: 'GST Late Fee & Interest Calculator | Neerambh',
    description:
      'Free calculator for GST late fees and interest on delayed GSTR-3B/GSTR-1 filing, based on current CBIC rates and caps.',
  },
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

  // FAQPage structured data — for individual service pages (their own
  // FAQs) and for the aggregated /insights page (every service's FAQs
  // combined), so Google can surface rich FAQ snippets for both.
  const svc = SERVICES.find((s) => `/services/${s.slug}` === route.path);
  const allFaqs = [...GENERAL_FAQS, ...SERVICES.flatMap((s) => s.faqs ?? [])];
  const faqsForRoute = route.path === '/insights' ? allFaqs : svc?.faqs;
  if (faqsForRoute && faqsForRoute.length > 0) {
    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqsForRoute.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    };
    html = html.replace(
      '</head>',
      `  <script type="application/ld+json">${JSON.stringify(faqSchema)}</script>\n</head>`
    );
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
