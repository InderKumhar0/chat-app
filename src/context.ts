import { PrismaClient } from '@prisma/client';
import { graphQlContext } from './utils/graphQlContext.js';

export interface Context {
  prisma: PrismaClient;
  user?: any;
}

export async function createContext({
  req,
  connection,
}: any): Promise<Context> {
  if (connection) {
    return connection.context;
  }

  const token = req.headers.authorization?.replace('Bearer ', '');
  return graphQlContext(token);
}
