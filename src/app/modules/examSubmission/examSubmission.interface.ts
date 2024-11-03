import { Types } from 'mongoose';

export interface TAnswer {
  questionId: Types.ObjectId;
  answer: string;
}

export interface TExamSubmission {
  examName: Types.ObjectId;
  examType: string;
  studentEmail: string;
  answers: TAnswer[];
  correctAnswers: number;
  incorrectAnswers: number;
  totalQuestions: number;
  totalScore: number;
  negativeScore: number;
  date: Date;
}

export type TTest = {
  name: string;
};
