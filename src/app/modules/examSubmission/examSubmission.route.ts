import express from 'express';
import { ExamSubmissionController } from './examSubmission.controller';

const router = express.Router();

router.get('/:id', ExamSubmissionController.getSingleExams);
router.post('/submit', ExamSubmissionController.examSubmission);
router.get('/', ExamSubmissionController.getSubmittedExamResults);

export const ExamSubmissionRoutes = router;
