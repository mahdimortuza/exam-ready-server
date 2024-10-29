import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ExamServices } from './exam.service';

const createExam = catchAsync(async (req, res) => {
  const quizzes = req.body;

  // console.log(quizzes);
  const result = await ExamServices.createNewExamIntoDb(quizzes);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Exam is created successfully',
    data: result,
  });
});

const getAllExams = catchAsync(async (req, res) => {
  const result = await ExamServices.getAllExamsFromDb(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All exams are retrieved successfully',
    meta: result.meta,
    data: result.result,
  });
});

const getSingleExams = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ExamServices.getSingleExamFromDb(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Exam quiz is retrieved successfully',
    data: result,
  });
});

const updateExam = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await ExamServices.updateExamQuizIntoDb(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Exam paper is updated successfully',
    data: result,
  });
});

const updateStatus = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await ExamServices.updateStatusIntoDb(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Exam status is updated successfully',
    data: result,
  });
});

export const ExamController = {
  createExam,
  getAllExams,
  getSingleExams,
  updateExam,
  updateStatus,
};
