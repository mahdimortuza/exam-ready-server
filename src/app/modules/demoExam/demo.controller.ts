import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { DemoServices } from './demo.service';

const startDemoExam = catchAsync(async (req, res) => {
  const result = await DemoServices.startDemoExam();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Quiz started successfully',
    data: result,
  });
});

const submitDemoAnswers = catchAsync(async (req, res) => {
  const { answers } = req.body;
  // console.log('Received submission:', req.body);
  const result = await DemoServices.submitDemoAnswers(answers);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Quiz submitted successfully',
    data: result,
  });
});

export const DemoController = {
  startDemoExam,
  submitDemoAnswers,
};
