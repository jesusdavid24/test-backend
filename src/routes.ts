import { type Application } from 'express';
import userRouter from '@api/users';
import authRouter from '@auth/index';
import arrivalLogRouter from '@api/arrivalLogs';
import identifactionTypeRouter from '@api/identificationType';

const routes = (app: Application) => {
  app.use('/auth', authRouter);
  app.use('/api/user', userRouter);
  app.use('/api/arrival-log', arrivalLogRouter);
  app.use('/api/identification-type', identifactionTypeRouter);
}

export default routes;