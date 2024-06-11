/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';

export type TAdminName = {
  firstName: string;
  lastName: string;
};

export type TAdmin = {
  user: Types.ObjectId;
  password: string;
  name: TAdminName;
  gender: 'male' | 'female';
  email: string;
  contactNo?: string;
  isDeleted: boolean;
};

//for creating static
export interface AdminModel extends Model<TAdmin> {
  isAdminExists(email: string): Promise<TAdmin | null>;
}
