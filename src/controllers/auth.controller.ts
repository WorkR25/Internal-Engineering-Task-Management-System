import { Request, Response, NextFunction } from "express";
import { IAuthService } from "../services/auth.service.js";
import { SignupDto } from "../dtos/auth.dto.js";

export class AuthController {
    private readonly authService: IAuthService;

    constructor(authService: IAuthService) {
        this.authService = authService;
    }

    signupHandler = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {
            const data = req.body as SignupDto;

            await this.authService.signup(data);

            res.status(201).json({
                success: true,
                message: "User registered successfully"
            });
        } catch (error) {
            next(error);
        }
    };

    signinHandler = async (
        _req: Request,
        _res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {
            throw new Error("Signin not implemented");
        } catch (error) {
            next(error);
        }
    };
}