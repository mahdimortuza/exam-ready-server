import { Schema, model } from 'mongoose';
import { TExamQuiz } from './examQuiz.interface';

const examQuizSchema = new Schema<TExamQuiz>(
  {
    subjectName: {
      type: Schema.Types.ObjectId,
      required: [true, 'Subject name is required'],
      ref: 'Admin',
    },
    question: {
      type: String,
      required: [true, 'Question is required'],
      trim: true,
    },
    options: {
      type: [String],
      required: [true, 'Options are required'],
    },
    correctOption: {
      type: String,
      required: [true, 'Correct option is required'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      required: [true, 'Admin name is required'],
      ref: 'Admin',
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

examQuizSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

examQuizSchema.pre('findOne', function (next) {
  this.findOne({ isDeleted: { $ne: true } });
  next();
});

examQuizSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

examQuizSchema.pre('save', async function (next) {
  const isQuestionExists = await ExamQuiz.findOne({
    question: this.question,
  });

  if (isQuestionExists) {
    throw new Error('This question already exists');
  }
  next();
});

export const ExamQuiz = model<TExamQuiz>('ExamQuiz', examQuizSchema);
