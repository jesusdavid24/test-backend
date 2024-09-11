import { PrismaClient } from '@prisma/client';
import { type ArrivalLogs } from './arrival.type';

const prisma = new PrismaClient();

export async function getAllArrival() {
  const arrival = await prisma.arrivalLogs.findMany({
    select:{
      id: true,
      arrival_time: true,
      user: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
        }
      }
    }
  });
  return arrival;
}

export async function create(data: ArrivalLogs) {
  const arrival = await prisma.arrivalLogs.create({
    data,
  })

  return arrival;
}

export async function getArrivalsByUserId(userId: string) {
  const arrivals = await prisma.arrivalLogs.findMany({
    where: { userId }
  });

  return arrivals;
}
