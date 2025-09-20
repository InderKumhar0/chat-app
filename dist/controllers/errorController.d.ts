import type { NextFunction, Request, Response } from 'express';
import AppError from '../utils/appError.js';
declare const globalErrorHandler: (err: AppError, req: Request, res: Response, next: NextFunction) => void;
export default globalErrorHandler;
//# sourceMappingURL=errorController.d.ts.map