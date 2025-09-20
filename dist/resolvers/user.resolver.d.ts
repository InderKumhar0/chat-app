import type { Context } from '../context.js';
export declare const userResolvers: {
    Query: {
        me: (_: any, __: any, ctx: Context) => Promise<any>;
        users: (_: any, { skip, limit, sortBy, sortOrder, }: {
            skip?: number;
            limit?: number;
            sortBy?: string;
            sortOrder?: "asc" | "desc";
        }, ctx: Context) => Promise<{
            id: string;
            email: string;
            name: string;
            password: string;
            createdAt: Date;
            updatedAt: Date;
        }[]>;
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
//# sourceMappingURL=user.resolver.d.ts.map