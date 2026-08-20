import { Router } from "express";

import { UnassignmentReasonController } from "../../controllers/unassignment-reason.controller.js";
import { UnassignmentReasonService } from "../../services/unassignment-reason.service.js";
import { UnassignmentReasonRepository } from "../../repositories/unassignment-reason.repository.js";
import { validateRequestBody } from "../../middlewares/validate.middleware.js";
import { authenticateUser } from "../../middlewares/authentication.middleware.js";
import { authorizeUser } from "../../middlewares/authorization.middleware.js";
import { createUnassignmentReasonSchema } from "../../dtos/unassignment-reason.dto.js";
import { RoleName } from "../../types/role.type.js";

const unassignmentReasonController = new UnassignmentReasonController(
  new UnassignmentReasonService(new UnassignmentReasonRepository())
);

const unassignmentReasonRouter = Router();

unassignmentReasonRouter.post(
  "/",
  authenticateUser,
  authorizeUser(RoleName.ADMIN),
  validateRequestBody(createUnassignmentReasonSchema),
  unassignmentReasonController.createUnassignmentReasonHandler
);

unassignmentReasonRouter.get(
  "/",
  authenticateUser,
  authorizeUser(RoleName.ADMIN),
  unassignmentReasonController.getAllUnassignmentReasonsHandler
);

export default unassignmentReasonRouter;