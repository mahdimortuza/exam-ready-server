import express from 'express';
import { CurrentAffairsController } from './currentAffairs.controller';
const router = express.Router();

router.post(
  '/create-current-affairs',
  CurrentAffairsController.createCurrentAffairs,
);

router.get('/', CurrentAffairsController.getAllCurrentAffairs);

router.get('/:id', CurrentAffairsController.getSingleCurrentAffairs);

router.patch('/:id', CurrentAffairsController.updateCurrentAffairs);
router.delete('/:id', CurrentAffairsController.deleteCurrentAffairs);

export const CurrentAffairsRoutes = router;
