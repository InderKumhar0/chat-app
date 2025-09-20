import prisma from '../utils/prisma.js';
import { AuthenticationError, ValidationError } from '../utils/error.js';
export const userResolvers = {
    Query: {
        me: async (_, __, ctx) => {
            if (!ctx.user)
                throw new AuthenticationError('Please login to access this resource');
            return ctx.user;
        },
        users: async (_, { skip = 0, limit = 20, sortBy = 'createdAt', sortOrder = 'asc', }, ctx) => {
            if (!ctx.user)
                throw new AuthenticationError('Authentication required');
            const allowedSortFields = ['createdAt', 'updatedAt'];
            if (!allowedSortFields.includes(sortBy)) {
                throw new ValidationError(`Sort field must be one of: ${allowedSortFields.join(', ')}`);
            }
            if (sortOrder !== 'asc' && sortOrder !== 'desc') {
                throw new ValidationError('Sort order must be "asc" or "desc"');
            }
            return await prisma.user.findMany({
                skip,
                take: limit,
                orderBy: { [sortBy]: sortOrder },
            });
        },
    },
    User: {
        chatRooms1: (parent) => prisma.chatRoom.findMany({ where: { userOneId: parent.id } }),
        chatRooms2: (parent) => prisma.chatRoom.findMany({ where: { userTwoId: parent.id } }),
        messages: (parent) => prisma.chat.findMany({ where: { senderId: parent.id } }),
        receivedMessages: (parent) => prisma.chat.findMany({ where: { receiverId: parent.id } }),
    },
    ChatRoom: {
        userOne: (parent) => prisma.user.findUnique({ where: { id: parent.userOneId } }),
        userTwo: (parent) => prisma.user.findUnique({ where: { id: parent.userTwoId } }),
        chats: (parent) => prisma.chat.findMany({ where: { roomId: parent.id } }),
    },
    Chat: {
        room: (parent) => prisma.chatRoom.findUnique({ where: { id: parent.roomId } }),
        sender: (parent) => prisma.user.findUnique({ where: { id: parent.senderId } }),
        receiver: (parent) => prisma.user.findUnique({ where: { id: parent.receiverId } }),
    },
};
//# sourceMappingURL=user.resolver.js.map