import e, { Request, Response, NextFunction } from "express";
import HttpException from "../exceptions/httpException";
import logger from "../utils/logger";

const errorMiddleware = (
    err: HttpException,
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    if (res.headersSent) {
        return next(err);
    }

    logger.error(`Error: ${err.message}`, {
        status: err.status,
        path: req.originalUrl,
        stack: err.stack,
    });

    res.status(err.status || 500).json({
        status: err.status,
        message: err.message,
        handlers: err.handlers,
    });
};

export default errorMiddleware;
