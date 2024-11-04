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

const getAllSubmittedExamResults = catchAsync(async (req, res) => {
  const result = await ExamSubmissionServices.getAllSubmittedExamResultsFromDb(
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

const getSingleStudentAllExamResult = catchAsync(async (req, res) => {
  const { studentEmail } = req.params;
  // console.log(studentEmail);
  const result =
    await ExamSubmissionServices.getSingleStudentAllExamResultsFromDb(
      studentEmail,
    );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student results are retrieved successfully.',
    data: result,
  });
});

const getSingleStudentSingleExamResult = catchAsync(async (req, res) => {
  const { studentEmail, resultId } = req.params;
  // console.log({ studentEmail, resultId });git a
  const result =
    await ExamSubmissionServices.getSingleStudentSingleExamResultFromDb(
      studentEmail,
      resultId,
    );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student result is retrieved successfully.',
    data: result,
  });
});

export const ExamSubmissionController = {
  getSingleExams,
  examSubmission,
  getAllSubmittedExamResults,
  getSingleStudentAllExamResult,
  getSingleStudentSingleExamResult,
};
