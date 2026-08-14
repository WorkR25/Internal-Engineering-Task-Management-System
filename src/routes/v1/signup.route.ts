import { Router } from "express";
import { SignupController } from "../../controllers/signup.controller.js";

const signupController = new SignupController();
const signupRouter = Router();
signupRouter.post('/', (req, res, next) => signupController.register(req, res, next));

export default signupRouter;
