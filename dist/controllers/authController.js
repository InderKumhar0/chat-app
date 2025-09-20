import { catchAsync } from '../utils/catchAsync.js';
import prisma from '../utils/prisma.js';
export const signup = catchAsync(async (req, res, next) => {
    const newUser = await prisma.user.create({
        data: {
            name: 'test1',
            email: 'test1@gmail.com',
            password: '1234567',
        },
    });
    res.status(200).json({
        status: 'success',
        data: newUser,
    });
});
//# sourceMappingURL=authController.js.map