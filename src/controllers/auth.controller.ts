import {
  Request,
  Response,
  NextFunction,
} from "express";

import { StatusCodes } from "http-status-codes";

import { AuthService } from "../services/auth.service.js";
import { SigninDto } from "../dtos/user.dto.js";

export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) {}

  async signinHandler(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const data = req.body as SigninDto;

      const result = await this.authService.signin(data);

      res.status(StatusCodes.OK).json({
        success: true,
        message: "User signed in successfully",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}