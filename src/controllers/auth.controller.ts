import {
    Request,
    Response,
    NextFunction
} from "express";

import { StatusCodes } from "http-status-codes";

import { IAuthService } from "../services/auth.service.js";
import { SignInDto } from "../dtos/auth.dto.js";
import { sendSuccess } from "../utils/helpers/response.helper.js";

export class AuthController {
    private readonly authService: IAuthService;

    constructor(authService: IAuthService) {
        this.authService = authService;
    }

    async signInHandler(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const data =
                req.body as SignInDto;

            const token =
                await this.authService.signIn(data);

            res.cookie(
                "accessToken",
                token,
                {
                    httpOnly: true,
                    secure:
                        process.env.NODE_ENV === "production",
                    sameSite: "strict",
                }
            );

            sendSuccess(
                res,
                null,
                StatusCodes.OK,
                "Signed in successfully"
            );
        } catch (error) {
            next(error);
        }
    }
}