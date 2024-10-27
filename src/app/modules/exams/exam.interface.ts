import { Types } from 'mongoose';

export type TExam = {
  examName: string;
  createdBy: string;
  questions: Types.ObjectId[];
  status: 'upcoming' | 'ongoing' | 'finished';
  startTime: Date;
  endTime: Date;
  isDeleted: boolean;
};

export interface TAnswer {
  questionId: Types.ObjectId;
  answer: string;
}

export interface TExamSubmission {
  examId: Types.ObjectId;
  studentEmail: string;
  answers: TAnswer[];
}
