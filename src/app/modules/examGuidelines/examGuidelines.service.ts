import QueryBuilder from '../../builder/QueryBuilder';
import { TExamGuideline } from './examGuidelines.interface';
import { ExamGuideline } from './examGuidelines.model';

const createExamGuidelineIntoDb = async (payload: TExamGuideline) => {
  const result = await ExamGuideline.create(payload);
  return result;
};

const getAllExamGuidelineFromDb = async (query: Record<string, unknown>) => {
  const examGuidelineQuery = new QueryBuilder(ExamGuideline.find(), query)
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await examGuidelineQuery.countTotal();
  const result = await examGuidelineQuery.modelQuery;
  return { meta, result };
};

const getSingleExamGuidelineFromDb = async (id: string) => {
  const result = await ExamGuideline.findById({ _id: id });
  return result;
};

const updateExamGuidelineIntoDb = async (
  id: string,
  payload: Partial<TExamGuideline>,
) => {
  const result = await ExamGuideline.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const deleteExamGuidelineIntoDb = async (id: string) => {
  const result = await ExamGuideline.findOneAndDelete({ _id: id });
  return result;
};

export const ExamGuidelineServices = {
  createExamGuidelineIntoDb,
  getAllExamGuidelineFromDb,
  getSingleExamGuidelineFromDb,
  updateExamGuidelineIntoDb,
  deleteExamGuidelineIntoDb,
};
