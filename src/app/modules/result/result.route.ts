import express from 'express';
import { ResultController } from './result.controller';

const router = express.Router();

router.get('/', ResultController.getAllResults);
router.get('/:studentId', ResultController.getSingleStudentAllResult);
router.get(
  '/:studentId/:resultId',
  ResultController.getSingleStudentSingleResult,
);

export const ResultRoutes = router;
