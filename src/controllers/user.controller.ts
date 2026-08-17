import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { IUserService } from "../services/user.service.js";
import { sendSuccess } from "../utils/helpers/response.helper.js";
import { SignupDto } from "../dtos/user.dto.js";

export class UserController {
  private readonly userService: IUserService;

  constructor(userService: IUserService) {
    this.userService = userService;
  }

  createUserHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = req.body as SignupDto;
      const user = await this.userService.createUser(data);

      sendSuccess(res, user, StatusCodes.CREATED, 'User created successfully');
    } catch (error) {
      next(error);
    }
  };
}