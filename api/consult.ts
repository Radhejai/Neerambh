import type { VercelRequest, VercelResponse } from '@vercel/node';
import { runConsult } from './_lib/store';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { status, body } = await runConsult(req.body);
  return res.status(status).json(body);
}
