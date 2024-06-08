import httpStatus from 'http-status';
import { AppError } from '../../errors/AppError';
import { Participation } from '../participation/participation.model';

const getAllResultsFromDb = async () => {
  const result = await Participation.find();
  return result;
};
const getSingleStudentResultFromDb = async (studentId: string) => {
  const result = await Participation.find({ studentId });
  if (!result || result.length === 0) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'No result found for this student.',
    );
  }
  return result;
};
export const ResultServices = {
  getAllResultsFromDb,
  getSingleStudentResultFromDb,
};
