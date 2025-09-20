import dotenv from 'dotenv';
import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express5';
import cors from 'cors';
import { typeDefs } from './schema.js';
import { resolvers } from './resolvers/resolver.js';
import { createContext } from './context.js';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { WebSocketServer } from 'ws';
import http from 'http';
import { useServer } from 'graphql-ws/use/ws';
import prisma from './utils/prisma.js';
import { graphQlContext } from './utils/graphQlContext.js';
import { formatApolloError } from './utils/errorformatter.js';
dotenv.config();
const PORT = process.env.PORT ? Number(process.env.PORT) : 4000;
const schema = makeExecutableSchema({ typeDefs, resolvers });
async function start() {
    const app = express();
    const httpServer = http.createServer(app);
    const wsServer = new WebSocketServer({
        server: httpServer,
        path: '/graphql',
    });
    const serverCleanup = useServer({
        schema,
        context: async (ctx) => {
            const authHeader = ctx.connectionParams?.authorization ||
                ctx.connectionParams?.Authorization;
            const token = typeof authHeader === 'string'
                ? authHeader.replace('Bearer ', '')
                : undefined;
            if (!token) {
                return { prisma };
            }
            return graphQlContext(token);
        },
    }, wsServer);
    const server = new ApolloServer({
        schema,
        plugins: [
            {
                async serverWillStart() {
                    return {
                        async drainServer() {
                            await serverCleanup.dispose();
                        },
                    };
                },
            },
        ],
        formatError: formatApolloError,
    });
    await server.start();
    app.use(cors());
    app.use(express.json());
    app.use('/api', (req, res) => res.status(200).json({
        message: 'Hello from chat-app server',
        graphqlEndpoint: '/graphql',
    }));
    app.use('/graphql', expressMiddleware(server, { context: createContext }));
    httpServer.listen(PORT, () => {
        console.log(`Server ready at http://localhost:${PORT}/graphql`);
        console.log(`Subscriptions ready at ws://localhost:${PORT}/graphql`);
        console.log(`http://localhost:${PORT}/api`);
    });
}
start().catch((error) => {
    console.error('Failed to start server:', error);
    process.exit(1);
});
//# sourceMappingURL=index.js.map