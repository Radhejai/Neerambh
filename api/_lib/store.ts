/**
 * Shared inquiry logic used by both:
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

export const inquiries: Inquiry[] = [];

export function createInquiry(body: any): { status: number; body: any } {
  const { clientName, clientEmail, clientPhone, businessType, selectedServices, comments } = body || {};

  if (!clientName || !clientEmail) {
    return { status: 400, body: { error: 'Name and email are required.' } };
  }

  const trackingId = `NEE-2026-${Math.floor(1000 + Math.random() * 9000)}`;
  const newInquiry: Inquiry = {
    id: 'inq_' + Math.random().toString(36).substring(2, 11),
    clientName,
    clientEmail,
    clientPhone: clientPhone || '',
    businessType: businessType || '',
    selectedServices: selectedServices || [],
    comments: comments || '',
    status: 'submitted',
    createdAt: new Date().toISOString(),
    trackingId,
  };

  inquiries.push(newInquiry);
  return { status: 201, body: newInquiry };
}
