import { Router } from "express";

import { PerformanceController } from "../../controllers/performance.controller.js";
import { PerformanceService } from "../../services/performance.service.js";
import { authenticateUser } from "../../middlewares/authentication.middleware.js";

import { authorizeUser } from "../../middlewares/authorization.middleware.js";

import { RoleName } from "../../types/role.type.js";


const performanceController = new PerformanceController(new PerformanceService());

export const performanceRouter = Router();

// implement all the routes below here
performanceRouter.get(
    "/developers",
    authenticateUser,
    authorizeUser(RoleName.ADMIN),
    performanceController.getAllDevelopersPerformanceHandler.bind(
        performanceController
    )
);