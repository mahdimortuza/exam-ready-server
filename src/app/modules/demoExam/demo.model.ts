import { Schema, model } from 'mongoose';
import { IDemo } from './demo.interface';

const demoSchema = new Schema<IDemo>({
  questions: [
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
});

export const Demo = model<IDemo>('Demo', demoSchema);
