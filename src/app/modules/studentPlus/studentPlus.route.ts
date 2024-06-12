import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constants';
import { StudentPlusControllers } from './studentPlus.controller';

const router = express.Router();

// will call controller
router.get(
  '/',
  auth(USER_ROLE.admin),
  StudentPlusControllers.getAllStudentPlus,
);
router.get(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.studentPlus),
  StudentPlusControllers.getSingleStudentPlus,
);
router.patch(
  '/:id',
  auth(USER_ROLE.studentPlus),
  StudentPlusControllers.updateStudentPlus,
);
router.delete(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.studentPlus),
  StudentPlusControllers.deleteStudentPlus,
);

export const StudentPlusRoutes = router;
