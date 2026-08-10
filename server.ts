import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { inquiries, createInquiry, runConsult } from "./api/_lib/store";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// --- API ROUTES ---
// Shared logic lives in api/_lib/store.ts so this local/Express server and
// the Vercel serverless functions under api/*.ts can never drift apart.

// Health Check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Submit Inquiry
app.post("/api/inquiries", (req, res) => {
  const { status, body } = createInquiry(req.body);
  res.status(status).json(body);
});

// Fetch Inquiries
app.get("/api/inquiries", (req, res) => {
  res.json(inquiries);
});

// Chat Consultation powered by Gemini
app.post("/api/consult", async (req, res) => {
  const { status, body } = await runConsult(req.body);
  res.status(status).json(body);
});


// --- VITE DEV AND PROD SERVING ---

async function bootstrap() {
  if (process.env.NODE_ENV !== "production") {
    console.log("[Neerambh Gateway] Starting in DEVELOPMENT mode with Vite middleware...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("[Neerambh Gateway] Starting in PRODUCTION mode...");
    const distPath = path.join(process.cwd(), "dist");

    // Serve hashed assets, robots.txt, sitemap.xml etc. directly — no
    // trailing-slash redirect behaviour, since that would make canonical
    // sitemap URLs (no trailing slash) 301 instead of returning 200.
    app.use(express.static(distPath, { index: false, redirect: false }));

    // Prerendered routes (see scripts/prerender.mts) each ship as
    // dist/<route>/index.html. Serve the exact match for the canonical,
    // non-trailing-slash URL directly, so crawlers get real per-page HTML
    // with a 200 — never a redirect.
    app.get("*", (req, res) => {
      const cleanPath = req.path === "/" ? "" : req.path.replace(/\/+$/, "");
      const prerenderedFile = path.join(distPath, cleanPath, "index.html");
      res.sendFile(prerenderedFile, (err) => {
        if (err) {
          // Unknown route: fall back to the app shell so client-side
          // routing can render its own not-found UI.
          res.sendFile(path.join(distPath, "index.html"));
        }
      });
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Neerambh Gateway] Neerambh Compliance Server active at http://0.0.0.0:${PORT}`);
  });
}

bootstrap();
