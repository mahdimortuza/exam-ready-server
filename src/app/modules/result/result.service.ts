import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import { AppError } from '../../errors/AppError';
import { Participation } from '../participation/participation.model';

const getAllResultsFromDb = async (query: Record<string, unknown>) => {
  const resultQuery = new QueryBuilder(Participation.find(), query);

  const meta = await resultQuery.countTotal();
  const result = await resultQuery.modelQuery;
  return { meta, result };
};

const getSingleStudentAllResultFromDb = async (studentEmail: string) => {
  const result = await Participation.find({ studentEmail });
  // console.log(result);
  if (!result || result.length === 0) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'No result found for this student.',
    );
  }
  return result;
};

const getSingleStudentSingleResultFromDb = async (
  studentEmail: string,
  resultId: string,
) => {
  const result = await Participation.find({ studentEmail, _id: resultId });
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
  getSingleStudentAllResultFromDb,
  getSingleStudentSingleResultFromDb,
};
