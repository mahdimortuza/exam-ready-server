import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ParticipationServices } from './participation.service';

const submitAnswers = catchAsync(async (req, res) => {
  const { answers, studentId } = req.body;
  const result = await ParticipationServices.submitAnswers(answers, studentId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Quiz submitted successfully',
    data: result,
  });
});

export const ParticipationController = {
  // startQuiz,
  submitAnswers,
};
