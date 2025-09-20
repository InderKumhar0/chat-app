import prisma from './utils/prisma.js';
import bcrypt from 'bcryptjs';
import jwt, {} from 'jsonwebtoken';
import { MESSAGE_ADDED, pubsub } from './pubsub.js';
import { AuthenticationError, ConflictError, NotFoundError, ValidationError, } from './utils/error.js';
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;
function throwAuth() {
    throw new Error('Not authenticated');
}
export const resolvers = {
    Query: {
        me: async (_, __, ctx) => {
            if (!ctx.user)
                throw new AuthenticationError('Please login to access this resource');
            return ctx.user;
        },
        users: async (_, __, ctx) => {
            if (!ctx.user)
                throw new AuthenticationError('Authentication required');
            let users = prisma.user.findMany();
            return users;
        },
        chatRooms: async (_, { userId }, ctx) => {
            if (!ctx.user)
                throw new AuthenticationError();
            let chatRooms = await prisma.chatRoom.findMany({
                where: { userOneId: ctx.user?.id },
            });
            return chatRooms;
        },
        chats: async (_, { roomId }, ctx) => {
            if (!ctx.user)
                throw new AuthenticationError();
            const room = await prisma.chatRoom.findUnique({
                where: { id: roomId },
            });
            if (!room ||
                (room.userOneId !== ctx.user.id && room.userTwoId !== ctx.user.id)) {
                throw new AuthenticationError('Access denied to this chat room');
            }
            let chats = await prisma.chat.findMany({
                where: { roomId },
                orderBy: { createdAt: 'asc' },
            });
            return chats;
        },
    },
    Mutation: {
        signup: async (_, args) => {
            const { name, email, password } = args.input;
            if (!name || !email || !password) {
                throw new ValidationError('Name, email, and password are required');
            }
            if (password.length < 6) {
                throw new ValidationError('Password must be at least 6 characters long');
            }
            const existing = await prisma.user.findUnique({
                where: { email },
            });
            if (existing)
                throw new ConflictError('Email already registered');
            const hashed = await bcrypt.hash(password, 10);
            const user = await prisma.user.create({
                data: { name, email, password: hashed },
            });
            const expiresIn = JWT_EXPIRES_IN;
            const option = {
                expiresIn: expiresIn,
            };
            const token = jwt.sign({ userId: user.id }, JWT_SECRET, option);
            return { token, user };
        },
        login: async (_, args) => {
            const { email, password } = args.input;
            if (!email || !password) {
                throw new ValidationError('Email and password are required');
            }
            const user = await prisma.user.findUnique({
                where: { email },
            });
            if (!user) {
                throw new AuthenticationError('Invalid email or password');
            }
            const ok = await bcrypt.compare(password, user.password);
            if (!ok)
                throw new AuthenticationError('Invalid email or password');
            const expiresIn = JWT_EXPIRES_IN;
            const option = {
                expiresIn: expiresIn,
            };
            const token = jwt.sign({ userId: user.id }, JWT_SECRET, option);
            return { token, user };
        },
        createChatRoom: async (_, args, ctx) => {
            if (!ctx.user) {
                if (!ctx.user)
                    throwAuth();
            }
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
            if (!ctx.user) {
                if (!ctx.user)
                    throw new AuthenticationError();
            }
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
//# sourceMappingURL=resolvers.js.map