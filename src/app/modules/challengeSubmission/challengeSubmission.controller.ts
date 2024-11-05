import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ChallengeSubmissionServices } from './challengeSubmission.service';

const submitChallengeSubmission = catchAsync(async (req, res) => {
  const notice = req.body;
  const result =
    await ChallengeSubmissionServices.submitChallengeSubmissionIntoDb(notice);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Challenge is submitted successfully',
    data: result,
  });
});

const getAllChallengeSubmission = catchAsync(async (req, res) => {
  const result =
    await ChallengeSubmissionServices.getAllChallengeSubmissionFromDb();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Challenges are fetched successfully',
    data: result,
  });
});

const getStudentChallengeSubmission = catchAsync(async (req, res) => {
  const { createdBy } = req.params;
  const result =
    await ChallengeSubmissionServices.getStudentChallengeSubmissionFromDb(
      createdBy,
    );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Challenges is retrieved successfully.',
    data: result,
  });
});

const deleteChallengeSubmission = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result =
    await ChallengeSubmissionServices.deleteChallengeSubmissionFromDb(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Challenge is deleted successfully',
    data: result,
  });
});

export const ChallengeSubmissionController = {
  submitChallengeSubmission,
  getAllChallengeSubmission,
  getStudentChallengeSubmission,
  deleteChallengeSubmission,
};
