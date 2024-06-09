import express from 'express';
import { ParticipationController } from './participation.controller';

const router = express.Router();

router.get('/exam', ParticipationController.startExam);
router.post('/submit', ParticipationController.submitAnswers);

export const ParticipationRoutes = router;
