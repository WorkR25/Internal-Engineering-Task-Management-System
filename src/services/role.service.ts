import {
  IRoleRepository
} from "../repositories/role.repository.js";

import {
  CreateRoleDto,
  UpdateRoleDto
} from "../dtos/role.dto.js";

import type { Role } from "../../generated/prisma/client.js";

export class RoleService {

  private readonly roleRepository: IRoleRepository;

  constructor(
    roleRepository: IRoleRepository
  ) {
    this.roleRepository = roleRepository;
  }

  async createRole(
    data: CreateRoleDto
  ): Promise<Role> {

    const existingRole =
      await this.roleRepository.findByName(
        data.name
      );

    if (existingRole) {
      throw new Error("Role already exists");
    }

    return await this.roleRepository.create(
      data.name,
      data.description
    );
  }

  async getAllRoles(): Promise<Role[]> {

    return await this.roleRepository.findAll();
  }

  async updateRole(
    id: bigint,
    data: UpdateRoleDto
  ): Promise<Role> {

    const existingRole =
      await this.roleRepository.findById(id);

    if (!existingRole) {
      throw new Error("Role not found");
    }

    const roleWithSameName =
      await this.roleRepository.findByName(
        data.name
      );

    if (
      roleWithSameName &&
      roleWithSameName.id !== id
    ) {
      throw new Error(
        "Role name already exists"
      );
    }

    return await this.roleRepository.update(
      id,
      data.name,
      data.description
    );
  }
}