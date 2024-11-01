import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ParticipationServices } from './participation.service';

const startExam = catchAsync(async (req, res) => {
  const result = await ParticipationServices.startExam();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Quiz started successfully',
    data: result,
  });
});

const submitAnswers = catchAsync(async (req, res) => {
  const { answers, studentEmail } = req.body;
  // console.log('Received submission:', req.body);
  const result = await ParticipationServices.submitAnswers(
    answers,
    studentEmail,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Quiz submitted successfully',
    data: result,
  });
});

export const ParticipationController = {
  startExam,
  submitAnswers,
};
