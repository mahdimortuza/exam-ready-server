import { Model } from 'mongoose';

export type TStudentName = {
  firstName: string;
  lastName: string;
};

export type TStudent = {
  id: string;
  password: string;
  name: TStudentName;
  gender: 'male' | 'female';
  email: string;
  contactNo?: string;
  profileImage?: string;
  isPaid: 'paid' | 'unpaid';
  isDeleted: boolean;
};

//for creating static
export interface StudentModel extends Model<TStudent> {
  isStudentExists(id: string): Promise<TStudent | null>;
}
