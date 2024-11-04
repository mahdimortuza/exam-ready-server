import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { NoticeServices } from './notice.service';

const createNotice = catchAsync(async (req, res) => {
  const notice = req.body;
  const result = await NoticeServices.createNoticeIntoDb(notice);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Notice is created successfully',
    data: result,
  });
});

const getAllNotices = catchAsync(async (req, res) => {
  const result = await NoticeServices.getAllNoticesFromDb();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Notices are fetched successfully',
    data: result,
  });
});

const getSingleNotice = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await NoticeServices.getSingleNoticeFromDb(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Notice is retrieved successfully.',
    data: result,
  });
});

const updateNoticeIntoDb = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await NoticeServices.updateNoticeIntoDb(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Notice name is updated successfully',
    data: result,
  });
});

export const NoticeController = {
  createNotice,
  getAllNotices,
  getSingleNotice,
  updateNoticeIntoDb,
};
