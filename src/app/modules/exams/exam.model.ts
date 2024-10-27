import { model, Schema, Types } from 'mongoose';
import { TExam, TExamSubmission } from './exam.interface';

const examSchema = new Schema<TExam>(
  {
    examName: {
      type: String,
      required: [true, 'Exam name is required'],
    },
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
          return value.length === 5;
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
    timestamps: true,
  },
);

export const Exam = model<TExam>('Exam', examSchema);

// for exam submission schema model

const examSubmissionSchema = new Schema<TExamSubmission>({
  studentEmail: { type: String, required: true },

  examId: {
    type: Schema.Types.ObjectId, // Changed to ObjectId to match the interface
    required: [true, 'Exam id is required.'],
    // ref: 'Exam',
  },
  answers: [
    {
      questionId: {
        type: Schema.Types.ObjectId,
        required: true,
        // ref: 'ExamQuiz',
      },
      answer: { type: String, required: true },
    },
  ],
});

export const ExamSubmission = model<TExamSubmission>(
  'ExamSubmission',
  examSubmissionSchema,
);
