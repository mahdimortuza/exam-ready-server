import express from 'express';
import { ExamController } from './exam.controller';

const router = express.Router();

router.post('/', ExamController.createExam);
router.get('/', ExamController.getAllExams);
router.get('/:id', ExamController.getSingleExams);
router.patch('/:id', ExamController.updateExam);
router.patch('/update-status/:id', ExamController.updateStatus);
router.post('/exam-submit', ExamController.examSubmission);
router.get('/retrieve-exam-results', ExamController.retrieveAllExamResult);

export const ExamRoutes = router;
