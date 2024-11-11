import { Schema, model } from 'mongoose';
import { TCurrentAffairs } from './currentAffairs.interface';

const currentAffairsSchema = new Schema<TCurrentAffairs>(
  {
    event: {
      type: String,
      required: [true, 'Event is required'],
    },
    detail: {
      type: String,
      required: [true, 'Event detail is required'],
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

export const CurrentAffairs = model<TCurrentAffairs>(
  'CurrentAffair',
  currentAffairsSchema,
);
