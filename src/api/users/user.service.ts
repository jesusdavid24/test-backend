import { PrismaClient } from '@prisma/client';
import { hashPassword } from '@utils/bcrypt';
import { type User } from './user.type';

const prisma = new PrismaClient();

export async function getAllUser() {
  const users = await prisma.user.findMany({
    where: {
      isActive: true
    }
  });
  return users;
}

export async function create(input: User ) {
  const hashedPassword = await hashPassword(input.password);

  const data = {
    ...input,
    password: hashedPassword,
  };

  const user = await prisma.user.create({
    data: {
      ...data,
      isActive: true
    }
  });

  return user;
}

export async function getUserById(id: string) {
  const user = await prisma.user.findUnique({
    where: { id, },  
  });

  return user;
}

export async function getById(id: string) {
  const user = await prisma.user.findUnique({
    where: {
      id,
    }
  });


  return user!;
}

export async function getUserByEmail(email: string) {
  const user = await prisma.user.findUnique({
    where: {
      email
    }
  });

  return user;
}

export async function destroy(id: string) {
  const user = await prisma.user.update({
    where: {
      id,
    },
    data: {
      isActive: false,
      isDeleted: true
    }
  });

  return user;
}

export async function put(id: string, data: Partial<User>) {
  const user = await prisma.user.update({
    where: {
      id,
    },
    data
  })

  return user;
}

