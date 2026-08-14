import { Request, Response, NextFunction } from "express";
import { IAuthService } from "../services/auth.service.js";
import { NotimplementedError } from "../utils/errors/app.error.js";

export class AuthController {
    constructor(_authService: IAuthService) {
        // authService available for future implementation
    }

    async signupHandler(_req: Request, _res: Response, _next: NextFunction): Promise<void> {
        throw new NotimplementedError('Signup Handler is not implemented');
    }

    async signinHandler(_req: Request, _res: Response, _next: NextFunction): Promise<void> {
        throw new NotimplementedError('Signin Handler is not implemented');
    }
}