import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export const buildFeedbackPath = () => {
  return path.join(process.cwd(), 'data', 'feedback.json');
};

export const extractFeedback = (filepath: string) => {
  const fileData = fs.readFileSync(filepath).toString();
  const data = JSON.parse(fileData);
  return data;
};

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    // 자동으로 body값으로 파싱해줌
    const email = req.body.email;
    const feedbackText = req.body.text;
    const newFeedback = {
      id: Date.now(),
      email,
      text: feedbackText,
    };

    const filepath = buildFeedbackPath();
    const data = extractFeedback(filepath);
    data.push(newFeedback);
    fs.writeFileSync(filepath, JSON.stringify(data));
    res.status(201).json({
      message: 'Success!',
      feedback: newFeedback,
    });
  } else {
    const filepath = buildFeedbackPath();
    const data = extractFeedback(filepath);
    res.status(200).json({
      feedback: data,
    });
  }
};

export default handler;
