import { PrismaClient } from '@prisma/client';
import { graphQlContext } from './utils/graphQlContext.js';
export async function createContext({ req, connection, }) {
    if (connection) {
        return connection.context;
    }
    const token = req.headers.authorization?.replace('Bearer ', '');
    return graphQlContext(token);
}
//# sourceMappingURL=context.js.map