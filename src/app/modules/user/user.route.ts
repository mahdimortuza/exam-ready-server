import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { createStudentValidationSchema } from '../student/student.validation';
import { USER_ROLE } from './user.constants';
import { UserController } from './user.controller';

const router = express.Router();

router.post(
  '/create-student',
  auth(USER_ROLE.admin),
  validateRequest(createStudentValidationSchema),
  UserController.createStudent,
);

router.post('/create-student-plus', UserController.createStudentPlus);

router.post('/create-admin', UserController.createAdmin);

router.post('/create-normal-user', UserController.createNormalUser);

export const UserRoutes = router;
