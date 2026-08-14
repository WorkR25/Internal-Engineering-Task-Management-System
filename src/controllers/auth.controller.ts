import { Request, Response, NextFunction } from "express";
import { IAuthService } from "../services/auth.service.js";
import { NotimplementedError } from "../utils/errors/app.error.js";

export class AuthController {
    private readonly authService: IAuthService;

    constructor(authService: IAuthService) {
        this.authService = authService;
    }

    async signupHandler(_req: Request, _res: Response, next: NextFunction): Promise<void> {
        await this.authService.signup();
        next(new NotimplementedError('Signup is not implemented yet'));
    }

    async signinHandler(_req: Request, _res: Response, next: NextFunction): Promise<void> {
        await this.authService.signin();
        next(new NotimplementedError('Signin is not implemented yet'));
    }
}
