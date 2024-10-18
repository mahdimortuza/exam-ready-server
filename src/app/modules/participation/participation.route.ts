import express from 'express';
import { ParticipationController } from './participation.controller';

const router = express.Router();

router.get(
  '/exam',
  // auth( USER_ROLE.student, USER_ROLE.studentPlus),
  ParticipationController.startExam,
);
router.post('/submit', ParticipationController.submitAnswers);

export const ParticipationRoutes = router;
