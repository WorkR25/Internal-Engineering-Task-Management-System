import {
    Request,
    Response,
    NextFunction
} from "express";

import { StatusCodes } from "http-status-codes";

import { IAuthService } from "../services/auth.service.js";

import { SignupDto } from "../dtos/auth.dto.js";

import { sendSuccess } from "../utils/helpers/response.helper.js";

export class AuthController {

    private readonly authService: IAuthService;

    constructor(authService: IAuthService) {

        this.authService = authService;

    }

    async signupHandler(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {

        try {

            const data =
                req.body as SignupDto;

            const user =
                await this.authService.signup(data);

            sendSuccess(
                res,
                user,
                StatusCodes.CREATED,
                "User registered successfully"
            );

        } catch (error) {

            next(error);

        }

    }

    async signinHandler(
        _req: Request,
        _res: Response,
        next: NextFunction
    ): Promise<void> {

        next(
            new Error("Signin is not implemented")
        );

    }

}