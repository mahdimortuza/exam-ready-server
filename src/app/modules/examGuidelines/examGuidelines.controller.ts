import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ExamGuidelineServices } from './examGuidelines.service';

const createExamGuideline = catchAsync(async (req, res) => {
  const examGuideline = req.body;
  const result =
    await ExamGuidelineServices.createExamGuidelineIntoDb(examGuideline);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Exam guideline is created successfully',
    data: result,
  });
});

const getAllExamGuidelines = catchAsync(async (req, res) => {
  const result = await ExamGuidelineServices.getAllExamGuidelineFromDb(
    req.query,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Exam guideline are fetched successfully',
    meta: result.meta,
    data: result.result,
  });
});

const getSingleExamGuideline = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ExamGuidelineServices.getSingleExamGuidelineFromDb(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Exam guideline is retrieved successfully.',
    data: result,
  });
});

const updateExamGuideline = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ExamGuidelineServices.updateExamGuidelineIntoDb(
    id,
    req.body,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Exam guideline is updated successfully',
    data: result,
  });
});

const deleteExamGuideline = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ExamGuidelineServices.deleteExamGuidelineIntoDb(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Exam guideline is deleted successfully',
    data: result,
  });
});

export const ExamGuidelineController = {
  createExamGuideline,
  getAllExamGuidelines,
  getSingleExamGuideline,
  updateExamGuideline,
  deleteExamGuideline,
};
