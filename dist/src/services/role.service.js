import { RoleRepository } from '../repositories/role.repository.js';
const roleRepository = new RoleRepository();
export class RoleService {
    create(data) {
        return roleRepository.create(data);
    }
    find(id) {
        return roleRepository.find(id);
    }
    findAll() {
        return roleRepository.findAll();
    }
    update(id, data) {
        return roleRepository.update(id, data);
    }
    delete(id) {
        return roleRepository.delete(id);
    }
}
//# sourceMappingURL=role.service.js.map