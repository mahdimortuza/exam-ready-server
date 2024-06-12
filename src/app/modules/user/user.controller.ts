import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserService } from './user.service';

const createStudent = catchAsync(async (req, res) => {
  const { password, student: studentData } = req.body;

  const result = await UserService.createStudentIntoDb(password, studentData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is created successfully',
    data: result,
  });
});

const createStudentPlus = catchAsync(async (req, res) => {
  const { password, studentPlus: studentPlusData } = req.body;
  const result = await UserService.createStudentPlusIntoDb(
    password,
    studentPlusData,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student plus is created successfully',
    data: result,
  });
});

const createAdmin = catchAsync(async (req, res) => {
  const { password, admin: adminData } = req.body;
  const result = await UserService.createAdminIntoDb(password, adminData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin is created successfully',
    data: result,
  });
});

const createNormalUser = catchAsync(async (req, res) => {
  const { password, normalUser: normalUserData } = req.body;
  const result = await UserService.createNormalUserIntoDb(
    password,
    normalUserData,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is created successfully',
    data: result,
  });
});

export const UserController = {
  createStudent,
  createStudentPlus,
  createAdmin,
  createNormalUser,
};
