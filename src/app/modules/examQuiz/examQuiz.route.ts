import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import createExamQuizValidationSchema from '../examQuiz/examQuiz.validation';
import { USER_ROLE } from '../user/user.constants';
import { ExamQuizController } from './examQuiz.controller';

const router = express.Router();

router.post(
  '/create-exam-quiz',
  auth(USER_ROLE.admin),
  validateRequest(createExamQuizValidationSchema),
  ExamQuizController.createExamQuiz,
);

router.get('/', auth(USER_ROLE.admin), ExamQuizController.getAllExamQuiz);

router.get(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.student, USER_ROLE.studentPlus),
  ExamQuizController.getSingleExamQuiz,
);
router.patch(
  '/:id',
  auth(USER_ROLE.admin),
  ExamQuizController.updateSingleExamQuiz,
);

export const ExamQuizRoutes = router;
