import {
  Request,
  Response,
  NextFunction
} from "express";

import {
  RoleService
} from "../services/role.service.js";

import {
  CreateRoleDto,
  UpdateRoleDto
} from "../dtos/role.dto.js";

import {
  BadRequestError
} from "../utils/errors/app.error.js";


export class RoleController {

  private readonly roleService: RoleService;

  constructor(
    roleService: RoleService
  ) {
    this.roleService = roleService;
  }


  // CREATE ROLE
  createRole = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {

    try {

      const data: CreateRoleDto =
        req.body;

      const role =
        await this.roleService.createRole(
          data
        );

      return res.status(201).json({
        success: true,
        message: "Role created successfully",
        data: {
          ...role,
          id: role.id.toString()
        }
      });

    } catch (error) {

      next(error);

    }
  };


  // GET ALL ROLES
  getAllRoles = async (
    _req: Request,
    res: Response,
    next: NextFunction
  ) => {

    try {

      const roles =
        await this.roleService.getAllRoles();

      const formattedRoles =
        roles.map((role) => ({
          ...role,
          id: role.id.toString()
        }));

      return res.status(200).json({
        success: true,
        message: "Roles fetched successfully",
        data: formattedRoles
      });

    } catch (error) {

      next(error);

    }
  };


  // UPDATE ROLE
  updateRole = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {

    try {

      const { id } = req.params;

      if (typeof id !== "string") {

        throw new BadRequestError(
          "Invalid role ID"
        );

      }

      if (!/^\d+$/.test(id)) {

        throw new BadRequestError(
          "Invalid role ID"
        );

      }

      const roleId = BigInt(id);

      const data: UpdateRoleDto =
        req.body;

      const role =
        await this.roleService.updateRole(
          roleId,
          data
        );

      return res.status(200).json({
        success: true,
        message: "Role updated successfully",
        data: {
          ...role,
          id: role.id.toString()
        }
      });

    } catch (error) {

      next(error);

    }
  };
}