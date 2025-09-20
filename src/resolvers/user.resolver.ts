import prisma from '../utils/prisma.js';
import type { Context } from '../context.js';
import { AuthenticationError, ValidationError } from '../utils/error.js';

export const userResolvers = {
  Query: {
    me: async (_: any, __: any, ctx: Context) => {
      if (!ctx.user)
        throw new AuthenticationError('Please login to access this resource');
      return ctx.user;
    },

    users: async (
      _: any,
      {
        skip = 0,
        limit = 20,
        sortBy = 'createdAt',
        sortOrder = 'asc',
      }: {
        skip?: number;
        limit?: number;
        sortBy?: string;
        sortOrder?: 'asc' | 'desc';
      },
      ctx: Context
    ) => {
      if (!ctx.user) throw new AuthenticationError('Authentication required');

      const allowedSortFields = ['createdAt', 'updatedAt'];
      if (!allowedSortFields.includes(sortBy)) {
        throw new ValidationError(
          `Sort field must be one of: ${allowedSortFields.join(', ')}`
        );
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
    chatRooms1: (parent: any) =>
      prisma.chatRoom.findMany({ where: { userOneId: parent.id } }),
    chatRooms2: (parent: any) =>
      prisma.chatRoom.findMany({ where: { userTwoId: parent.id } }),
    messages: (parent: any) =>
      prisma.chat.findMany({ where: { senderId: parent.id } }),
    receivedMessages: (parent: any) =>
      prisma.chat.findMany({ where: { receiverId: parent.id } }),
  },

  ChatRoom: {
    userOne: (parent: any) =>
      prisma.user.findUnique({ where: { id: parent.userOneId } }),
    userTwo: (parent: any) =>
      prisma.user.findUnique({ where: { id: parent.userTwoId } }),
    chats: (parent: any) =>
      prisma.chat.findMany({ where: { roomId: parent.id } }),
  },

  Chat: {
    room: (parent: any) =>
      prisma.chatRoom.findUnique({ where: { id: parent.roomId } }),
    sender: (parent: any) =>
      prisma.user.findUnique({ where: { id: parent.senderId } }),
    receiver: (parent: any) =>
      prisma.user.findUnique({ where: { id: parent.receiverId } }),
  },
};
