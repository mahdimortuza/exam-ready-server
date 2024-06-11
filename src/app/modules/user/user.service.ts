import httpStatus from 'http-status';
import mongoose from 'mongoose';
import config from '../../config';
import { AppError } from '../../errors/AppError';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
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

export const UserService = {
  createStudentIntoDb,
};
