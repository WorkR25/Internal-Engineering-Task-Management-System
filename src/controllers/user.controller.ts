import { Request, Response } from "express";
import { UserService } from "../services/user.service.js";

export class UserController {

  private readonly userService: UserService;

  constructor(
    userService: UserService
  ) {
    this.userService = userService;
  }

  async createUserHandler(
    req: Request,
    res: Response
  ) {

    const user =
      await this.userService.createUser(
        req.body
      );

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        ...user,
        id: user.id.toString(),
        roleId: user.roleId.toString(),
      },
    });
  }

  async findAllUsersHandler(
    _req: Request,
    res: Response
  ) {

    const users =
      await this.userService.findAllUsers();

    return res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      data: users.map((user) => ({
        ...user,
        id: user.id.toString(),
        roleId: user.roleId.toString(),
      })),
    });
  }
}