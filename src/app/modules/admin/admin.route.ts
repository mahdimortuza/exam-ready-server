import express from 'express';
import auth from '../../middlewares/auth';
import { AdminControllers } from './admin.controller';

const router = express.Router();

router.get('/', auth(), AdminControllers.getAllAdmins);
router.get('/:id', AdminControllers.getSingleAdmin);
router.patch('/:id', AdminControllers.updateAdmin);
router.delete('/:id', AdminControllers.deleteAdmin);

export const AdminRoutes = router;
