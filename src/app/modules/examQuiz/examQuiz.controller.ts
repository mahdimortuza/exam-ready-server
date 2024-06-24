import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ExamQuizServices } from './examQuiz.service';

const createExamQuiz = catchAsync(async (req, res) => {
  const examQuiz = req.body;
  const result = await ExamQuizServices.createExamQuizIntoDb(examQuiz);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Exam quiz is created successfully',
    data: result,
  });
});

const getAllExamQuiz = catchAsync(async (req, res) => {
  const result = await ExamQuizServices.getAllExamQuizzesFromDb(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Exam quizzes are retrieved successfully',
    meta: result.meta,
    data: result.result,
  });
});

const getSingleExamQuiz = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ExamQuizServices.getSingleExamQuizFromDb(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Exam quiz is retrieved successfully',
    data: result,
  });
});

const updateSingleExamQuiz = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await ExamQuizServices.updateSingleExamQuizIntoDb(
    id,
    req.body,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Exam quiz is updated successfully',
    data: result,
  });
});

export const ExamQuizController = {
  createExamQuiz,
  getAllExamQuiz,
  getSingleExamQuiz,
  updateSingleExamQuiz,
};
