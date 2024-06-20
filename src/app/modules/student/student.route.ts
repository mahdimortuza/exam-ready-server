import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { USER_ROLE } from '../user/user.constants';
import { StudentControllers } from './student.controller';
import { updateStudentValidationSchema } from './student.validation';

const router = express.Router();

// will call controller
router.get('/', auth(USER_ROLE.admin), StudentControllers.getAllStudents);

router.get('/:id', auth(USER_ROLE.admin), StudentControllers.getSingleStudent);

router.patch(
  '/:id',
  auth(USER_ROLE.student),
  validateRequest(updateStudentValidationSchema),
  StudentControllers.updateStudent,
);
router.delete(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.admin),
  StudentControllers.deleteStudent,
);

export const StudentRoutes = router;
