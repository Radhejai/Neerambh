import type { VercelRequest, VercelResponse } from '@vercel/node';
import { inquiries, createInquiry } from './_lib/store';

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'GET') {
    return res.status(200).json(inquiries);
  }

  if (req.method === 'POST') {
    const { status, body } = createInquiry(req.body);
    return res.status(status).json(body);
  }

  res.setHeader('Allow', 'GET, POST');
  return res.status(405).json({ error: 'Method not allowed' });
}
