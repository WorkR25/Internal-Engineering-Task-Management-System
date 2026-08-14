import { prisma } from "../configs/db.config.js";
import type { Role } from "../../generated/prisma/client.js";

export interface IRoleRepository {
  findByName(name: string): Promise<Role | null>;

  findById(id: bigint): Promise<Role | null>;

  findAll(): Promise<Role[]>;

  create(
    name: string,
    description?: string
  ): Promise<Role>;

  update(
    id: bigint,
    name: string,
    description?: string
  ): Promise<Role>;
}

export class RoleRepository
  implements IRoleRepository {

  async findByName(
    name: string
  ): Promise<Role | null> {

    return await prisma.role.findUnique({
      where: {
        name
      }
    });
  }

  async findById(
    id: bigint
  ): Promise<Role | null> {

    return await prisma.role.findUnique({
      where: {
        id
      }
    });
  }

  async findAll(): Promise<Role[]> {

    return await prisma.role.findMany({
      orderBy: {
        id: "asc"
      }
    });
  }

  async create(
    name: string,
    description?: string
  ): Promise<Role> {

    return await prisma.role.create({
      data: {
        name,
        ...(description !== undefined && {
          description
        })
      }
    });
  }

  async update(
    id: bigint,
    name: string,
    description?: string
  ): Promise<Role> {

    return await prisma.role.update({
      where: {
        id
      },
      data: {
        name,
        ...(description !== undefined && {
          description
        })
      }
    });
  }
}