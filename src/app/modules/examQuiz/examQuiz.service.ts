import { TExamQuiz } from './examQuiz.interface';
import { ExamQuiz } from './examQuiz.model';

const createExamQuizIntoDb = async (examQuizData: TExamQuiz) => {
  const result = await ExamQuiz.create(examQuizData);
  return result;
};

export const ExamQuizServices = {
  createExamQuizIntoDb,
};
