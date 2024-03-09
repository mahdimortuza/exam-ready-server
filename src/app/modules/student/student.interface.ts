import { Model, Types } from 'mongoose';

export type TStudentName = {
  firstName: string;
  lastName: string;
};

export type TStudent = {
  id: string;
  user: Types.ObjectId;
  password: string;
  name: TStudentName;
  gender: 'male' | 'female';
  email: string;
  contactNo?: string;
  profileImage?: string;
  isDeleted: boolean;
};

//for creating static
export interface StudentModel extends Model<TStudent> {
  isStudentExists(id: string): Promise<TStudent | null>;
}
