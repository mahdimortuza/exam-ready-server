import express from 'express';
import { SubjectNameController } from './subjectName.controller';
const router = express.Router();

router.post(
  '/create-subject-name',
  // validateRequest(createSubjectNameValidationSchema),
  SubjectNameController.createSubjectName,
);

router.get('/', SubjectNameController.getAllSubjectNames);

router.get('/:id', SubjectNameController.getSingleSubjectName);

router.patch('/:id', SubjectNameController.updateSubjectName);

export const SubjectNameRoutes = router;
