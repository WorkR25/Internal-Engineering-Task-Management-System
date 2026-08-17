import { Router } from "express";

import { AuthController } from "../../controllers/auth.controller.js";
import { AuthService } from "../../services/auth.service.js";
import { UserRepository } from "../../repositories/user.repository.js";
import { validateBody } from "../../middlewares/validate.middleware.js";
import { signinSchema } from "../../dtos/user.dto.js";

const authController = new AuthController(
  new AuthService(
    new UserRepository()
  )
);

const authRouter = Router();

authRouter.post(
  "/signin",
  validateBody(signinSchema),
  authController.signinHandler
);

export default authRouter;