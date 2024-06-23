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

const getMe = catchAsync(async (req, res) => {
  // const token = req.headers.authorization;

  // if (!token) {
  //   throw new AppError(httpStatus.NOT_FOUND, 'Token not found!');
  // }

  const { email, role } = req.user;
  const result = await UserService.getMe(email, role);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is retrieved successfully',
    data: result,
  });
});

const changeStatus = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await UserService.changeStatus(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User status is updated successfully',
    data: result,
  });
});

const changeStudentRole = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await UserService.changeStudentRole(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student role is updated successfully',
    data: result,
  });
});

export const UserController = {
  createStudent,
  createStudentPlus,
  createAdmin,
  createNormalUser,
  getMe,
  changeStatus,
  changeStudentRole,
};
