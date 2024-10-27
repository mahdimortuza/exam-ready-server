/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import { AppError } from '../../errors/AppError';
import { ExamQuiz } from '../examQuiz/examQuiz.model';
import { TExam } from './exam.interface';
import { Exam, ExamSubmission } from './exam.model';

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

const examSubmissionOnDb = async (
  answers: string | any[],
  studentEmail: string,
  examId: string,
) => {
  // Validate input
  if (!answers) {
    throw new AppError(httpStatus.NOT_FOUND, 'Invalid input.');
  }

  // Fetch the quiz and its questions
  const quiz = await ExamQuiz.find().exec();
  if (!quiz) {
    throw new AppError(httpStatus.NOT_FOUND, 'Quiz not found');
  }

  // Calculate the results
  let correctAnswers = 0;
  let incorrectAnswers = 0;
  let totalScore = 0;
  let negativeScore = 0;

  for (const userAnswer of answers) {
    const question = await ExamQuiz.findById(userAnswer.questionId).exec();
    if (question) {
      if (question.correctOption === userAnswer.answer) {
        correctAnswers++;
        totalScore += 1;
      } else {
        incorrectAnswers++;
        totalScore -= 0.5;
        negativeScore += 0.5;
      }
    }
  }

  // Generate the result
  const totalQuestions = answers.length;
  const result = {
    correctAnswers,
    incorrectAnswers,
    totalQuestions,
    totalScore,
    negativeScore,
    scorePercentage: (totalScore / totalQuestions) * 100,
  };

  await ExamSubmission.create({
    studentEmail,
    examId,
    answers,
    correctAnswers,
    incorrectAnswers,
    totalQuestions,
    totalScore,
    negativeScore,
  });

  return result;
};

// const getAllExamsFromDb = async (query: Record<string, unknown>) => {
//   // Correct the populate reference to 'questions'
//   const examQuery = new QueryBuilder(Exam.find().populate('questions'), query); // Use 'questions' instead of 'ExamQuiz'
//   const meta = await examQuery.countTotal();
//   const result = await examQuery.modelQuery;
//   return {
//     meta,
//     result,
//   };
// };

const retrieveAllExamResultsFromDb = async (query: Record<string, unknown>) => {
  const resultQuery = new QueryBuilder(
    ExamSubmission.find().populate('examId'), // Use the correct reference here
    query,
  );

  const meta = await resultQuery.countTotal();
  const result = await resultQuery.modelQuery;

  return {
    meta,
    result,
  };
};

export const ExamServices = {
  createNewExamIntoDb,
  getAllExamsFromDb,
  getSingleExamFromDb,
  updateExamQuizIntoDb,
  updateStatusIntoDb,
  examSubmissionOnDb,
  retrieveAllExamResultsFromDb,
};
