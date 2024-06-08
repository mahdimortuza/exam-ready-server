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

const getSingleStudentResult = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const result = await ResultServices.getSingleStudentResultFromDb(studentId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student result is retrieved successfully.',
    data: result,
  });
});

export const ResultController = {
  getAllResults,
  getSingleStudentResult,
};
