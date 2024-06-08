import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ResultServices } from './result.service';

const getAllResults = catchAsync(async (req, res) => {
  const result = await ResultServices.getAllResultsFromDb();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All results are retrieved successfully',
    data: result,
  });
});

const getSingleStudentAllResult = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const result =
    await ResultServices.getSingleStudentAllResultFromDb(studentId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student results are retrieved successfully.',
    data: result,
  });
});

const getSingleStudentSingleResult = catchAsync(async (req, res) => {
  const { studentId, resultId } = req.params;
  const result = await ResultServices.getSingleStudentSingleResultFromDb(
    studentId,
    resultId,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student result is retrieved successfully.',
    data: result,
  });
});

export const ResultController = {
  getAllResults,
  getSingleStudentAllResult,
  getSingleStudentSingleResult,
};
