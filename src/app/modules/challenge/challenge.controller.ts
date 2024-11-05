import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ChallengeServices } from './challenge.service';

const createChallenge = catchAsync(async (req, res) => {
  const challenge = req.body;
  const result = await ChallengeServices.createChallengeIntoDb(challenge);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Challenge is created successfully',
    data: result,
  });
});

const getAllChallenges = catchAsync(async (req, res) => {
  const result = await ChallengeServices.getAllChallengesFromDb();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Challenges are fetched successfully',
    data: result,
  });
});

const getSingleChallenge = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ChallengeServices.getSingleChallengeFromDb(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Challenge is retrieved successfully.',
    data: result,
  });
});

const updateChallenge = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ChallengeServices.updateChallengeIntoDb(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Challenge is updated successfully',
    data: result,
  });
});

const deleteChallenge = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ChallengeServices.deleteChallengeFromDb(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Challenge is updated successfully',
    data: result,
  });
});

export const ChallengeController = {
  createChallenge,
  getAllChallenges,
  getSingleChallenge,
  updateChallenge,
  deleteChallenge,
};
