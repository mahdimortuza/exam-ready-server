import QueryBuilder from '../../builder/QueryBuilder';
import { TQuestionBank } from './questionBank.interface';
import { QuestionBank } from './questionBank.model';

const createQuestionBankIntoDb = async (payload: TQuestionBank) => {
  const result = await QuestionBank.create(payload);
  return result;
};

const getAllQuestionBankFromDb = async (query: Record<string, unknown>) => {
  const questionBankQuery = new QueryBuilder(
    QuestionBank.find().populate('questions'),
    query,
  ); // Use 'questions' instead of 'ExamQuiz'
  const meta = await questionBankQuery.countTotal();
  const result = await questionBankQuery.modelQuery;
  return {
    meta,
    result,
  };
};

const getSingleQuestionBankFromDb = async (id: string) => {
  const result = await QuestionBank.findById({ _id: id }).populate('questions');
  return result;
};

const updateQuestionBankIntoDb = async (
  id: string,
  payload: Partial<TQuestionBank>,
) => {
  const result = await QuestionBank.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const deleteQuestionBankIntoDb = async (id: string) => {
  const result = await QuestionBank.findOneAndDelete({ _id: id });
  return result;
};

export const QuestionBankServices = {
  createQuestionBankIntoDb,
  getAllQuestionBankFromDb,
  getSingleQuestionBankFromDb,
  updateQuestionBankIntoDb,
  deleteQuestionBankIntoDb,
};
