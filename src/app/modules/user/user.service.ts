import httpStatus from 'http-status';
import mongoose from 'mongoose';
import config from '../../config';
import { AppError } from '../../errors/AppError';
import { TAdmin } from '../admin/admin.interface';
import { Admin } from '../admin/admin.model';
import { TStudent } from '../students/student.interface';
import { Student } from '../students/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';

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
    session.startTransaction();
    // create a user (transaction - 1)

    // Check if email already exists
    const existingUser = await User.findOne({ email: payload.email });
    if (existingUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'This email is already used.');
    }
    const newUser = await User.create([userData], { session });

    // create a student
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }

    // set id, _id as user
    payload.user = newUser[0]._id; // reference ID

    // create an admin (transaction - 2)
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
    throw new AppError(httpStatus.BAD_REQUEST, 'This email is already used.'); // re-throw the error to be handled by the caller
  }
};

const createStudentIntoDb = async (password: string, payload: TStudent) => {
  // Create a user object
  const userData: Partial<TUser> = {};

  // If password is not given, use default password
  userData.password = password || (config.default_password as string);

  // Set user role
  userData.role = 'user';

  // Set user email
  userData.email = payload.email;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // Check if email already exists
    const existingUser = await User.findOne({ email: payload.email });
    if (existingUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'This email is already used.');
    }

    // Create a user (transaction - 1)
    const newUser = await User.create([userData], { session });

    // If user creation fails
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }

    // Set user reference ID for normal user creation
    payload.user = newUser[0]._id;

    // Create a normal user (transaction - 2)
    const newStudent = await Student.create([payload], { session });

    if (!newStudent.length) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Failed to create normal user',
      );
    }

    // Commit the transaction
    await session.commitTransaction();
    session.endSession();

    return newStudent;
  } catch (error) {
    // Rollback transaction
    await session.abortTransaction();
    session.endSession();

    // Throw specific error
    throw new AppError(httpStatus.BAD_REQUEST, `This email is already used.`);
  }
};

const getMe = async (email: string, role: string) => {
  let result;

  if (role === 'admin') {
    result = await Admin.findOne({ email }).populate('user');
  } else if (role === 'student_plus' || role === 'student' || role === 'user') {
    result = await Student.findOne({ email }).populate('user');
  }

  if (!result) {
    // Return a default value if no user is found
    return { message: 'No user found', email, role };
  }

  return result;
};

const changePaymentStatus = async (id: string, payload: { status: string }) => {
  const result = await User.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

const changeStatus = async (id: string, payload: { status: string }) => {
  const result = await User.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

const changeStudentRole = async (id: string, payload: { status: string }) => {
  const result = await User.findByIdAndUpdate(id, payload, { new: true });
  return result;
};
export const UserService = {
  createAdminIntoDb,
  createStudentIntoDb,
  getMe,
  changePaymentStatus,
  changeStatus,
  changeStudentRole,
};
