import prisma from '../utils/prisma.js';
import { MESSAGE_ADDED, pubsub } from '../pubsub.js';
import { AuthenticationError, ValidationError, ConflictError, NotFoundError, } from '../utils/error.js';
export const chatResolvers = {
    Query: {
        chatRooms: async (_, { skip = 0, limit = 20, sortBy = 'createdAt', sortOrder = 'asc', }, ctx) => {
            if (!ctx.user)
                throw new AuthenticationError();
            if (skip < 0)
                skip = 0;
            if (limit < 0 || limit > 100)
                limit = 20;
            const allowedSortFields = ['createdAt', 'updatedAt'];
            if (!allowedSortFields.includes(sortBy)) {
                throw new ValidationError(`Sort field must be one of: ${allowedSortFields.join(', ')}`);
            }
            if (sortOrder !== 'asc' && sortOrder !== 'desc') {
                throw new ValidationError('Sort order must be "asc" or "desc"');
            }
            const chatRooms = await prisma.chatRoom.findMany({
                where: { userOneId: ctx.user.id },
                skip,
                take: limit,
                orderBy: { [sortBy]: sortOrder },
            });
            return chatRooms;
        },
        chats: async (_, { roomId, skip = 0, limit = 20, sortBy = 'createdAt', sortOrder = 'asc', }, ctx) => {
            if (!ctx.user)
                throw new AuthenticationError();
            if (skip < 0)
                skip = 0;
            if (limit < 0 || limit > 100)
                limit = 20;
            const allowedSortFields = ['createdAt', 'updatedAt', 'message'];
            if (!allowedSortFields.includes(sortBy)) {
                throw new ValidationError(`Sort field must be one of: ${allowedSortFields.join(', ')}`);
            }
            if (sortOrder !== 'asc' && sortOrder !== 'desc') {
                throw new ValidationError('Sort order must be "asc" or "desc"');
            }
            const chats = await prisma.chat.findMany({
                where: { roomId },
                skip,
                take: limit,
                orderBy: { [sortBy]: sortOrder },
            });
            return chats;
        },
    },
    Mutation: {
        createChatRoom: async (_, args, ctx) => {
            if (!ctx.user)
                throw new AuthenticationError();
            const { userOneId, userTwoId } = args.input;
            if (!userOneId || !userTwoId) {
                throw new ValidationError('Both user IDs are required');
            }
            const [userOne, userTwo] = await Promise.all([
                prisma.user.findUnique({ where: { id: userOneId } }),
                prisma.user.findUnique({ where: { id: userTwoId } }),
            ]);
            if (!userOne || !userTwo) {
                throw new NotFoundError('One or both users not found');
            }
            const existingRoom = await prisma.chatRoom.findFirst({
                where: {
                    OR: [
                        {
                            AND: [{ userOneId: userOneId }, { userTwoId: userTwoId }],
                        },
                        {
                            AND: [{ userOneId: userTwoId }, { userTwoId: userOneId }],
                        },
                    ],
                },
            });
            if (existingRoom) {
                throw new ConflictError('Chat room already exists between these users');
            }
            let chat_room = await prisma.chatRoom.create({
                data: { userOneId, userTwoId },
            });
            return chat_room;
        },
        sendMessage: async (_, args, ctx) => {
            if (!ctx.user)
                throw new AuthenticationError();
            let { roomId, message } = args.input;
            if (!roomId || !message) {
                throw new ValidationError('Room ID and message are required');
            }
            if (message.trim().length === 0) {
                throw new ValidationError('Message cannot be empty');
            }
            let room = await prisma.chatRoom.findUnique({
                where: { id: roomId },
            });
            if (!room) {
                throw new NotFoundError('Chat room not found');
            }
            if (room.userOneId !== ctx.user.id && room.userTwoId !== ctx.user.id) {
                throw new AuthenticationError('Access denied to this chat room');
            }
            let senderId = args.input.senderId || ctx.user.id;
            let receiverId = room.userOneId !== senderId ? room.userOneId : room.userTwoId;
            let chatMessage = await prisma.chat.create({
                data: { roomId, senderId, receiverId, message },
            });
            await pubsub.publish(`${MESSAGE_ADDED}_${roomId}`, {
                messageAdded: chatMessage,
            });
            return chatMessage;
        },
    },
    Subscription: {
        messageAdded: {
            subscribe: async (_, { roomId }, ctx) => {
                if (!ctx.user)
                    throw new AuthenticationError('Subscription requires authentication');
                const room = await prisma.chatRoom.findUnique({
                    where: { id: roomId },
                });
                if (!room ||
                    (room.userOneId !== ctx.user.id && room.userTwoId !== ctx.user.id)) {
                    throw new AuthenticationError('Access denied to this chat room');
                }
                return pubsub.asyncIterableIterator(`${MESSAGE_ADDED}_${roomId}`);
            },
            resolve: (payload) => payload.messageAdded,
        },
    },
};
//# sourceMappingURL=chat.resolver.js.map