import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { SubjectNameController } from './subjectName.controller';
import createSubjectNameValidationSchema from './subjectName.validation';
const router = express.Router();

router.post(
  '/create-subject-name',
  validateRequest(createSubjectNameValidationSchema),
  SubjectNameController.createSubjectName,
);

router.patch('/:id', SubjectNameController.updateSubjectName);

export const SubjectNameRoutes = router;
