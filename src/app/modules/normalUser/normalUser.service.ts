import httpStatus from 'http-status';
import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import { AppError } from '../../errors/AppError';
import { User } from '../user/user.model';
import { normalUserSearchableFields } from './normalUser.constants';
import { TNormalUser } from './normalUser.interface';
import { NormalUser } from './normalUser.model';

const getAllNormalUsersFromDb = async (query: Record<string, unknown>) => {
  const normalUserQuery = new QueryBuilder(
    NormalUser.find().populate('user'),
    query,
  )
    .search(normalUserSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await normalUserQuery.modelQuery;
  return result;
};

const getSingleNormalUserFromDb = async (id: string) => {
  // const result = await Student.findOne({ id });
  const result = await NormalUser.aggregate([{ $match: { id: id } }]);
  return result;
};

const updateNormalUserIntoDb = async (
  id: string,
  payload: Partial<TNormalUser>,
) => {
  const { name, ...remainingNormalUserData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingNormalUserData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }

  const result = await NormalUser.findOneAndUpdate(
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

const deleteNormalUserFromDb = async (id: string) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    // Find the student by ID and mark as deleted
    const deletedNormalUser = await NormalUser.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedNormalUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete user');
    }

    // Find the associated user using student's user ID and mark as deleted
    const deletedUser = await User.findByIdAndUpdate(
      deletedNormalUser.user,
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete user');
    }

    // Commit the transaction
    await session.commitTransaction();
    session.endSession();

    return deletedNormalUser;
  } catch (error) {
    // Rollback the transaction and handle errors
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete user');
  }
};

export const NormalUserServices = {
  getAllNormalUsersFromDb,
  getSingleNormalUserFromDb,
  updateNormalUserIntoDb,
  deleteNormalUserFromDb,
};
