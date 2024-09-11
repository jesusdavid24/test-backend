import { Router } from 'express';
import passport from 'passport';
import { checkRole } from '@middleware/verifyRole';

import { 
  getIdentificationType,
  createIdentificationType,
  deleteIdentificationType,
  updateIdentificationType 
} from './identificationType.controller';

const router = Router();

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  checkRole('ADMIN'),
  getIdentificationType
);

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  checkRole('ADMIN'),
  createIdentificationType
);

router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  checkRole('ADMIN'),
  deleteIdentificationType
);

router.put(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  checkRole('ADMIN'),
  updateIdentificationType
);

export default router;