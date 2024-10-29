export type TExam = {
  examName: string; // Title of the exam
  createdBy: string; // Email or identifier of the creator
  questions: object[]; // Array of objects representing questions (flexible structure)
  status: 'upcoming' | 'ongoing' | 'finished'; // Status of the exam
  startTime: string; // Start time of the exam
  endTime: string; // End time of the exam
  isDeleted: boolean; // Logical deletion flag
};
