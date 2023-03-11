import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (
    req.query.secret !== process.env.NEXT_REVALIDATE_SECRET ||
    !req.query?.path
  ) {
    return res.status(401).json({ message: 'Invalid request' });
  }

  try {
    await res.revalidate(req.query.path.toString());
    return res.json({ revalidated: true });
  } catch (err) {
    return res.status(500).send('Error revalidating');
  }
}
