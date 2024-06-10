import QueryBuilder from '../../builder/QueryBuilder';
import { quizSearchableFields } from './examQuiz.constant';
import { TExamQuiz } from './examQuiz.interface';
import { ExamQuiz } from './examQuiz.model';

const createExamQuizIntoDb = async (examQuizData: TExamQuiz) => {
  const result = await ExamQuiz.create(examQuizData);
  return result;
};

const getAllExamQuizzesFromDb = async (query: Record<string, unknown>) => {
  const quizQuery = new QueryBuilder(
    ExamQuiz.find().populate('subjectName').populate('createdBy'),
    query,
  )
    .search(quizSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await quizQuery.modelQuery;
  return result;
};

const getSingleExamQuizFromDb = async (id: string) => {
  const result = await ExamQuiz.findOne({ _id: id })
    .populate('subjectName')
    .populate('createdBy');
  return result;
};

const updateSingleExamQuizIntoDb = async (id: string, payload: TExamQuiz) => {
  const result = await ExamQuiz.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

export const ExamQuizServices = {
  createExamQuizIntoDb,
  getAllExamQuizzesFromDb,
  getSingleExamQuizFromDb,
  updateSingleExamQuizIntoDb,
};
