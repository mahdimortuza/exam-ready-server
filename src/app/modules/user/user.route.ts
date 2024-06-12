import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { createStudentValidationSchema } from '../student/student.validation';
import { UserController } from './user.controller';

const router = express.Router();

router.post(
  '/create-student',
  validateRequest(createStudentValidationSchema),
  UserController.createStudent,
);

router.post('/create-student-plus', UserController.createStudentPlus);

router.post('/create-admin', UserController.createAdmin);

router.post('/create-normal-user', UserController.createNormalUser);

export const UserRoutes = router;
