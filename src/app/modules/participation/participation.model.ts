import { Schema, model } from 'mongoose';
import { IParticipation } from './participation.interface';

const participationSchema = new Schema({
  studentId: { type: Schema.Types.ObjectId, required: true, ref: 'Student' },
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
});

export const Participation = model<IParticipation>(
  'Participation',
  participationSchema,
);
