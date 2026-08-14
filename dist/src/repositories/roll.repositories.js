import { prisma } from "../configs/db.config.js";
export class RoleRepository {
    async create(data) {
        return prisma.role.create({ data });
    }
    async find(id) {
        return prisma.role.findUnique({
            where: { id }
        });
    }
    async findAll() {
        return prisma.role.findMany();
    }
    async update(id, data) {
        return prisma.role.update({
            where: { id },
            data
        });
    }
    async delete(id) {
        return prisma.role.delete({
            where: { id }
        });
    }
}
//# sourceMappingURL=roll.repositories.js.map