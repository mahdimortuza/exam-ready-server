/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import { AppError } from '../../errors/AppError';
import { ExamQuiz } from '../examQuiz/examQuiz.model';
import { Participation } from './participation.model';

// const startQuiz = async (payload: IParticipation) => {
//   const result = await Participation.create(payload);
//   return result;
// };

// const submitAnswers = async (quizId: string, answers: string | any[]) => {
//   // Validate input
//   if (!quizId || !answers) {
//     throw new AppError(httpStatus.NOT_FOUND, 'Invalid input.');
//   }

//   // Fetch the quiz and its questions
//   const quiz = await Participation.findById({ _id: quizId }).exec();
//   if (!quiz) {
//     throw new AppError(httpStatus.NOT_FOUND, 'Quiz not found');
//   }

//   // Calculate the results
//   let correctAnswers = 0;
//   let incorrectAnswers = 0;
//   let totalScore = 0;
//   let negativeScore = 0;

//   for (const userAnswer of answers) {
//     const question = await ExamQuiz.findById(userAnswer.questionId).exec();
//     if (question) {
//       if (question.correctOption === userAnswer.answer) {
//         correctAnswers++;
//         totalScore += 1;
//       } else {
//         incorrectAnswers++;
//         totalScore -= 0.5;
//         negativeScore += 0.5;
//       }
//     }
//   }

//   // Generate the result
//   const totalQuestions = answers.length;
//   const result = {
//     correctAnswers,
//     incorrectAnswers,
//     totalQuestions,
//     totalScore,
//     negativeScore,
//     scorePercentage: (totalScore / totalQuestions) * 100,
//   };

//   return result;
// };

const submitAnswers = async (userId: string, answers: string | any[]) => {
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
  const subTotal = {
    correctAnswers,
    incorrectAnswers,
    totalQuestions,
    totalScore,
    negativeScore,
    scorePercentage: (totalScore / totalQuestions) * 100,
  };
  const participatedExam = await Participation.create({ userId, answers });

  const result = {
    totalScore,
    participatedExam,
  };

  console.log(result);
  return subTotal;
};

const getUserResults = async (userId: string, quizId: string) => {
  const participation = await Participation.findOne({
    user: userId,
    quiz: quizId,
    completed: true,
  })
    .populate('ExamQuiz', 'title')
    .populate('Student', 'gender');

  if (!participation) {
    throw new AppError(httpStatus.NOT_FOUND, 'Result not found');
  }

  return participation;
};

export const ParticipationServices = {
  // startQuiz,
  submitAnswers,
  getUserResults,
};
