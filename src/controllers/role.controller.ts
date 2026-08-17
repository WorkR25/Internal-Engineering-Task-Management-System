import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { IRoleService } from "../services/role.service.js";
import { CreateRoleDto } from "../dtos/role.dto.js";
import { sendSuccess } from "../utils/helpers/response.helper.js";
import { BadRequestError } from "../utils/errors/app.error.js";

export class RoleController {
    private readonly roleService: IRoleService;

    constructor(roleService: IRoleService) {
        this.roleService = roleService;
    }

    createRoleHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const data = req.body as CreateRoleDto;

            const role = await this.roleService.createRole(data);

            sendSuccess(res, role, StatusCodes.CREATED, 'Role created successfully');
        } catch (error) {
            next(error);
        }
    };

    getRoleByIdHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const idParam = req.params['id'];
            if (typeof idParam !== 'string' || !idParam || isNaN(Number(idParam))) {
                throw new BadRequestError('Invalid role ID format');
            }

            const role = await this.roleService.findRoleById(BigInt(idParam));

            sendSuccess(res, role, StatusCodes.OK, 'Role retrieved successfully');
        } catch (error) {
            next(error);
        }
    };

    getRoleByNameHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const nameParam = req.params['name'];
            if (typeof nameParam !== 'string' || !nameParam) {
                throw new BadRequestError('Role name is required');
            }

            const role = await this.roleService.findRoleByName(nameParam);

            sendSuccess(res, role, StatusCodes.OK, 'Role retrieved successfully');
        } catch (error) {
            next(error);
        }
    };
}