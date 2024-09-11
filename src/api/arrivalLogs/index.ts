import { Router } from 'express';
import passport from 'passport';
import { checkRole } from '@middleware/verifyRole';

import { 
  getArrival, 
  getUserArrivals,
  createArrivalLogs 
} from './arrival.controller';

const router = Router();

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  checkRole('ADMIN'),
  getArrival
);

router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  checkRole('EMPLOYEE'),
  getUserArrivals
);


router.post(
  '/', 
  passport.authenticate('jwt', { session: false }),
  checkRole('ADMIN', 'EMPLOYEE'),
  createArrivalLogs
);

export default router;