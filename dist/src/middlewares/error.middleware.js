import { AppError } from "../utils/errors/app.error.js";
import { NODE_ENV } from "../configs/server.config.js";
export const errorHandler = (error, _req, res, _next) => {
    if (error instanceof AppError) {
        const body = {
            success: false,
            message: error.message
        };
        if (error.details)
            body['details'] = error.details;
        res.status(error.statusCode).json(body);
        return;
    }
    const body = {
        success: false,
        message: "Something went wrong",
    };
    if (NODE_ENV === 'development')
        body['details'] = error.stack;
    res.status(500).json(body);
};
//# sourceMappingURL=error.middleware.js.map