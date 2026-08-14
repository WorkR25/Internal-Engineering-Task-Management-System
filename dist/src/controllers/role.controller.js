import { createRoleDto, updateRoleDto } from '../dtos/role.dto.js';
import { RoleService } from '../services/role.service.js';
const roleService = new RoleService();
const jsonReplacer = (_key, value) => typeof value === 'bigint' ? value.toString() : value;
export class RoleController {
    sendJson(res, payload, statusCode = 200) {
        res.status(statusCode)
            .type('application/json')
            .send(JSON.stringify(payload, jsonReplacer));
    }
    getRoleId(req) {
        const { id } = req.params;
        if (typeof id !== 'string' || !/^\d+$/.test(id)) {
            throw new Error('Role id must be a positive integer');
        }
        return BigInt(id);
    }
    async create(req, res) {
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
    async find(req, res) {
        try {
            const role = await roleService.find(this.getRoleId(req));
            this.sendJson(res, { data: role });
        }
        catch {
            this.sendJson(res, { message: 'Invalid role id' }, 400);
        }
    }
    async findAll(_req, res) {
        const roles = await roleService.findAll();
        this.sendJson(res, { data: roles });
    }
    async update(req, res) {
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
        }
        catch {
            this.sendJson(res, { message: 'Invalid role id' }, 400);
        }
    }
    async delete(req, res) {
        try {
            await roleService.delete(this.getRoleId(req));
            this.sendJson(res, { message: 'Role deleted successfully' });
        }
        catch {
            this.sendJson(res, { message: 'Invalid role id' }, 400);
        }
    }
}
//# sourceMappingURL=role.controller.js.map