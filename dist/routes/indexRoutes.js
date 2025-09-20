import express, { Router } from 'express';
import authRouter from './authRoutes.js';
const router = express.Router();
router.use('/auth', authRouter);
export default router;
//# sourceMappingURL=indexRoutes.js.map