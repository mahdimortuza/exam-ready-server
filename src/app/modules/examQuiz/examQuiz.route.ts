import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import createExamQuizValidationSchema from '../examQuiz/examQuiz.validation';
import { ExamQuizController } from './examQuiz.controller';

const router = express.Router();

router.post(
  '/create-exam-quiz',
  validateRequest(createExamQuizValidationSchema),
  ExamQuizController.createExamQuiz,
);

router.get('/', ExamQuizController.getAllExamQuiz);

router.get('/:id', ExamQuizController.getSingleExamQuiz);
router.patch('/:id', ExamQuizController.updateSingleExamQuiz);

export const ExamQuizRoutes = router;
