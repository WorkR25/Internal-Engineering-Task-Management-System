import type { Prisma } from '@prisma/client';
import type { CreateRoleDto, UpdateRoleDto } from '../dtos/role.dto.js';
import { prisma } from '../configs/db.config.js';

export class RoleRepository {
    create(input: CreateRoleDto) {
        const data: Prisma.RoleCreateInput = {
            name: input.name,
            ...(input.description !== undefined ? { description: input.description } : {}),
        };

        return prisma.role.create({ data });
    }

    find(id: bigint) {
        return prisma.role.findUnique({ where: { id } });
    }

    findAll() {
        return prisma.role.findMany();
    }

    update(id: bigint, input: UpdateRoleDto) {
        const data: Prisma.RoleUpdateInput = {
            ...(input.name !== undefined ? { name: input.name } : {}),
            ...(input.description !== undefined ? { description: input.description } : {}),
        };

        return prisma.role.update({ where: { id }, data });
    }

    delete(id: bigint) {
        return prisma.role.delete({ where: { id } });
    }
}
