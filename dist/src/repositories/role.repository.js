import { prisma } from '../configs/db.config.js';
export class RoleRepository {
    create(input) {
        const data = {
            name: input.name,
            ...(input.description !== undefined ? { description: input.description } : {}),
        };
        return prisma.role.create({ data });
    }
    find(id) {
        return prisma.role.findUnique({ where: { id } });
    }
    findAll() {
        return prisma.role.findMany();
    }
    update(id, input) {
        const data = {
            ...(input.name !== undefined ? { name: input.name } : {}),
            ...(input.description !== undefined ? { description: input.description } : {}),
        };
        return prisma.role.update({ where: { id }, data });
    }
    delete(id) {
        return prisma.role.delete({ where: { id } });
    }
}
//# sourceMappingURL=role.repository.js.map