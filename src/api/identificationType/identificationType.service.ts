import { PrismaClient } from '@prisma/client';
import { type IdentificationType } from '@prisma/client';

const prisma = new PrismaClient();

export async function getAllIdentificationType() {
  const identificationType = await prisma.identificationType.findMany();
  return identificationType
}

export async function create(data: IdentificationType) {
  const identificationType = await prisma.identificationType.create({
    data,
  })

  return identificationType;
}

export async function destroy(id: string) {
  const identificationType = await prisma.identificationType.delete({
    where: {
      id,
    },
  })  

  return identificationType;
}

export async function put(id: string, data: Partial<IdentificationType>) {
  const identificationType = await prisma.identificationType.update({
    where: { id },
    data
  })

  return identificationType;
}