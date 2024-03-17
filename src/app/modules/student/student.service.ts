import httpStatus from 'http-status';
import mongoose from 'mongoose';
import { AppError } from '../../errors/AppError';
import { User } from '../user/user.model';
import { TStudent } from './student.interface';
import { Student } from './student.model';

const getAllStudentFromDb = async () => {
  const result = await Student.find();
  return result;
};

const getSingleStudentFromDb = async (id: string) => {
  // const result = await Student.findOne({ id });
  const result = await Student.aggregate([{ $match: { id: id } }]);
  return result;
};

const updateStudentIntoDb = async (id: string, payload: Partial<TStudent>) => {
  const { name, ...remainingStudentData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingStudentData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }

  const result = await Student.findOneAndUpdate(
    { _id: id },
    modifiedUpdatedData,
    { new: true, runValidators: true },
  );
  return result;
};

// const deleteStudentFromDb = async (id: string) => {
//   const deletedStudent = await Student.findByIdAndUpdate(
//     { _id: id },
//     { isDeleted: true },
//     { new: true },
//   );
//   return deletedStudent;
// };

// const deleteStudentFromDb = async (id: string) => {
//   const session = await mongoose.startSession();
//   try {
//     session.startTransaction();
//     const deletedStudent = await Student.findByIdAndUpdate(
//       id,
//       { isDeleted: true },
//       { new: true, session },
//     );

//     if (!deletedStudent) {
//       throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete student');
//     }

//     const deletedUser = await User.findByIdAndUpdate(
//       deletedStudent.user,
//       { isDeleted: true },
//       { new: true, session },
//     );
//     if (!deletedUser) {
//       throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete user');
//     }

//     session.commitTransaction();
//     session.endSession();

//     return deletedStudent;
//   } catch (error) {
//     await session.abortTransaction();
//     await session.endSession();
//     throw new Error('Failed to delete student');
//   }
// };

const deleteStudentFromDb = async (id: string) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    // Find the student by ID and mark as deleted
    const deletedStudent = await Student.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete student');
    }

    // Find the associated user using student's user ID and mark as deleted
    const deletedUser = await User.findByIdAndUpdate(
      deletedStudent.user,
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete user');
    }

    // Commit the transaction
    await session.commitTransaction();
    session.endSession();

    return deletedStudent;
  } catch (error) {
    // Rollback the transaction and handle errors
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete student');
  }
};

export const StudentServices = {
  getAllStudentFromDb,
  getSingleStudentFromDb,
  updateStudentIntoDb,
  deleteStudentFromDb,
};
