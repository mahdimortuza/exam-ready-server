import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { SubjectNameServices } from './subjectName.service';

const createSubjectName = catchAsync(async (req, res) => {
  const subjectName = req.body;
  const result = await SubjectNameServices.createSubjectNameIntoDb(subjectName);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Subject name is created successfully',
    data: result,
  });
});

const getAllSubjectNames = catchAsync(async (req, res) => {
  const result = await SubjectNameServices.getAllSubjectNamesFromDb();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Subjects are fetched successfully',
    data: result,
  });
});

const getSingleSubjectName = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await SubjectNameServices.getSingleSubjectNameFromDb(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Subject name is retrieved successfully.',
    data: result,
  });
});

const updateSubjectName = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await SubjectNameServices.updateSubjectNameIntoDb(
    id,
    req.body,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Subject name is updated successfully',
    data: result,
  });
});

export const SubjectNameController = {
  createSubjectName,
  getAllSubjectNames,
  getSingleSubjectName,
  updateSubjectName,
};
