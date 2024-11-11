import { Types } from 'mongoose';

export interface IDemo extends Document {
  questions: { questionId: Types.ObjectId; answer: string }[];
  correctAnswers: number;
  incorrectAnswers: number;
  totalQuestions: number;
  totalScore: number;
  negativeScore: number;
}
