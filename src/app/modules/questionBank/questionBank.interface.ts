import { Types } from 'mongoose';

export type TQuestionBank = {
  questionName: string;
  questions: Types.ObjectId[];
  year: string;
  createdBy: string;
  isDeleted: boolean;
};
