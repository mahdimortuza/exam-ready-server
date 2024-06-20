import httpStatus from 'http-status';
import mongoose from 'mongoose';
import config from '../../config';
import { AppError } from '../../errors/AppError';
import { TAdmin } from '../admin/admin.interface';
import { Admin } from '../admin/admin.model';
import { verifyToken } from '../auth/auth.utils';
import { TNormalUser } from '../normalUser/normalUser.interface';
import { NormalUser } from '../normalUser/normalUser.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TStudentPlus } from '../studentPlus/studentPlus.interface';
import { StudentPlus } from '../studentPlus/studentPlus.model';
import { TUser } from './user.interface';
import { User } from './user.model';

const createStudentIntoDb = async (password: string, payload: TStudent) => {
  // create a user object
  const userData: Partial<TUser> = {};

  //if password is not given use default password
  userData.password = password || (config.default_password as string);

  //   set student role
  userData.role = 'student';

  // set student email
  userData.email = payload.email;

  const session = await mongoose.startSession();
  try {
    await session.startTransaction();
    // create a user (transaction - 1)
    const newUser = await User.create([userData], { session });

    // create a student
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }

    // set id, _id as user
    payload.user = newUser[0]._id; // reference ID

    // create a student (transaction - 2)
    const newStudent = await Student.create([payload], { session });

    if (!newStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create student');
    }

    await session.commitTransaction();
    await session.endSession();
    return newStudent;
  } catch (error) {
    await session.abortTransaction();
    // end session
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create student'); // re-throw the error to be handled by the caller
  }
};

const createStudentPlusIntoDb = async (
  password: string,
  payload: TStudentPlus,
) => {
  // create a user object
  const userData: Partial<TUser> = {};

  //if password is not given use default password
  userData.password = password || (config.default_password as string);

  //   set student role
  userData.role = 'studentPlus';

  userData.email = payload.email;

  const session = await mongoose.startSession();
  try {
    await session.startTransaction();
    // create a user (transaction - 1)
    const newUser = await User.create([userData], { session });

    // create a student
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }

    // set id, _id as user
    payload.user = newUser[0]._id; // reference ID

    // create a student (transaction - 2)
    const newStudentPlus = await StudentPlus.create([payload], { session });

    if (!newStudentPlus.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create student');
    }

    await session.commitTransaction();
    await session.endSession();
    return newStudentPlus;
  } catch (error) {
    await session.abortTransaction();
    // end session
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create student'); // re-throw the error to be handled by the caller
  }
};

const createAdminIntoDb = async (password: string, payload: TAdmin) => {
  // create a user object
  const userData: Partial<TUser> = {};

  //if password is not given use default password
  userData.password = password || (config.default_password as string);

  //   set student role
  userData.role = 'admin';

  // set student email
  userData.email = payload.email;

  const session = await mongoose.startSession();
  try {
    await session.startTransaction();
    // create a user (transaction - 1)
    const newUser = await User.create([userData], { session });

    // create a student
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }

    // set id, _id as user
    payload.user = newUser[0]._id; // reference ID

    // create a student (transaction - 2)
    const newAdmin = await Admin.create([payload], { session });

    if (!newAdmin.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create admin');
    }

    await session.commitTransaction();
    await session.endSession();
    return newAdmin;
  } catch (error) {
    await session.abortTransaction();
    // end session
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create admin'); // re-throw the error to be handled by the caller
  }
};

const createNormalUserIntoDb = async (
  password: string,
  payload: TNormalUser,
) => {
  // create a user object
  const userData: Partial<TUser> = {};

  //if password is not given use default password
  userData.password = password || (config.default_password as string);

  //   set student role
  userData.role = 'normalUser';

  // set student email
  userData.email = payload.email;

  const session = await mongoose.startSession();
  try {
    await session.startTransaction();
    // create a user (transaction - 1)
    const newUser = await User.create([userData], { session });

    // create a student
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }

    // set id, _id as user
    payload.user = newUser[0]._id; // reference ID

    // create a student (transaction - 2)
    const newNormalUser = await NormalUser.create([payload], { session });

    if (!newNormalUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create student');
    }

    await session.commitTransaction();
    await session.endSession();
    return newNormalUser;
  } catch (error) {
    await session.abortTransaction();
    // end session
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create student'); // re-throw the error to be handled by the caller
  }
};

const getMe = async (token: string) => {
  const decoded = verifyToken(token, config.jwt_access_secret as string);

  const { email, role } = decoded;

  let result = null;
  if (role === 'admin') {
    result = await Admin.findOne({ email: email });
  }
  if (role === 'studentPlus') {
    result = await StudentPlus.findOne({ email: email });
  }
  if (role === 'student') {
    result = await Student.findOne({ email: email });
  }
  if (role === 'normalUser') {
    result = await NormalUser.findOne({ email: email });
  }

  return result;
};

export const UserService = {
  createStudentIntoDb,
  createStudentPlusIntoDb,
  createAdminIntoDb,
  createNormalUserIntoDb,
  getMe,
};
