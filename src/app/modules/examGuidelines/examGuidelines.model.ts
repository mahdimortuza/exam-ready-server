import { Schema, model } from 'mongoose';
import { TExamGuideline } from './examGuidelines.interface';

const examGuidelineSchema = new Schema<TExamGuideline>(
  {
    videoLink: {
      type: String,
      required: [true, 'Question name is required'],
    },
    createdBy: {
      type: String,
      required: [true, 'Admin email is required'],
      // ref: 'Student',
    },
  },
  {
    timestamps: true,
  },
);

export const ExamGuideline = model<TExamGuideline>(
  'ExamGuideline',
  examGuidelineSchema,
);
