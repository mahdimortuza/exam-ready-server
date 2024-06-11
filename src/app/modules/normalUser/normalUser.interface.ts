/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';

export type TNormalUserName = {
  firstName: string;
  lastName: string;
};

export type TNormalUser = {
  user: Types.ObjectId;
  password: string;
  name: TNormalUserName;
  gender: 'male' | 'female';
  email: string;
  contactNo?: string;
  collage: string;
  isDeleted: boolean;
};

//for creating static
export interface NormalUserModel extends Model<TNormalUser> {
  isNormalUserExists(email: string): Promise<TNormalUser | null>;
}
