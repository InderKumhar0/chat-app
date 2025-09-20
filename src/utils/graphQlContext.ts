import jwt from 'jsonwebtoken';
import prisma from './prisma.js';
import type { Context } from '../context.js';

export async function graphQlContext(token?: string): Promise<Context> {
  if (!token) {
    return { prisma };
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });

    return { prisma, user };
  } catch (error) {
    return { prisma };
  }
}
