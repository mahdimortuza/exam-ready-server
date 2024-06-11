/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

export interface TUser {
  email: string;
  password: string;
  needsPasswordChange: boolean;
  role: 'admin' | 'studentPlus' | 'student' | 'user';
  isPaid: 'paid' | 'unPaid';
  status: 'in-progress' | 'blocked';
  isDeleted: boolean;
}

export interface UserModel extends Model<TUser> {
  isUserExistsByEmail(email: string): Promise<TUser>;
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
}
