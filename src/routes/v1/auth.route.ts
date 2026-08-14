import { Router } from "express";

import { AuthController } from "../../controllers/auth.controller.js";
import { AuthService } from "../../services/auth.service.js";

import { UserRepository } from "../../repositories/user.repository.js";
import { RoleRepository } from "../../repositories/role.repository.js";

import { validateBody } from "../../middlewares/validate.middleware.js";
import { signupSchema } from "../../dtos/auth.dto.js";

const userRepository = new UserRepository();
const roleRepository = new RoleRepository();

const authService = new AuthService(
    userRepository,
    roleRepository
);

const authController = new AuthController(authService);

const authRouter = Router();

authRouter.post(
    "/signup",
    validateBody(signupSchema),
    authController.signupHandler
);

authRouter.post(
    "/signin",
    authController.signinHandler
);

export default authRouter;