/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

export interface TUser {
  email: string;
  password: string;
  needsPasswordChange: boolean;
  role: 'admin' | 'student' | 'user';
  isPaid: 'paid' | 'unPaid';
  status: 'in-progress' | 'blocked';
  isDeleted: boolean;
}

export interface UserModel extends Model<TUser> {
  // myStaticMethod(): number;
  isUserExistsByEmail(email: string): Promise<TUser>;
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
}
