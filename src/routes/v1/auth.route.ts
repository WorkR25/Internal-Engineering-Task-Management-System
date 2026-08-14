import { Router } from "express";

import { AuthController } from "../../controllers/auth.controller.js";
import { AuthService } from "../../services/auth.service.js";
import { UserRepository } from "../../repositories/user.repository.js";
import { RoleRepository } from "../../repositories/role.repository.js";

const userRepository = new UserRepository();

const roleRepository = new RoleRepository();

const authService = new AuthService(
    userRepository,
    roleRepository
);

const authController = new AuthController(
    authService
);

const authRouter = Router();

authRouter.post(
    "/signup",
    authController.signupHandler.bind(authController)
);

export default authRouter;