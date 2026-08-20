import { Prisma, UnassignmentReason } from "../../generated/prisma/client.js";
import { IUnassignmentReasonRepository } from "../repositories/unassignment-reason.repository.js";
import { CreateUnassignmentReasonDto } from "../dtos/unassignment-reason.dto.js";
import { ConflictError, InternalServerError } from "../utils/errors/app.error.js";

export interface IUnassignmentReasonService {
  createUnassignmentReason(data: CreateUnassignmentReasonDto): Promise<UnassignmentReason>;
  findAllUnassignmentReasons(): Promise<UnassignmentReason[]>;
}

export class UnassignmentReasonService implements IUnassignmentReasonService {
  private readonly unassignmentReasonRepository: IUnassignmentReasonRepository;

  constructor(unassignmentReasonRepository: IUnassignmentReasonRepository) {
    this.unassignmentReasonRepository = unassignmentReasonRepository;
  }

  async createUnassignmentReason(data: CreateUnassignmentReasonDto): Promise<UnassignmentReason> {
    try {
      const createData: Prisma.UnassignmentReasonCreateInput = {
        code: data.code,
        label: data.label,
        affectsPerformance: data.affectsPerformance,
      };

      return await this.unassignmentReasonRepository.create(createData);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
        throw new ConflictError(`Unassignment reason with code '${data.code}' already exists`);
      }

      throw new InternalServerError("Failed to create unassignment reason");
    }
  }

  async findAllUnassignmentReasons(): Promise<UnassignmentReason[]> {
    try {
      return await this.unassignmentReasonRepository.findAll();
    } catch (error) {
      throw new InternalServerError("Failed to fetch unassignment reasons");
    }
  }
}