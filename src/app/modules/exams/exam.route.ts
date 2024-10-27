import express from 'express';
import { ExamController } from './exam.controller';

const router = express.Router();

router.post('/create-exam', ExamController.createExam);
router.get('/', ExamController.getAllExams);
router.get('/:id', ExamController.getSingleExams);
router.patch('/:id', ExamController.updateExam);
router.patch('/update-status/:id', ExamController.updateStatus);

export const ExamRoutes = router;
