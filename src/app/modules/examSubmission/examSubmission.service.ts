/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import { AppError } from '../../errors/AppError';
import { ExamQuiz } from '../examQuiz/examQuiz.model';
import { Exam } from '../exams/exam.model';
import { ExamSubmission } from './examSubmission.model';

const getSingleExamFromDb = async (id: string) => {
  const result = await Exam.findOne({ _id: id }).populate('questions');
  return result;
};

const examSubmissionOnDb = async (
  answers: string | any[],
  studentEmail: string,
  examName: string,
  examType: string,
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
    examName,
    examType,
    answers,
    correctAnswers,
    incorrectAnswers,
    totalQuestions,
    totalScore,
    negativeScore,
  });

  return result;
};

const getAllSubmittedExamResultsFromDb = async (
  query: Record<string, unknown>,
) => {
  // Correct the populate reference to 'questions'
  const resultQuery = new QueryBuilder(
    ExamSubmission.find().populate('examName'),
    query,
  ); // Use 'questions' instead of 'ExamQuiz'
  const meta = await resultQuery.countTotal();
  const result = await resultQuery.modelQuery;
  return {
    meta,
    result,
  };
};

const getSingleStudentAllExamResultsFromDb = async (studentEmail: string) => {
  const result = await ExamSubmission.find({ studentEmail }).populate(
    'examName',
  );
  // console.log(result);
  if (!result || result.length === 0) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'No result found for this student.',
    );
  }
  return result;
};

const getSingleStudentSingleExamResultFromDb = async (
  studentEmail: string,
  resultId: string,
) => {
  const result = await ExamSubmission.findOne({
    studentEmail,
    _id: resultId,
  })
    .populate('answers.questionId')
    .populate('examName'); // Populate the correct path here

  if (!result) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'No result found for this student.',
    );
  }
  return result;
};

export const ExamSubmissionServices = {
  getSingleExamFromDb,
  examSubmissionOnDb,
  getAllSubmittedExamResultsFromDb,
  getSingleStudentAllExamResultsFromDb,
  getSingleStudentSingleExamResultFromDb,
};
