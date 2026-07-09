import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-loaded Gemini Client following security & stability guidelines
let aiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error("GEMINI_API_KEY environment variable is missing. Please set it in Settings > Secrets.");
    }
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// In-memory list to securely manage and review client inquiries
interface Inquiry {
  id: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  businessType: string;
  selectedServices: string[];
  comments: string;
  status: 'submitted' | 'reviewing' | 'documentation_pending' | 'completed';
  createdAt: string;
  trackingId: string;
}

const inquiries: Inquiry[] = [
  {
    id: "inq_initial_sample",
    clientName: "Neerambh Venture Ltd",
    clientEmail: "compliance@neerambhcorp.com",
    clientPhone: "+91 98765 43210",
    businessType: "Private Limited Company",
    selectedServices: ["company-inc", "dsc-issuance", "gst-reg"],
    comments: "Looking to establish our new electronics manufacturing hub and need immediate legal incorporation and GST setup.",
    status: "reviewing",
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    trackingId: "NEE-2026-9021"
  }
];

// --- API ROUTES ---

// Health Check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Submit Inquiry
app.post("/api/inquiries", (req, res) => {
  try {
    const { clientName, clientEmail, clientPhone, businessType, selectedServices, comments } = req.body;
    
    if (!clientName || !clientEmail) {
      return res.status(400).json({ error: "Client Name and Email are mandatory to initiate briefing." });
    }

    const trackingId = `NEE-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newInquiry: Inquiry = {
      id: "inq_" + Math.random().toString(36).substring(2, 11),
      clientName,
      clientEmail,
      clientPhone: clientPhone || "",
      businessType: businessType || "Corporate Enterprise",
      selectedServices: selectedServices || [],
      comments: comments || "",
      status: "submitted",
      createdAt: new Date().toISOString(),
      trackingId
    };

    inquiries.push(newInquiry);
    console.log(`[Neerambh Portal] New inquiry submitted successfully: ${trackingId}`);
    res.status(201).json(newInquiry);
  } catch (error: any) {
    console.error("Inquiry Error:", error);
    res.status(500).json({ error: "Failed to lodge service inquiry with Neerambh." });
  }
});

// Fetch Inquiries
app.get("/api/inquiries", (req, res) => {
  res.json(inquiries);
});

// Chat Consultation powered by Gemini 3.5 Flash
app.post("/api/consult", async (req, res) => {
  try {
    const { message, history } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: "Message content cannot be blank." });
    }

    const ai = getGeminiClient();

    // Map history elements into Gemini contents format
    const contents = (history || []).map((h: any) => ({
      role: h.sender === "user" ? "user" : "model",
      parts: [{ text: h.text }]
    }));

    // Add current message
    contents.push({
      role: "user",
      parts: [{ text: message }]
    });

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: contents,
      config: {
        systemInstruction: `You are the "Neerambh Compliance Advisor", a highly professional financial expert, corporate registrar, and legal compliance strategist.
Your voice is professional, clear, and deeply informative, yet accessible and highly practical. Think of yourself as a Senior Compliance Advisor advising an enterprise on establishing their corporate compliance framework.
Use clear, direct, and professional business vocabulary.
Your objective is to advise the client on their legal compliance and tax requirements, specifically mapping their needs to our 13 Compliance & Registration Services:
1. Company & LLP Incorporation (id: company-inc)
2. GST Registration (id: gst-reg)
3. GST Return Filing (id: gst-return)
4. GST Audit & Reconciliation (id: gst-audit)
5. MSME / Udyam Registration (id: msme-reg)
6. Import Export Code (IEC) (id: iec-code)
7. Digital Signature Certificate (DSC) (id: dsc-issuance)
8. PAN & TAN Card Registration (id: pan-reg)
9. TDS Return Filing (id: tds-filing)
10. Income Tax Return Filing (id: itr-filing)
11. Accounting & Bookkeeping (id: bookkeeping)
12. SME Audit & Financial Consultancy (id: audit-consultancy)
13. Pvt Ltd Corporate Compliance (id: pvt-ltd-compliance)

Guidelines:
- Actively ask for or analyze client details such as business entity type, monthly or annual revenues, industry segment, or whether they engage in export/import or trade goods vs services.
- Provide highly detailed compliance advice, explaining exactly which of the 13 services are required by law or strategic interest, and why.
- Always output your response in beautiful, scannable markdown with professional headings and clear tables/bullet points.
- IMPORTANT: At the end of your response, always output a special JSON block on a new line inside XML-like tags <recommendations>["service-id-1", "service-id-2"]</recommendations> containing the service IDs of the services you recommended, so that the website can dynamically highlight or auto-select them for the client! Ensure the array elements exactly match the service IDs listed above.
- Maintain absolute professional composure.`,
      }
    });

    const text = response.text || "I apologize, but I am unable to formulate royal counsel at this moment. Please state your query again.";
    res.json({ text });
  } catch (error: any) {
    console.error("Consultation API error:", error);
    res.status(500).json({ error: error.message || "Failed to contact the Neerambh Advisor. Please ensure your GEMINI_API_KEY is configured." });
  }
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
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Neerambh Gateway] Neerambh Compliance Server active at http://0.0.0.0:${PORT}`);
  });
}

bootstrap();
