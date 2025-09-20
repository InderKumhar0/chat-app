import jwt from 'jsonwebtoken';
import prisma from './prisma.js';
export async function graphQlContext(token) {
    if (!token) {
        return { prisma };
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await prisma.user.findUnique({
            where: { id: decoded.userId },
        });
        return { prisma, user };
    }
    catch (error) {
        return { prisma };
    }
}
//# sourceMappingURL=graphQlContext.js.map