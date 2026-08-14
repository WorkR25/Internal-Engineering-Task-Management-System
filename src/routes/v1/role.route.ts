import { Router } from "express";

import {
  RoleController
} from "../../controllers/role.controller.js";

import {
  RoleService
} from "../../services/role.service.js";

import {
  RoleRepository
} from "../../repositories/role.repository.js";

import {
  validate
} from "../../middlewares/validation.middleware.js";

import {
  createRoleSchema,
  updateRoleSchema
} from "../../dtos/role.dto.js";


const router = Router();

const roleRepository =
  new RoleRepository();

const roleService =
  new RoleService(
    roleRepository
  );

const roleController =
  new RoleController(
    roleService
  );


router.post(
  "/",
  validate(createRoleSchema),
  roleController.createRole
);


router.get(
  "/",
  roleController.getAllRoles
);


router.put(
  "/:id",
  validate(updateRoleSchema),
  roleController.updateRole
);


export default router;