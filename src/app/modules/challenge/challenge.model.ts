import { Schema, model } from 'mongoose';
import { TChallenge } from './challenge.interface';

const challengeSchema = new Schema<TChallenge>(
  {
    challengeTitle: {
      type: String,
      required: [true, 'Challenge title is required'],
    },
    challengeDescription: {
      type: String,
      required: [true, 'Challenge description is required'],
    },
    hint: {
      type: String,
      required: [true, 'Challenge hint is required'],
    },
    status: {
      type: String,
      enum: ['upcoming', 'ongoing', 'finished'],
      default: 'upcoming',
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
