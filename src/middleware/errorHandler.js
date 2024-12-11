import ErrorMessages from '../enums/ErrorMessages.js';
import HttpStatusCodes from '../enums/httpStatusCodes.js';

const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || HttpStatusCodes.INTERNAL_SERVER_ERROR;
    const message =  err.message || ErrorMessages.INTERNAL_SERVER_ERROR;

    res.status(statusCode).json({
        success: false,
        status: statusCode,
        message: message,
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    });
};

export default errorHandler;