import { Prisma, UnassignmentReason } from "../../generated/prisma/client.js";
import { prisma } from "../configs/db.config.js";

export interface IUnassignmentReasonRepository {
  create(data: Prisma.UnassignmentReasonCreateInput): Promise<UnassignmentReason>;
  findAll(): Promise<UnassignmentReason[]>;
  findByCode(code: string): Promise<UnassignmentReason | null>;
}

export class UnassignmentReasonRepository implements IUnassignmentReasonRepository {
  async create(data: Prisma.UnassignmentReasonCreateInput): Promise<UnassignmentReason> {
    return prisma.unassignmentReason.create({ data });
  }

  async findAll(): Promise<UnassignmentReason[]> {
    return prisma.unassignmentReason.findMany();
  }

  async findByCode(code: string): Promise<UnassignmentReason | null> {
    return prisma.unassignmentReason.findUnique({
      where: { code },
    });
  }
}