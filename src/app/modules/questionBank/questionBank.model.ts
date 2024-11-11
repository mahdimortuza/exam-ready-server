import { Schema, Types, model } from 'mongoose';
import { TQuestionBank } from './questionBank.interface';

const questionBankSchema = new Schema<TQuestionBank>(
  {
    questionName: {
      type: String,
      required: [true, 'Question name is required'],
    },
    questions: {
      type: [Types.ObjectId],
      required: [true, 'Question bank questions are required'],
      ref: 'ExamQuiz',
    },
    year: {
      type: String,
      required: [true, 'Year is required'],
    },
    createdBy: {
      type: String,
      required: [true, 'Admin email is required'],
      // ref: 'Student',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

export const QuestionBank = model<TQuestionBank>(
  'QuestionBank',
  questionBankSchema,
);
