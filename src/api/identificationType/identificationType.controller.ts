import { type Request, type Response } from 'express';
import { type IdentificationType } from '@prisma/client';
import errorHandler from '@utils/errorHandler';

import { 
  put, 
  create,
  destroy,
  getAllIdentificationType,
} from './identificationType.service';

export async function getIdentificationType(req: Request, res: Response) {
  try {
    const identificationType = await getAllIdentificationType();
    return res.status(200).send(identificationType);
  } catch (exception: unknown) {
    const message = errorHandler(exception);
    return res.status(400).send({ message });
  }
}

export async function createIdentificationType(req: Request, res: Response) {
  try {
    const data: IdentificationType = req.body;

    const user = await create(data);
    return res.status(201).json(user)
  } catch (exception: unknown) {
    const message = errorHandler(exception);
    return res.status(400).send({ message });
  }
}

export async function deleteIdentificationType(req: Request, res: Response) {
  try {
    const { id } = req.params;
    await destroy(id);

    return res.end();

  } catch (exception: unknown) {
    const message = errorHandler(exception);
    return res.status(400).send({ message });
  }
}

export async function updateIdentificationType(req: Request, res: Response) {
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