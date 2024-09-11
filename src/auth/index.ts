import { Router } from 'express';
import passport from 'passport';

import { login } from './auth.controller';

const router = Router();

router.post('/', passport.authenticate('local', { session: false }), login);

export default router;
