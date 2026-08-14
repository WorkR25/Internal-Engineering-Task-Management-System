/**
 * UPDATED ROUTES FILE
 * 
 * To integrate the signup route, update src/routes/v1/index.ts with the following:
 */

import { Router } from "express";
import authRouter from "./auth.route.js";
import roleRouter from "./role.route.js";
import signupRouter from "./signup.route.js";

const v1Router = Router();

v1Router.use('/auth', authRouter);
v1Router.use('/roles', roleRouter);
v1Router.use('/signup', signupRouter);

export default v1Router;
