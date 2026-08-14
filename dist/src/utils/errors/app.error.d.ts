export declare class AppError extends Error {
    readonly statusCode: number;
    readonly details?: unknown;
    constructor(message: string, statusCode: number, details?: unknown);
}
export declare class NotfoundError extends AppError {
    constructor(message: string, details?: unknown);
}
export declare class InternalServerError extends AppError {
    constructor(message: string, details?: unknown);
}
export declare class BadRequestError extends AppError {
    constructor(message: string, details?: unknown);
}
export declare class NotimplementedError extends AppError {
    constructor(message: string, details?: unknown);
}
export declare class UnauthorizedError extends AppError {
    constructor(message: string, details?: unknown);
}
export declare class ConflictError extends AppError {
    constructor(message: string, details?: unknown);
}
//# sourceMappingURL=app.error.d.ts.map