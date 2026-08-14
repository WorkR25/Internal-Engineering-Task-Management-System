import { RoleRepository } from '../repositories/role.repository.js';
import type { Prisma } from '@prisma/client';
 
const roleRepository = new RoleRepository();

export class RoleService {

    create(data: Prisma.RoleCreateInput) {
        return roleRepository.create(data);
    }

    find(id: bigint) {
        return roleRepository.find(id);
    }

    findAll() {
        return roleRepository.findAll();
    }

    update(id: bigint, data: Prisma.RoleUpdateInput) {
        return roleRepository.update(id, data);
    }

    delete(id: bigint) {
        return roleRepository.delete(id);
    }
}
