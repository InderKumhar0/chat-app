import { PrismaClient } from '@prisma/client';
export interface Context {
    prisma: PrismaClient;
    user?: any;
}
export declare function createContext({ req, connection, }: any): Promise<Context>;
//# sourceMappingURL=context.d.ts.map