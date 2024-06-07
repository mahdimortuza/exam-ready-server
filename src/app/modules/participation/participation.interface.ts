import mongoose from 'mongoose';

export interface IParticipation extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  questions: { questionId: mongoose.Schema.Types.ObjectId; answer: string }[];
  totalScore: number;
}
