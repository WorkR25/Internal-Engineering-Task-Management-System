import type { Prisma } from '@prisma/client';
import { prisma } from '../configs/db.config.js';

export class RoleRepository {
    create(data: Prisma.RoleCreateInput) {
        return prisma.role.create({ data });
    }

    find(id: bigint) {
        return prisma.role.findUnique({ where: { id } });
    }

    findAll() {
        return prisma.role.findMany();
    }

    update(id: bigint, data: Prisma.RoleUpdateInput) {
        return prisma.role.update({ where: { id }, data });
    }

    delete(id: bigint) {
        return prisma.role.delete({ where: { id } });
    }
}
