import AppError from '../utils/appError.js';
const handleDuplicatFieldsDB = (err) => {
    console.log(Object.values(err));
    // const value = Object.values(err.keyValue)[0];
    // const message = `Duplicate field value: ${value}. Use another value.`;
    const keyName = Object.keys(err.keyPattern)[0];
    let message = `${keyName} already in use`;
    return new AppError(message, 400);
};
const handleValidationErrorDB = (err) => {
    const errors = Object.values(err.errors).map((el) => el.message);
    const message = `Invalid input data. ${errors.join('. ')}`;
    return new AppError(message, 400);
};
const sendErrorDev = (err, req, res) => {
    if (req.originalUrl.startsWith('/api')) {
        return res.status(err.statusCode).json({
            status: err.status,
            error: err,
            message: err.message,
            stack: err.stack,
        });
    }
    res.status(err.statusCode).render('error', {
        title: 'Something went wrong!',
        message: err.message,
    });
};
const sendErrorProd = (err, req, res) => {
    // A) API
    console.log(err);
    if (req.originalUrl.startsWith('/api')) {
        // A) Operational, trusted error: send message to client
        if (err.isOperational) {
            return res.status(err.statusCode).json({
                status: err.status,
                message: err.message,
            });
        }
        // B) Programming or other unknown error: don't leak error detail
        //1) Log error
        // console.log('Error 💥', err);
        //2) Send generic message
        return res.status(500).json({
            status: 'error',
            message: 'Something went very wrong!',
        });
    }
    // B) RENDERED WEBSITE
    // A) Operational, trusted error: send message to client
    if (err.isOperational) {
        return res.status(err.statusCode).render('error', {
            title: 'Something went wrong!',
            message: err.message,
        });
    }
    // B) Programming or other unknown error: don't leak error detail
    //1) Log error
    // console.log('Error 💥', err);
    //2) Send generic message
    return res.status(err.statusCode).render('error', {
        title: 'Something went wrong!',
        message: 'Please try again later.',
    });
};
const globalErrorHandler = (err, req, res, next) => {
    console.log(err);
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
    if (process.env.NODE_ENV === 'development') {
        sendErrorDev(err, req, res);
    }
    else if (process.env.NODE_ENV === 'production') {
        let error = Object.assign(err);
        if (error.code === 11000)
            error = handleDuplicatFieldsDB(error);
        if (error.name === 'ValidationError')
            error = handleValidationErrorDB(error);
        sendErrorProd(error, req, res);
    }
};
export default globalErrorHandler;
//# sourceMappingURL=errorController.js.map