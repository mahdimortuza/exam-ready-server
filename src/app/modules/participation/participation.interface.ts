import mongoose from 'mongoose';

export interface IParticipation extends Document {
  user: mongoose.Schema.Types.ObjectId;
  questions: { questionId: mongoose.Schema.Types.ObjectId; answer: string }[];
}
