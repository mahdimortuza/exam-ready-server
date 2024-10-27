import { Types } from 'mongoose';

export type TExam = {
  examName: string; // References another document (e.g., Exam title)
  createdBy: string; // Email or identifier of the creator
  questions: Types.ObjectId[]; // Array of question IDs
  status: 'upcoming' | 'ongoing' | 'finished'; // Status of the exam
  startTime: Date; // Start time of the exam
  endTime: Date; // End time of the exam
  isDeleted: boolean; // Logical deletion flag
};
