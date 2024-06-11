/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';

export type TStudentPlusName = {
  firstName: string;
  lastName: string;
};

export type TStudentPlus = {
  user: Types.ObjectId;
  password: string;
  name: TStudentPlusName;
  gender: 'male' | 'female';
  email: string;
  contactNo?: string;
  collage: string;
  isDeleted: boolean;
};

//for creating static
export interface StudentPlusModel extends Model<TStudentPlus> {
  isStudentPlusExists(email: string): Promise<TStudentPlus | null>;
}
