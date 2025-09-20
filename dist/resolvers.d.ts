import type { Context } from './context.js';
import type { ChatInput, ChatRoomInput, LoginInput, SignupInput } from './types.js';
export declare const resolvers: {
    Query: {
        me: (_: any, __: any, ctx: Context) => Promise<any>;
        users: (_: any, __: any, ctx: Context) => Promise<{
            id: string;
            email: string;
            name: string;
            password: string;
            createdAt: Date;
            updatedAt: Date;
        }[]>;
        chatRooms: (_: any, { userId }: {
            userId: string;
        }, ctx: Context) => Promise<{
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userOneId: string;
            userTwoId: string;
        }[]>;
        chats: (_: any, { roomId }: {
            roomId: string;
        }, ctx: Context) => Promise<{
            id: string;
            createdAt: Date;
            updatedAt: Date;
            roomId: string;
            message: string;
            senderId: string;
            receiverId: string;
        }[]>;
    };
    Mutation: {
        signup: (_: any, args: {
            input: SignupInput;
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
            input: LoginInput;
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
        createChatRoom: (_: any, args: {
            input: ChatRoomInput;
        }, ctx: Context) => Promise<{
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userOneId: string;
            userTwoId: string;
        }>;
        sendMessage: (_: any, args: {
            input: ChatInput;
        }, ctx: Context) => Promise<{
            id: string;
            createdAt: Date;
            updatedAt: Date;
            roomId: string;
            message: string;
            senderId: string;
            receiverId: string;
        }>;
    };
    Subscription: {
        messageAdded: {
            subscribe: (_: any, { roomId }: {
                roomId: string;
            }, ctx: Context) => Promise<import("graphql-subscriptions/dist/pubsub-async-iterable-iterator.js").PubSubAsyncIterableIterator<unknown>>;
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
//# sourceMappingURL=resolvers.d.ts.map