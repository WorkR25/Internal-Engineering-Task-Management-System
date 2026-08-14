import { prisma } from '../configs/db.config.js';
export class RoleRepository {
    create(data) {
        return prisma.role.create({ data });
    }
    find(id) {
        return prisma.role.findUnique({ where: { id } });
    }
    findAll() {
        return prisma.role.findMany();
    }
    update(id, data) {
        return prisma.role.update({ where: { id }, data });
    }
    delete(id) {
        return prisma.role.delete({ where: { id } });
    }
}
//# sourceMappingURL=role.repository.js.map