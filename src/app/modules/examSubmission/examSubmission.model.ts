// for exam submission schema model

import { model, Schema } from 'mongoose';
import { TExamSubmission } from './examSubmission.interface';

const examSubmissionSchema = new Schema<TExamSubmission>({
  studentEmail: { type: String, required: true },
  examName: {
    type: Schema.Types.ObjectId, // Changed to ObjectId to match the interface
    required: [true, 'Exam name is required.'],
    ref: 'Exams',
  },
  examType: {
    type: String, // Changed to ObjectId to match the interface
    required: [true, 'Exam type is required.'],
  },
  answers: [
    {
      questionId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'ExamQuiz',
      },
      answer: { type: String, required: true },
    },
  ],
  correctAnswers: { type: Number, default: 0 },
  incorrectAnswers: { type: Number, default: 0 },
  totalQuestions: { type: Number, default: 0 },
  totalScore: { type: Number, default: 0 },
  negativeScore: { type: Number, default: 0 },
  date: { type: Date, default: Date.now },
});

export const ExamSubmission = model<TExamSubmission>(
  'ExamSubmission',
  examSubmissionSchema,
);
