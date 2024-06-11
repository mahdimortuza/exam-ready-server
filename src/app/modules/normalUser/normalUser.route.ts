import express from 'express';
import auth from '../../middlewares/auth';
import { NormalUserControllers } from './normalUser.controller';

const router = express.Router();

// will call controller
router.get('/', auth(), NormalUserControllers.getAllNormalUser);
router.get('/:id', NormalUserControllers.getSingleNormalUser);
router.patch('/:id', NormalUserControllers.updateNormalUser);
router.delete('/:id', NormalUserControllers.deleteNormalUser);

export const NormalUserRoutes = router;
