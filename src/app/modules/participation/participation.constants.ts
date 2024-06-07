import mongoose from 'mongoose';

export type TAnswer = {
  questionId: string;
  answer: string;
};

export type TParticipation = {
  _id: string;
  user: string;
  questions: object[];
  score: number;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
  __v: string;
};

export interface IAnswer {
  questionId: mongoose.Schema.Types.ObjectId;
  answer: string;
}

export interface ISubmission {
  quizId: mongoose.Schema.Types.ObjectId;
  answers: IAnswer[];
}
