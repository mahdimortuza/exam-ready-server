import express from 'express';
import { ParticipationController } from './participation.controller';

const router = express.Router();

// router.post('/start', ParticipationController.startQuiz);
router.post('/submit', ParticipationController.submitAnswers);
router.get('/:userId/:quizId', ParticipationController.getResults);

export const ParticipationRoutes = router;
