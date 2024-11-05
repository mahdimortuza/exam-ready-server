import { model, Schema } from 'mongoose';
import { TChallengeSubmission } from './challengeSubmission.interface';

const challengeSubmissionSchema = new Schema<TChallengeSubmission>(
  {
    challengeTitle: {
      type: String,
      required: [true, 'Title is required'],
    },
    answer: {
      type: String,
      required: [true, 'Answer is required'],
    },
    createdBy: {
      type: String,
      required: [true, 'Student email is required'],
    },
  },
  {
    timestamps: true,
  },
);

export const ChallengeSubmission = model<TChallengeSubmission>(
  'ChallengeSubmission',
  challengeSubmissionSchema,
);
