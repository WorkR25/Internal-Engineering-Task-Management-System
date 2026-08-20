import { Request, Response, NextFunction } from "express";
import { IUnassignmentReasonService } from "../services/unassignment-reason.service.js";
import { sendSuccess } from "../utils/helpers/response.helper.js";
import { CreateUnassignmentReasonDto } from "../dtos/unassignment-reason.dto.js";

export class UnassignmentReasonController {
  private readonly unassignmentReasonService: IUnassignmentReasonService;

  constructor(unassignmentReasonService: IUnassignmentReasonService) {
    this.unassignmentReasonService = unassignmentReasonService;
  }

  async createUnassignmentReasonHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const data = req.body as CreateUnassignmentReasonDto;

      const reason = await this.unassignmentReasonService.createUnassignmentReason(data);

      sendSuccess(res, reason, 201, "Unassignment reason created successfully");
    } catch (error) {
      next(error);
    }
  }

  async getAllUnassignmentReasonsHandler(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const reasons = await this.unassignmentReasonService.findAllUnassignmentReasons();

      sendSuccess(res, reasons, 200, "Unassignment reasons fetched successfully");
    } catch (error) {
      next(error);
    }
  }
}