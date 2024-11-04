import express from 'express';
import { ExamSubmissionController } from './examSubmission.controller';

const router = express.Router();

router.get('/:id', ExamSubmissionController.getSingleExams);
router.post('/submit', ExamSubmissionController.examSubmission);
router.get('/', ExamSubmissionController.getAllSubmittedExamResults);
router.get(
  '/single-student/:studentEmail',
  ExamSubmissionController.getSingleStudentAllExamResult,
);
router.get(
  '/single-student/:studentEmail/:resultId',
  ExamSubmissionController.getSingleStudentSingleExamResult,
);

export const ExamSubmissionRoutes = router;
