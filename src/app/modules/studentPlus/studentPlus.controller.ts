import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { StudentPlusServices } from './studentPlus.service';

const getAllStudentPlus = catchAsync(async (req, res) => {
  const result = await StudentPlusServices.getAllStudentPlusFromDb(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'students are fetched successfully',
    data: result,
  });
});

const getSingleStudentPlus = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await StudentPlusServices.getSingleStudentPlusFromDb(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'student is fetched successfully',
    data: result,
  });
});

const updateStudentPlus = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { student: studentData } = req.body;
  const result = await StudentPlusServices.updateStudentPlusIntoDb(
    id,
    studentData,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'student is updated successfully',
    data: result,
  });
});

const deleteStudentPlus = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await StudentPlusServices.deleteStudentPlusFromDb(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'student is deleted successfully',
    data: result,
  });
});

export const StudentPlusControllers = {
  getAllStudentPlus,
  getSingleStudentPlus,
  updateStudentPlus,
  deleteStudentPlus,
};
