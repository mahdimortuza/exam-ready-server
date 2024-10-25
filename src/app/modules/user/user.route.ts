import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { createStudentValidationSchema } from '../students/student.validation';
import { USER_ROLE } from './user.constants';
import { UserController } from './user.controller';
import { UserValidation } from './user.validation';

const router = express.Router();

router.post(
  '/create-student',
  validateRequest(createStudentValidationSchema),
  UserController.createStudent,
);

router.post('/create-admin', UserController.createAdmin);

router.get(
  '/me',
  auth(
    USER_ROLE.super_admin,
    USER_ROLE.admin,
    USER_ROLE.student_plus,
    USER_ROLE.student,
    USER_ROLE.user,
  ),
  UserController.getMe,
);

// change status for the students either it is blocked or in-progress
router.patch('/change-payment-status/:id', UserController.changePaymentStatus);

// change status for the students either it is blocked or in-progress
router.patch(
  '/change-status/:id',
  // auth(USER_ROLE.admin),
  validateRequest(UserValidation.changeStatusValidationSchema),
  UserController.changeStatus,
);

// change user role of the users user/student/studentPlus/admin
router.patch(
  '/change-role/:id',
  // auth(USER_ROLE.admin),
  validateRequest(UserValidation.changeStudentRoleValidationSchema),
  UserController.changeStudentRole,
);

export const UserRoutes = router;
