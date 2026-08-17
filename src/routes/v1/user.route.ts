import { Router } from "express";
import { UserController } from "../../controllers/user.controller.js";
import { UserService } from "../../services/user.service.js";
import { UserRepository } from "../../repositories/user.repository.js";
import { validateBody } from "../../middlewares/validate.middleware.js";
import { createUserSchema } from "../../dtos/user.dto.js";
import { authenticate } from "../../middlewares/auth.middleware.js";
import { authorizeAdmin } from "../../middlewares/authorization.middleware.js";

const userRouter = Router();

const userController = new UserController(
  new UserService(new UserRepository())
);

userRouter.post(
  "/",
  validateBody(createUserSchema),
  userController.createUserHandler.bind(userController)
);

userRouter.get(
  "/",
  authenticate,
  authorizeAdmin,
  userController.getAllUsersHandler.bind(userController)
);

export default userRouter;