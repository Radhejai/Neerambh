# Neerambh

Financial, tax compliance, and corporate registration services website.

**Stack:** React + Vite + TailwindCSS (frontend), self-hosted Node.js/Express + PostgreSQL (backend). Pages are prerendered at build time for SEO, with an auto-generated `sitemap.xml` and `robots.txt`.

## Run locally

**Prerequisites:** Node.js

1. Install dependencies:
   `npm install`
2. Run the dev server:
   `npm run dev`

## Build & run in production

```
npm run build
npm start
```

`npm run build` runs the Vite build, prerenders every route to static HTML, regenerates `sitemap.xml`, and bundles the Express server.
