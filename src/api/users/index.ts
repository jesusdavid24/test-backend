import { Router } from 'express';
import passport from 'passport';
import { checkRole } from '@middleware/verifyRole';

import {
  getUsers,
  getUserById,
  createUser,
  deleteUser,
  updateUser
} from './user.controller';

const router = Router();

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  checkRole('ADMIN'),
  getUsers
);

router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  checkRole('ADMIN', 'EMPLOYEE'),
  getUserById
);

router.post('/',
  passport.authenticate('jwt', { session: false }),
  checkRole('ADMIN'), 
  createUser
);

router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  checkRole('ADMIN'),
  deleteUser
);

router.put(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  checkRole('ADMIN', 'CUSTOMER'),
  updateUser
);

export default router;
