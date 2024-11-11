import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { CurrentAffairsServices } from './currentAffairs.service';

const createCurrentAffairs = catchAsync(async (req, res) => {
  const currentAffairs = req.body;
  // console.log(req.body);
  const result =
    await CurrentAffairsServices.createCurrentAffairIntoDb(currentAffairs);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Current affair is created successfully',
    data: result,
  });
});

const getAllCurrentAffairs = catchAsync(async (req, res) => {
  const result = await CurrentAffairsServices.getAllCurrentAffairsFromDb();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Current affairs are fetched successfully',
    data: result,
  });
});

const getSingleCurrentAffairs = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CurrentAffairsServices.getSingleCurrentAffairsFromDb(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Current Affair is retrieved successfully.',
    data: result,
  });
});

const updateCurrentAffairs = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CurrentAffairsServices.updateCurrentAffairsIntoDb(
    id,
    req.body,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Current affairs is updated successfully',
    data: result,
  });
});

const deleteCurrentAffairs = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CurrentAffairsServices.deleteCurrentAffairsIntoDb(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Current affairs is deleted successfully',
    data: result,
  });
});

export const CurrentAffairsController = {
  createCurrentAffairs,
  getAllCurrentAffairs,
  getSingleCurrentAffairs,
  updateCurrentAffairs,
  deleteCurrentAffairs,
};
