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
    message: 'Subject name is created successfully',
    data: result,
  });
});

export const ExamQuizController = {
  createExamQuiz,
};
