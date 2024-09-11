import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { type PayloadType } from './auth.type';

const prisma = new PrismaClient();

const SECRET = process.env.JWT_SECRET!

export function verifyToken(token: string) {
  const decoded = jwt.verify(token, SECRET) as PayloadType

  return decoded;
}

export function signToken(payload: PayloadType) {
  const token = jwt.sign(payload, SECRET, { expiresIn: `${1000 * 60 * 60}` })

  return token;
}
