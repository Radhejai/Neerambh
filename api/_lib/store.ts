/**
 * Shared inquiry/consult logic used by both:
 *  - server.ts (Express, for local dev / non-Vercel hosting)
 *  - api/*.ts  (Vercel serverless functions, for the live Vercel deployment)
 *
 * IMPORTANT CAVEAT: on Vercel, each serverless function invocation may run
 * in a fresh, isolated instance — this in-memory `inquiries` array is NOT
 * guaranteed to persist between a POST and a later GET in production. It
 * works reliably for local/single-process hosting (server.ts) but on
 * Vercel it should be treated as a best-effort cache, not a database. For
 * durable lead capture on Vercel, this needs a real store (e.g. Supabase,
 * already available as a connector) — flagged separately, not silently
 * left broken.
 */
import { GoogleGenAI } from '@google/genai';

export interface Inquiry {
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

export const inquiries: Inquiry[] = [
  {
    id: 'inq_initial_sample',
    clientName: 'Neerambh Venture Ltd',
    clientEmail: 'compliance@neerambhcorp.com',
    clientPhone: '+91 98765 43210',
    businessType: 'Private Limited Company',
    selectedServices: ['company-inc', 'dsc-issuance', 'gst-reg'],
    comments:
      'Looking to establish our new electronics manufacturing hub and need immediate legal incorporation and GST setup.',
    status: 'reviewing',
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    trackingId: 'NEE-2026-9021',
  },
];

export function createInquiry(body: any): { status: number; body: any } {
  const { clientName, clientEmail, clientPhone, businessType, selectedServices, comments } = body || {};

  if (!clientName || !clientEmail) {
    return { status: 400, body: { error: 'Client Name and Email are mandatory to initiate briefing.' } };
  }

  const trackingId = `NEE-2026-${Math.floor(1000 + Math.random() * 9000)}`;
  const newInquiry: Inquiry = {
    id: 'inq_' + Math.random().toString(36).substring(2, 11),
    clientName,
    clientEmail,
    clientPhone: clientPhone || '',
    businessType: businessType || 'Corporate Enterprise',
    selectedServices: selectedServices || [],
    comments: comments || '',
    status: 'submitted',
    createdAt: new Date().toISOString(),
    trackingId,
  };

  inquiries.push(newInquiry);
  return { status: 201, body: newInquiry };
}

let aiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error('GEMINI_API_KEY environment variable is missing. Please set it in Settings > Secrets.');
    }
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: { headers: { 'User-Agent': 'aistudio-build' } },
    });
  }
  return aiClient;
}

const SYSTEM_INSTRUCTION = `You are the "Neerambh Compliance Advisor", a highly professional financial expert, corporate registrar, and legal compliance strategist.
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
- Maintain absolute professional composure.`;

export async function runConsult(body: any): Promise<{ status: number; body: any }> {
  const { message, history } = body || {};

  if (!message) {
    return { status: 400, body: { error: 'Message content cannot be blank.' } };
  }

  try {
    const ai = getGeminiClient();
    const contents = (history || []).map((h: any) => ({
      role: h.sender === 'user' ? 'user' : 'model',
      parts: [{ text: h.text }],
    }));
    contents.push({ role: 'user', parts: [{ text: message }] });

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents,
      config: { systemInstruction: SYSTEM_INSTRUCTION },
    });

    const text =
      response.text || 'I apologize, but I am unable to formulate royal counsel at this moment. Please state your query again.';
    return { status: 200, body: { text } };
  } catch (error: any) {
    return {
      status: 500,
      body: { error: error.message || 'Failed to contact the Neerambh Advisor. Please ensure your GEMINI_API_KEY is configured.' },
    };
  }
}
