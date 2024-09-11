import { type Request, type Response } from 'express';
import { type User } from './user.type'
import errorHandler from '@utils/errorHandler';

import {
  create,
  getById,
  destroy,
  getAllUser,
  getUserByEmail,
  put
} from './user.service';

export async function getUsers(req: Request, res: Response) {
  try {
    const users = await getAllUser();
    return res.status(200).send(users);
  } catch (exception: unknown) {
    const message = errorHandler(exception);
    return res.status(400).send({ message });
  }
}

export async function getUserById(req: Request, res: Response) {
  try {

    const { id } = req.params;

    const user = await getById(id);

    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    return res.status(200).send(user);
  } catch (exception: unknown) {
    const message = errorHandler(exception);
    return res.status(400).send({ message });
  }
}

export async function createUser(req: Request, res: Response) {
  try {
    const data: User = req.body;
    const email = await getUserByEmail(data.email);

    if (email) throw new Error('Email already exists');
      
    const user = await create(data);
    return res.status(201).json(user)
  } catch (exception: unknown) {
    const message = errorHandler(exception);
    return res.status(400).send({ message });
  }
}

export async function deleteUser(req: Request, res: Response) {
  try {
    const { id } = req.params;
    await destroy(id);

    return res.end();

  } catch (exception: unknown) {
    const message = errorHandler(exception);
    return res.status(400).send({ message });
  }
}

export async function updateUser(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const data = req.body;

    const user = await put(id, data);

    return res.json(user);
  } catch (exception: unknown) {
    const message = errorHandler(exception);
    return res.status(400).send({ message });
  }
}