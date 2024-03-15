import express from 'express';
import { ExamQuizController } from './examQuiz.controller';

const router = express.Router();

router.post('/create-exam-quiz', ExamQuizController.createExamQuiz);

export const ExamQuizRoutes = router;
