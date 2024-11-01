import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ResultServices } from './result.service';

const getAllResults = catchAsync(async (req, res) => {
  const result = await ResultServices.getAllResultsFromDb(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All results are retrieved successfully',
    meta: result.meta,
    data: result.result,
  });
});

const getSingleStudentAllResult = catchAsync(async (req, res) => {
  const { studentEmail } = req.params;
  // console.log(studentEmail);
  const result =
    await ResultServices.getSingleStudentAllResultFromDb(studentEmail);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student results are retrieved successfully.',
    data: result,
  });
});

const getSingleStudentSingleResult = catchAsync(async (req, res) => {
  const { studentEmail, resultId } = req.params;
  console.log({ studentEmail, resultId });
  const result = await ResultServices.getSingleStudentSingleResultFromDb(
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

export const ResultController = {
  getAllResults,
  getSingleStudentAllResult,
  getSingleStudentSingleResult,
};
