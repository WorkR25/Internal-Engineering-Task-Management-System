import { Request, Response, NextFunction } from "express";
import { UnauthorizedError } from "../utils/errors/app.error.js";
import { verifyToken } from "../utils/helpers/jwt.helper.js";
import { UserTokenPayload } from "../types/user.type.js";

export const authenticate = (
    req: Request,
    _res: Response,
    next: NextFunction
): void => {
    try {
        const token = req.cookies?.accessToken;

        if (!token) {
            return next(
                new UnauthorizedError("Authentication required")
            );
        }

        const user: UserTokenPayload = verifyToken(token);

        req.user = user;

        next();
    } catch (_error) {
        next(
            new UnauthorizedError("Invalid or expired token")
        );
    }
};