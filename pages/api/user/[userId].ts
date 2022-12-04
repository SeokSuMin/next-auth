import { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from 'next-auth';
import { buildFeedbackPath, extractFeedback } from '../../../lib/user';
import { authOptions } from '../auth/[...nextauth]';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return;
  }

  const userId = req.query.userId;
  const session = await unstable_getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ message: 'Not authenticated!' });
  }
  const filePath = buildFeedbackPath();
  const userData = extractFeedback(filePath);
  const user = userData.find((userinfo) => userinfo.email === userId);
  if (!user) {
    return res.status(404).json({ message: 'User not found.' });
  }
  return res.status(200).json({ message: `find user ${user.email}!` });
}

export default handler;
