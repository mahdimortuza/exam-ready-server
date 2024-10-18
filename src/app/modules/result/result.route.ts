import express from 'express';
import { ResultController } from './result.controller';

const router = express.Router();

router.get(
  '/',
  // auth(USER_ROLE.admin),
  ResultController.getAllResults,
);
router.get(
  '/:studentId',
  // USER_ROLE.student, USER_ROLE.student_plus),
  ResultController.getSingleStudentAllResult,
);
router.get(
  '/:studentId/:resultId',
  // , USER_ROLE.student, USER_ROLE.student_plus),
  ResultController.getSingleStudentSingleResult,
);

export const ResultRoutes = router;
