import { prisma } from "../configs/db.config.js";

export interface IRoleRepository {
  findByName(name: string): Promise<any>;
  findById(id: bigint): Promise<any>;
  findAll(): Promise<any[]>;
  create(name: string, description?: string): Promise<any>;
  update(
    id: bigint,
    name: string,
    description?: string
  ): Promise<any>;
}

export class RoleRepository implements IRoleRepository {

  async findByName(name: string): Promise<any> {
    return await prisma.role.findUnique({
      where: {
        name
      }
    });
  }

  async findById(id: bigint): Promise<any> {
    return await prisma.role.findUnique({
      where: {
        id
      }
    });
  }

  async findAll(): Promise<any[]> {
    return await prisma.role.findMany({
      orderBy: {
        id: "asc"
      }
    });
  }

  async create(
    name: string,
    description?: string
  ): Promise<any> {

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
  ): Promise<any> {

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