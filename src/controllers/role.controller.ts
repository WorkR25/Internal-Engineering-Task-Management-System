import { Request, Response } from 'express';
import { createRoleDto, updateRoleDto } from '../dtos/role.dto.js';
import { RoleService } from '../services/role.service.js';

const roleService = new RoleService();

const jsonReplacer = (_key: string, value: unknown) =>
    typeof value === 'bigint' ? value.toString() : value;

export class RoleController {
    private sendJson(res: Response, payload: unknown, statusCode = 200): void {
        res.status(statusCode)
            .type('application/json')
            .send(JSON.stringify(payload, jsonReplacer));
    }

    private getRoleId(req: Request): bigint {
        const { id } = req.params;

        if (typeof id !== 'string' || !/^\d+$/.test(id)) {
            throw new Error('Role id must be a positive integer');
        }

        return BigInt(id);
    }

    async create(req: Request, res: Response): Promise<void> {
        const result = createRoleDto.safeParse(req.body);
        if (!result.success) {
            this.sendJson(res, { message: 'Invalid role data', details: result.error.flatten() }, 400);
            return;
        }

        const role = await roleService.create(result.data);

        this.sendJson(res, {
            message: 'Role created successfully',
            data: role,
        }, 201);
    }

    async find(req: Request, res: Response): Promise<void> {
        try {
            const role = await roleService.find(this.getRoleId(req));
            this.sendJson(res, { data: role });
        } catch {
            this.sendJson(res, { message: 'Invalid role id' }, 400);
        }
    }

    async findAll(_req: Request, res: Response): Promise<void> {
        const roles = await roleService.findAll();
        this.sendJson(res, { data: roles });
    }

    async update(req: Request, res: Response): Promise<void> {
        try {
            const result = updateRoleDto.safeParse(req.body);
            if (!result.success) {
                this.sendJson(res, { message: 'Invalid role data', details: result.error.flatten() }, 400);
                return;
            }

            const role = await roleService.update(this.getRoleId(req), result.data);
            this.sendJson(res, {
                message: 'Role updated successfully',
                data: role,
            });
        } catch {
            this.sendJson(res, { message: 'Invalid role id' }, 400);
        }
    }

    async delete(req: Request, res: Response): Promise<void> {
        try {
            await roleService.delete(this.getRoleId(req));
            this.sendJson(res, { message: 'Role deleted successfully' });
        } catch {
            this.sendJson(res, { message: 'Invalid role id' }, 400);
        }
    }
}
