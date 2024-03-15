import { Types } from 'mongoose';

export type TExamQuiz = {
  subjectName: Types.ObjectId;
  question: string;
  options: string[];
  correctOption: string;
  description: string;
  createdBy: Types.ObjectId;
  isDeleted: boolean;
};
