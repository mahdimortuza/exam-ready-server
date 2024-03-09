import { NextFunction, Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';
import { StudentServices } from './student.service';

const catchAsync = (fn: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((err) => next(err));
  };
};

const getAllStudents = catchAsync(async (req, res, next) => {
  const result = await StudentServices.getAllStudentFromDb();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'students are fetched successfully',
    data: result,
  });
});

const getSingleStudent = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const result = await StudentServices.getSingleStudentFromDb(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'student is fetched successfully',
    data: result,
  });
});

const updateStudent = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { student: studentData } = req.body;
  const result = await StudentServices.updateStudentIntoDb(id, studentData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'student is updated successfully',
    data: result,
  });
});

const deleteStudent = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const result = await StudentServices.deleteStudentFromDb(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'student is deleted successfully',
    data: result,
  });
});

export const StudentControllers = {
  getAllStudents,
  getSingleStudent,
  updateStudent,
  deleteStudent,
};
