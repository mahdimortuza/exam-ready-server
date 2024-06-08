import express from 'express';
import { ResultController } from './result.controller';

const router = express.Router();

router.get('/', ResultController.getAllResults);
router.get('/:studentId', ResultController.getSingleStudentResult);

export const ResultRoutes = router;
