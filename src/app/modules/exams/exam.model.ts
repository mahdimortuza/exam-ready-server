import { model, Schema, Types } from 'mongoose';
import { TExam } from './exam.interface';

const examSchema = new Schema<TExam>(
  {
    examName: {
      type: String, // Change this line
      required: [true, 'Exam name is required.'],
    },

    // fdvnfd
    createdBy: {
      type: String,
      required: [true, 'Admin email is required'],
    },
    questions: {
      type: [Types.ObjectId],
      required: [true, 'Exam quizzes are required'],
      ref: 'ExamQuiz',
      validate: {
        validator: function (value: Types.ObjectId[]) {
          return value.length === 5; // Must have exactly 5 questions
        },
        message: 'Exactly 5 questions are required',
      },
    },
    status: {
      type: String,
      enum: ['upcoming', 'ongoing', 'finished'],
      default: 'upcoming',
    },
    startTime: {
      type: Date,
      required: [true, 'Start time is required'],
    },
    endTime: {
      type: Date,
      required: [true, 'End time is required'],
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // Automatically manages createdAt and updatedAt fields
  },
);

export const Exam = model<TExam>('Exam', examSchema);
