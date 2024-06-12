import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constants';
import { ResultController } from './result.controller';

const router = express.Router();

router.get('/', auth(USER_ROLE.admin), ResultController.getAllResults);
router.get(
  '/:studentId',
  auth(USER_ROLE.normalUser, USER_ROLE.student, USER_ROLE.studentPlus),
  ResultController.getSingleStudentAllResult,
);
router.get(
  '/:studentId/:resultId',
  auth(USER_ROLE.normalUser, USER_ROLE.student, USER_ROLE.studentPlus),
  ResultController.getSingleStudentSingleResult,
);

export const ResultRoutes = router;
