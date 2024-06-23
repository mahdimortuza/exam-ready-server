import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { createStudentValidationSchema } from '../student/student.validation';
import { USER_ROLE } from './user.constants';
import { UserController } from './user.controller';
import { UserValidation } from './user.validation';

const router = express.Router();

router.post(
  '/create-student',
  auth(USER_ROLE.admin),
  validateRequest(createStudentValidationSchema),
  UserController.createStudent,
);

router.post(
  '/create-student-plus',
  auth(USER_ROLE.admin),
  UserController.createStudentPlus,
);

router.post('/create-admin', UserController.createAdmin);

router.post('/create-normal-user', UserController.createNormalUser);

router.get(
  '/me',
  auth(
    USER_ROLE.admin,
    USER_ROLE.studentPlus,
    USER_ROLE.student,
    USER_ROLE.normalUser,
  ),
  UserController.getMe,
);

router.post(
  '/change-status/:id',
  auth(USER_ROLE.admin),
  validateRequest(UserValidation.changeStatusValidationSchema),
  UserController.changeStatus,
);

router.post(
  '/change-role/:id',
  auth(USER_ROLE.admin),
  validateRequest(UserValidation.changeStudentRoleValidationSchema),
  UserController.changeStudentRole,
);

export const UserRoutes = router;
