import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constants';
import { ParticipationController } from './participation.controller';

const router = express.Router();

router.get(
  '/exam',
  auth(USER_ROLE.normalUser, USER_ROLE.student, USER_ROLE.studentPlus),
  ParticipationController.startExam,
);
router.post(
  '/submit',
  auth(USER_ROLE.normalUser, USER_ROLE.student, USER_ROLE.studentPlus),
  ParticipationController.submitAnswers,
);

export const ParticipationRoutes = router;
