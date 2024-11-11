import express from 'express';
import { SyllabusController } from './examSyllabus.controller';
const router = express.Router();

router.post('/create-syllabus', SyllabusController.createSyllabus);

router.get('/', SyllabusController.getAllSyllabuses);

router.get('/:id', SyllabusController.getSingleSyllabus);

router.patch('/:id', SyllabusController.updateSyllabus);
router.delete('/:id', SyllabusController.deleteSyllabus);

export const SyllabusRoutes = router;
