import { Request, Response, NextFunction } from "express";
import { UserService } from "../services/user.service.js";
import { sendSuccess } from "../utils/helpers/response.helper.js";

export class UserController {
  private readonly userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;

    this.createUserHandler = this.createUserHandler.bind(this);
    this.getAllUsersHandler = this.getAllUsersHandler.bind(this);
  }

  async createUserHandler(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const user = await this.userService.createUser(req.body);

      sendSuccess(
        res,
        user,
        201,
        "User Created Successfully"
      );
    } catch (error) {
      next(error);
    }
  }

  async getAllUsersHandler(
    _req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const users = await this.userService.getAllUsers();

      sendSuccess(
        res,
        users,
        200,
        "Users fetched successfully"
      );
    } catch (error) {
      next(error);
    }
  }
}