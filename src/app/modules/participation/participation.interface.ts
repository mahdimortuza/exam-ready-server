import { Types } from 'mongoose';

export interface IParticipation extends Document {
  studentEmail: string;
  questions: { questionId: Types.ObjectId; answer: string }[];
  correctAnswers: number;
  incorrectAnswers: number;
  totalQuestions: number;
  totalScore: number;
  negativeScore: number;
  date: Date;
}
