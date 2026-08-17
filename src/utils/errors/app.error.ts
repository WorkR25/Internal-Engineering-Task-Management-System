import { StatusCodes } from "http-status-codes";

export class AppError extends Error {
    public readonly statusCode: number;
    public readonly details?: unknown;

    constructor(message: string, statusCode: number, details?: unknown) {
        super(message);
        this.statusCode = statusCode;
        this.details = details;
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}

export class NotFoundError extends AppError {
    constructor(message = "Resource not found", details?: unknown) {
        super(message, StatusCodes.NOT_FOUND, details);
    } 
}
export const NotfoundError = NotFoundError;
export type NotfoundError = NotFoundError;

export class InternalServerError extends AppError {
    constructor(message = "Internal server error", details?: unknown) {
        super(message, StatusCodes.INTERNAL_SERVER_ERROR, details);
    } 
}

export class BadRequestError extends AppError {
    constructor(message = "Bad request", details?: unknown) {
        super(message, StatusCodes.BAD_REQUEST, details);
    } 
}

export class NotImplementedError extends AppError {
    constructor(message = "Not implemented", details?: unknown) {
        super(message, StatusCodes.NOT_IMPLEMENTED, details);
    } 
}
export const NotimplementedError = NotImplementedError;
export type NotimplementedError = NotImplementedError;

export class UnauthorizedError extends AppError {
    constructor(message = "Unauthorized", details?: unknown) {
        super(message, StatusCodes.UNAUTHORIZED, details);
    }
}

export class ForbiddenError extends AppError {
    constructor(message = "Forbidden", details?: unknown) {
        super(message, StatusCodes.FORBIDDEN, details);
    }
}

export class ConflictError extends AppError {
    constructor(message = "Conflict", details?: unknown) {
        super(message, StatusCodes.CONFLICT, details);
    }
}