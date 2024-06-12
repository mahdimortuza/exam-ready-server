import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constants';
import { NormalUserControllers } from './normalUser.controller';

const router = express.Router();

// will call controller
router.get('/', auth(USER_ROLE.admin), NormalUserControllers.getAllNormalUser);
router.get(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.normalUser),
  NormalUserControllers.getSingleNormalUser,
);
router.patch(
  '/:id',
  auth(USER_ROLE.normalUser),
  NormalUserControllers.updateNormalUser,
);
router.delete(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.normalUser),
  NormalUserControllers.deleteNormalUser,
);

export const NormalUserRoutes = router;
