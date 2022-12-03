import fs from 'fs';
import path from 'path';

export const buildFeedbackPath = () => {
  return path.join(process.cwd(), 'info.json');
};

export const extractFeedback = (filepath: string): { email: string; password: string }[] => {
  const fileData = fs.readFileSync(filepath).toString();
  const data = JSON.parse(fileData);
  return data;
};
