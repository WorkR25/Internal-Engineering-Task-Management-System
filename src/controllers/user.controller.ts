import { Request, Response } from "express";
import { UserService } from "../services/user.service.js";

export class UserController {
  private readonly userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  async createUserHandler(req: Request, res: Response) {
    const user = await this.userService.createUser(req.body);

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
              id: user.id.toString(),
              fullName: user.fullName,
              email: user.email,
              roleId: user.roleId.toString(),
              isActive: user.isActive,
              createdAt: user.createdAt,
              updatedAt: user.updatedAt,
            },
    });
  }
}