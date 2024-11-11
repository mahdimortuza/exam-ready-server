import { Types } from 'mongoose';

export type TExam = {
  examName: string;
  createdBy: string;
  questions: Types.ObjectId[];
  status: 'upcoming' | 'ongoing' | 'finished';
  startTime: string;
  endTime: string;
  examType: 'weakly' | 'daily';
  isDeleted: boolean;
};
