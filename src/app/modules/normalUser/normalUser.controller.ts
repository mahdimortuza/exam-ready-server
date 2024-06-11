import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { NormalUserServices } from './normalUser.service';

const getAllNormalUser = catchAsync(async (req, res) => {
  const result = await NormalUserServices.getAllNormalUsersFromDb(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Normal users are fetched successfully',
    data: result,
  });
});

const getSingleNormalUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await NormalUserServices.getSingleNormalUserFromDb(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Normal user is fetched successfully',
    data: result,
  });
});

const updateNormalUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { normalUser: NormalUserData } = req.body;
  const result = await NormalUserServices.updateNormalUserIntoDb(
    id,
    NormalUserData,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Normal user is updated successfully',
    data: result,
  });
});

const deleteNormalUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await NormalUserServices.deleteNormalUserFromDb(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Normal user is deleted successfully',
    data: result,
  });
});

export const NormalUserControllers = {
  getAllNormalUser,
  getSingleNormalUser,
  updateNormalUser,
  deleteNormalUser,
};
