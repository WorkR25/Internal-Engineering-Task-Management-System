import { RoleRepository } from '../repositories/role.repository.js';
import type { CreateRoleDto, UpdateRoleDto } from '../dtos/role.dto.js';
 
const roleRepository = new RoleRepository();

export class RoleService {

    create(data: CreateRoleDto) {
        return roleRepository.create(data);
    }

    find(id: bigint) {
        return roleRepository.find(id);
    }

    findAll() {
        return roleRepository.findAll();
    }

    update(id: bigint, data: UpdateRoleDto) {
        return roleRepository.update(id, data);
    }

    delete(id: bigint) {
        return roleRepository.delete(id);
    }
}
