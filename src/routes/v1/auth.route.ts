import { Router } from "express";

import { UserRepository } from "../../repositories/user.repository.js";
import { AuthService } from "../../services/auth.service.js";
import { AuthController } from "../../controllers/auth.controller.js";

const authRouter = Router();

const userRepository = new UserRepository();

const authService = new AuthService(
  userRepository
);

const authController = new AuthController(
  authService
);

authRouter.post(
  "/signin",
  authController.signinHandler.bind(authController)
);

export default authRouter;