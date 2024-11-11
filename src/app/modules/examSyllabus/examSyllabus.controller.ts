import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { SyllabusServices } from './examSyllabus.service';

const createSyllabus = catchAsync(async (req, res) => {
  const syllabus = req.body;
  const result = await SyllabusServices.createSyllabusIntoDb(syllabus);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Syllabus is created successfully',
    data: result,
  });
});

const getAllSyllabuses = catchAsync(async (req, res) => {
  const result = await SyllabusServices.getAllSyllabusesFromDb();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Syllabuses are fetched successfully',
    data: result,
  });
});

const getSingleSyllabus = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await SyllabusServices.getSingleSyllabusFromDb(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Syllabus is retrieved successfully.',
    data: result,
  });
});

const updateSyllabus = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await SyllabusServices.updateSyllabusIntoDb(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Subject name is updated successfully',
    data: result,
  });
});

const deleteSyllabus = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await SyllabusServices.deleteSyllabusIntoDb(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Syllabus is deleted successfully',
    data: result,
  });
});

export const SyllabusController = {
  createSyllabus,
  getAllSyllabuses,
  getSingleSyllabus,
  updateSyllabus,
  deleteSyllabus,
};
