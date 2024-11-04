import { model, Schema } from 'mongoose';
import { TNotice } from './notice.interface';

const noticeSchema = new Schema<TNotice>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    createdBy: {
      type: String,
      required: [true, 'Admin email is required'],
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

export const Notice = model<TNotice>('Notice', noticeSchema);
