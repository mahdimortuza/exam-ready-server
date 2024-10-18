/* eslint-disable no-unused-vars */
import { Types } from 'mongoose';

export interface TStudent {
  user: Types.ObjectId;
  password: string;
  name: string;
  email: string;
  image: string;
  isDeleted: boolean;
}
