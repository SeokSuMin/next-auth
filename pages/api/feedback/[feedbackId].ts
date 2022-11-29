import { NextApiRequest, NextApiResponse } from 'next';
import { buildFeedbackPath, extractFeedback } from '.';

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const feedbackId = Number(req.query?.feedbackId);
  const filepath = buildFeedbackPath();
  const data = extractFeedback(filepath);
  const selectedFeedback = data.find((feedback: any) => feedback.id === feedbackId);
  res.status(200).json({ feedback: selectedFeedback });
};

export default handler;
