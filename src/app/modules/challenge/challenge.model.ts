import { Schema, model } from 'mongoose';
import { TChallenge } from './challenge.interface';

const challengeSchema = new Schema<TChallenge>(
  {
    challengeTitle: {
      type: String,
      required: [true, 'Challenge title is required'],
    },
    challenge: {
      type: String,
      required: [true, 'Challenge description is required'],
    },
    hint: {
      type: String,
      required: [true, 'Challenge hint is required'],
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

export const Challenge = model<TChallenge>('Challenge', challengeSchema);
