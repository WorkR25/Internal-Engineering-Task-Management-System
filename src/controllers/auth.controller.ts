import { Request, Response, NextFunction } from "express";

import { IAuthService } from "../services/auth.service.js";
import { SigninDto } from "../dtos/user.dto.js";

export class AuthController {
  private readonly authService: IAuthService;

  constructor(authService: IAuthService) {
    this.authService = authService;
  }

  signinHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const data: SigninDto = req.body;

      const token = await this.authService.signin(data);

      res.status(200).json({
        success: true,
        message: "Signin successful",
        data: {
          token,
        },
      });
    } catch (error) {
      next(error);
    }
  };
}