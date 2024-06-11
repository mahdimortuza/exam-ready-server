import httpStatus from 'http-status';
import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import { AppError } from '../../errors/AppError';
import { studentPlusSearchableFields } from './studentPlus.constants';
import { TStudentPlus } from './studentPlus.interface';
import { StudentPlus } from './studentPlus.model';

const getAllStudentPlusFromDb = async (query: Record<string, unknown>) => {
  const studentPlusQuery = new QueryBuilder(
    StudentPlus.find().populate('user'),
    query,
  )
    .search(studentPlusSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await studentPlusQuery.modelQuery;
  return result;
};

const getSingleStudentPlusFromDb = async (id: string) => {
  // const result = await Student.findOne({ id });
  const result = await StudentPlus.aggregate([{ $match: { id: id } }]);
  return result;
};

const updateStudentPlusIntoDb = async (
  id: string,
  payload: Partial<TStudentPlus>,
) => {
  const { name, ...remainingStudentData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingStudentData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }

  const result = await StudentPlus.findOneAndUpdate(
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

const deleteStudentPlusFromDb = async (id: string) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    // Find the student by ID and mark as deleted
    const deletedStudentPlus = await StudentPlus.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedStudentPlus) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete student');
    }

    // Find the associated user using student's user ID and mark as deleted
    const deletedUser = await StudentPlus.findByIdAndUpdate(
      deletedStudentPlus.user,
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete user');
    }

    // Commit the transaction
    await session.commitTransaction();
    session.endSession();

    return deletedStudentPlus;
  } catch (error) {
    // Rollback the transaction and handle errors
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete student');
  }
};

export const StudentPlusServices = {
  getAllStudentPlusFromDb,
  getSingleStudentPlusFromDb,
  updateStudentPlusIntoDb,
  deleteStudentPlusFromDb,
};
