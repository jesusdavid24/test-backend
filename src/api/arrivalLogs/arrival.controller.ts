import { type Request, type Response } from 'express';
import { type ArrivalLogs } from './arrival.type';
import errorHandler from '@utils/errorHandler';

import { 
  create,
  getAllArrival, 
  getArrivalsByUserId
} from './arrival.service';

export async function getArrival(req: Request, res: Response) {
  try {
    const arrivals = await getAllArrival();
    return res.status(200).send(arrivals);
  } catch (exception: unknown) {
    const message = errorHandler(exception);
    return res.status(400).send({ message });
  }
}

export async function createArrivalLogs(req: Request, res: Response) {
  try {
    const data: ArrivalLogs = req.body;
    const arrival = await create(data);

    return res.status(201).json(arrival);
  } catch (exception: unknown) {
    const message = errorHandler(exception);
    return res.status(400).send({ message });
  }
}

export async function getUserArrivals(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const arrivals = await getArrivalsByUserId(id);

    if (!arrivals.length) {
      return res.status(404).json({
        message: 'No arrival logs found for this user',
      });
    }

    return res.status(200).send(arrivals);
  } catch (exception: unknown) {
    const message = errorHandler(exception);
    return res.status(400).send({ message });
  }
}
