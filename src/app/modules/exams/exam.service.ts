/* eslint-disable @typescript-eslint/no-explicit-any */
import QueryBuilder from '../../builder/QueryBuilder';
import { TExam } from './exam.interface';
import { Exam } from './exam.model';

const createNewExamIntoDb = async (quizzesData: TExam) => {
  const result = await Exam.create(quizzesData);
  return result;
};

const getAllExamsFromDb = async (query: Record<string, unknown>) => {
  // Correct the populate reference to 'questions'
  const examQuery = new QueryBuilder(Exam.find().populate('questions'), query); // Use 'questions' instead of 'ExamQuiz'
  const meta = await examQuery.countTotal();
  const result = await examQuery.modelQuery;
  return {
    meta,
    result,
  };
};

const getSingleExamFromDb = async (id: string) => {
  const result = await Exam.findOne({ _id: id }).populate('questions');
  return result;
};

const updateExamQuizIntoDb = async (id: string, payload: TExam) => {
  const result = await Exam.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const updateStatusIntoDb = async (id: string, payload: { status: string }) => {
  const result = await Exam.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

export const ExamServices = {
  createNewExamIntoDb,
  getAllExamsFromDb,
  getSingleExamFromDb,
  updateExamQuizIntoDb,
  updateStatusIntoDb,
};
