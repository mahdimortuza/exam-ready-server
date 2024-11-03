import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ExamSubmissionServices } from './examSubmission.service';

const getSingleExams = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ExamSubmissionServices.getSingleExamFromDb(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Exam quiz is retrieved successfully',
    data: result,
  });
});

const examSubmission = catchAsync(async (req, res) => {
  const { answers, studentEmail, examName, examType } = req.body;

  const result = await ExamSubmissionServices.examSubmissionOnDb(
    answers,
    studentEmail,
    examName,
    examType,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Exam is submitted successfully',
    data: result,
  });
});

const getSubmittedExamResults = catchAsync(async (req, res) => {
  const result = await ExamSubmissionServices.getSubmittedExamResultsFromDb(
    req.query,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All exam results are retrieved successfully',
    meta: result.meta,
    data: result.result,
  });
});

export const ExamSubmissionController = {
  getSingleExams,
  examSubmission,
  getSubmittedExamResults,
};
