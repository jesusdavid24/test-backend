import { type Request, type Response } from 'express';

import errorHandler from '@utils/errorHandler';
import { signToken } from './auth.service';
import { type User } from '@api/users/user.type';


export async function login(req: Request, res: Response) {

  try {
    const user = req.user as User;

    const payload = {
      id: user.id,
      name: `${user.firstName} ${user.lastName}`,
      role: user.role
    }

    const token = signToken(payload);

    const userLogged = {
      name: `${user.firstName} ${user.lastName}`,
      role: user.role,
    }

    res.json({ token, userLogged });

  } catch (exception: unknown) {
    const message = errorHandler(exception);
    res.status(400).send({ message });
  }
}
