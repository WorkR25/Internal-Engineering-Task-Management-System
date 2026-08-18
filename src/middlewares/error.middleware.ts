import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/errors/app.error.js";
import { NODE_ENV } from "../configs/server.config.js";
import { logger } from "../configs/logger.config.js";
//import { Prisma } from "../../generated/prisma/client.js";

export const errorHandler = (error: Error, _req: Request, res: Response, _next: NextFunction): void => {
    if (error instanceof AppError) {
        const body: Record<string, unknown> = {
            success: false,
            message: error.message
        };

        if (error.details !== undefined) body['details'] = error.details;

        res.status(error.statusCode).json(body);
        return;
    }

    if (error instanceof SyntaxError && 'status' in error && (error as { status?: unknown }).status === 400) {
        res.status(400).json({
            success: false,
            message: "Invalid JSON payload in request body"
        });
        return;
    }
    logger.error(error);

    const body: Record<string, unknown> = {
        success: false,
        message: "Something went wrong",
    };

    if (NODE_ENV === 'development') body['details'] = error.stack;

    res.status(500).json(body);
};