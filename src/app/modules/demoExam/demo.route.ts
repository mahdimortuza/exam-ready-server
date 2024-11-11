import express from 'express';
import { DemoController } from './demo.controller';

const router = express.Router();

router.get(
  '/exam',
  // auth( USER_ROLE.student, USER_ROLE.studentPlus),
  DemoController.startDemoExam,
);
router.post('/submit', DemoController.submitDemoAnswers);

export const DemoRoutes = router;
