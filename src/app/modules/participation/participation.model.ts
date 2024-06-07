import mongoose, { Schema, model } from 'mongoose';
import { IParticipation } from './participation.interface';

const participationSchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, required: true },
  questions: [
    {
      questionId: { type: mongoose.Schema.Types.ObjectId, required: true },
      answer: { type: String, required: true },
    },
  ],
  totalScore: { type: Number, default: 0 },
});

export const Participation = model<IParticipation>(
  'Participation',
  participationSchema,
);
