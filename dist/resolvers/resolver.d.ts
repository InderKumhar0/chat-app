export declare const resolvers: {
    Query: {
        chatRooms: (_: any, { skip, limit, sortBy, sortOrder, }: {
            skip?: number;
            limit?: number;
            sortBy?: string;
            sortOrder?: "asc" | "desc";
        }, ctx: import("../context.js").Context) => Promise<{
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userOneId: string;
            userTwoId: string;
        }[]>;
        chats: (_: any, { roomId, skip, limit, sortBy, sortOrder, }: {
            roomId: string;
            skip?: number;
            limit?: number;
            sortBy?: string;
            sortOrder?: "asc" | "desc";
        }, ctx: import("../context.js").Context) => Promise<{
            id: string;
            createdAt: Date;
            updatedAt: Date;
            roomId: string;
            message: string;
            senderId: string;
            receiverId: string;
        }[]>;
        me: (_: any, __: any, ctx: import("../context.js").Context) => Promise<any>;
        users: (_: any, { skip, limit, sortBy, sortOrder, }: {
            skip?: number;
            limit?: number;
            sortBy?: string;
            sortOrder?: "asc" | "desc";
        }, ctx: import("../context.js").Context) => Promise<{
            id: string;
            email: string;
            name: string;
            password: string;
            createdAt: Date;
            updatedAt: Date;
        }[]>;
    };
    Mutation: {
        createChatRoom: (_: any, args: {
            input: import("../types.js").ChatRoomInput;
        }, ctx: import("../context.js").Context) => Promise<{
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userOneId: string;
            userTwoId: string;
        }>;
        sendMessage: (_: any, args: {
            input: import("../types.js").ChatInput;
        }, ctx: import("../context.js").Context) => Promise<{
            id: string;
            createdAt: Date;
            updatedAt: Date;
            roomId: string;
            message: string;
            senderId: string;
            receiverId: string;
        }>;
        signup: (_: any, args: {
            input: import("../types.js").SignupInput;
        }) => Promise<{
            token: string;
            user: {
                id: string;
                email: string;
                name: string;
                password: string;
                createdAt: Date;
                updatedAt: Date;
            };
        }>;
        login: (_: any, args: {
            input: import("../types.js").LoginInput;
        }) => Promise<{
            token: string;
            user: {
                id: string;
                email: string;
                name: string;
                password: string;
                createdAt: Date;
                updatedAt: Date;
            };
        }>;
    };
    Subscription: {
        messageAdded: {
            subscribe: (_: any, { roomId }: {
                roomId: string;
            }, ctx: import("../context.js").Context) => Promise<import("graphql-subscriptions/dist/pubsub-async-iterable-iterator.js").PubSubAsyncIterableIterator<unknown>>;
            resolve: (payload: any) => any;
        };
    };
    User: {
        chatRooms1: (parent: any) => import("@prisma/client").Prisma.PrismaPromise<{
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userOneId: string;
            userTwoId: string;
        }[]>;
        chatRooms2: (parent: any) => import("@prisma/client").Prisma.PrismaPromise<{
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userOneId: string;
            userTwoId: string;
        }[]>;
        messages: (parent: any) => import("@prisma/client").Prisma.PrismaPromise<{
            id: string;
            createdAt: Date;
            updatedAt: Date;
            roomId: string;
            message: string;
            senderId: string;
            receiverId: string;
        }[]>;
        receivedMessages: (parent: any) => import("@prisma/client").Prisma.PrismaPromise<{
            id: string;
            createdAt: Date;
            updatedAt: Date;
            roomId: string;
            message: string;
            senderId: string;
            receiverId: string;
        }[]>;
    };
    ChatRoom: {
        userOne: (parent: any) => import("@prisma/client").Prisma.Prisma__UserClient<{
            id: string;
            email: string;
            name: string;
            password: string;
            createdAt: Date;
            updatedAt: Date;
        } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
        userTwo: (parent: any) => import("@prisma/client").Prisma.Prisma__UserClient<{
            id: string;
            email: string;
            name: string;
            password: string;
            createdAt: Date;
            updatedAt: Date;
        } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
        chats: (parent: any) => import("@prisma/client").Prisma.PrismaPromise<{
            id: string;
            createdAt: Date;
            updatedAt: Date;
            roomId: string;
            message: string;
            senderId: string;
            receiverId: string;
        }[]>;
    };
    Chat: {
        room: (parent: any) => import("@prisma/client").Prisma.Prisma__ChatRoomClient<{
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userOneId: string;
            userTwoId: string;
        } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
        sender: (parent: any) => import("@prisma/client").Prisma.Prisma__UserClient<{
            id: string;
            email: string;
            name: string;
            password: string;
            createdAt: Date;
            updatedAt: Date;
        } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
        receiver: (parent: any) => import("@prisma/client").Prisma.Prisma__UserClient<{
            id: string;
            email: string;
            name: string;
            password: string;
            createdAt: Date;
            updatedAt: Date;
        } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    };
};
//# sourceMappingURL=resolver.d.ts.map