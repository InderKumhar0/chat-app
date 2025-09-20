import bcrypt from 'bcryptjs';
import jwt, {} from 'jsonwebtoken';
import prisma from '../utils/prisma.js';
import { AuthenticationError, ValidationError, ConflictError, } from '../utils/error.js';
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;
export const authResolvers = {
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
    },
};
//# sourceMappingURL=auth.resolver.js.map