import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { IAuthService } from "../services/auth.service.js";
import { sendSuccess } from "../utils/helpers/response.helper.js";

export class AuthController {
    private readonly authService: IAuthService;

    constructor(authService: IAuthService) {
        this.authService = authService;
    }

    async signupHandler(_req: Request, _res: Response, _next: NextFunction): Promise<void> {
        return;
    }

    async signinHandler(_req: Request, _res: Response, _next: NextFunction): Promise<void> {
        return;
    }

    async loginHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { email, password } = req.body as { email?: string; password?: string };

            if (!email || !password) {
                res.status(StatusCodes.BAD_REQUEST).json({
                    success: false,
                    message: 'Email and password are required',
                });
                return;
            }

            const data = await this.authService.login({ email, password });

            sendSuccess(res, { token: data.token }, StatusCodes.OK, 'Login successful');
        } catch (error) {
            next(error);
        }
    }
}