import type { Context } from '../context.js';
import type { ChatInput, ChatRoomInput } from '../types.js';
export declare const chatResolvers: {
    Query: {
        chatRooms: (_: any, { skip, limit, sortBy, sortOrder, }: {
            skip?: number;
            limit?: number;
            sortBy?: string;
            sortOrder?: "asc" | "desc";
        }, ctx: Context) => Promise<{
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
};
//# sourceMappingURL=chat.resolver.d.ts.map