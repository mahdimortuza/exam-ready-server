import express from 'express';
import { ExamGuidelineController } from './examGuidelines.controller';
const router = express.Router();

router.post(
  '/create-exam-guideline',
  ExamGuidelineController.createExamGuideline,
);

router.get('/', ExamGuidelineController.getAllExamGuidelines);

router.get('/:id', ExamGuidelineController.getSingleExamGuideline);

router.patch('/:id', ExamGuidelineController.updateExamGuideline);

router.delete('/:id', ExamGuidelineController.deleteExamGuideline);

export const ExamGuidelinesRoutes = router;
