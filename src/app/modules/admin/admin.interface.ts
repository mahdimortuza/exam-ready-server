/* eslint-disable no-unused-vars */
import { Types } from 'mongoose';

export type TAdmin = {
  user: Types.ObjectId;
  password: string;
  name: string;
  gender: 'male' | 'female';
  email: string;
  contactNo?: string;
  isDeleted: boolean;
};

//for creating static
// export interface AdminModel extends Model<TAdmin> {
//   isAdminExists(email: string): Promise<TAdmin | null>;
// }
