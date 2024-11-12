import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { QuestionBankServices } from './questionBank.service';

const createQuestionBank = catchAsync(async (req, res) => {
  const questionBank = req.body;
  const result =
    await QuestionBankServices.createQuestionBankIntoDb(questionBank);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Question bank is created successfully',
    data: result,
  });
});

const getAllQuestionBanks = catchAsync(async (req, res) => {
  const result = await QuestionBankServices.getAllQuestionBankFromDb(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Question banks are fetched successfully',
    meta: result.meta,
    data: result.result,
  });
});

const getSingleQuestionBank = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await QuestionBankServices.getSingleQuestionBankFromDb(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Question bank is retrieved successfully.',
    data: result,
  });
});

const updateQuestionBank = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await QuestionBankServices.updateQuestionBankIntoDb(
    id,
    req.body,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Question bank is updated successfully',
    data: result,
  });
});

const deleteQuestionBank = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await QuestionBankServices.deleteQuestionBankIntoDb(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Question bank is deleted successfully',
    data: result,
  });
});

export const QuestionBankController = {
  createQuestionBank,
  getAllQuestionBanks,
  getSingleQuestionBank,
  updateQuestionBank,
  deleteQuestionBank,
};
