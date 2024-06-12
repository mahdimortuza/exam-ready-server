import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constants';
import { SubjectNameController } from './subjectName.controller';
const router = express.Router();

router.post(
  '/create-subject-name',
  auth(USER_ROLE.admin),
  // validateRequest(createSubjectNameValidationSchema),

  SubjectNameController.createSubjectName,
);

router.get(
  '/',
  auth(USER_ROLE.admin),
  SubjectNameController.getAllSubjectNames,
);

router.get(
  '/:id',
  auth(USER_ROLE.admin),
  SubjectNameController.getSingleSubjectName,
);

router.patch(
  '/:id',
  auth(USER_ROLE.admin),
  SubjectNameController.updateSubjectName,
);

export const SubjectNameRoutes = router;
