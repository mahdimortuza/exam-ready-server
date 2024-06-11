import express from 'express';
import auth from '../../middlewares/auth';
import { StudentPlusControllers } from './studentPlus.controller';

const router = express.Router();

// will call controller
router.get('/', auth(), StudentPlusControllers.getAllStudentPlus);
router.get('/:id', StudentPlusControllers.getSingleStudentPlus);
router.patch('/:id', StudentPlusControllers.updateStudentPlus);
router.delete('/:id', StudentPlusControllers.deleteStudentPlus);

export const StudentPlusRoutes = router;
