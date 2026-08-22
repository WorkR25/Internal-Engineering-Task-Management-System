import { Request, Response, NextFunction } from "express";

import { ITaskAssignmentService } from "../services/taskAssignment.service.js";
import { AuthenticatedRequest } from "../types/express.js";
import { sendSuccess } from "../utils/helpers/response.helper.js";

export class TaskAssignmentController {
    private readonly taskAssignmentService: ITaskAssignmentService;

    constructor(taskAssignmentService: ITaskAssignmentService) {
        this.taskAssignmentService = taskAssignmentService;
    }

    async assignTaskHandler(req: Request, res: Response, next: NextFunction) {
        try {
        const { user } = req as AuthenticatedRequest;
        const taskId = BigInt(req.params.taskId as string);
        const data = req.body;

    const assignment = await this.taskAssignmentService.assignTask(
      taskId,
      data,
      user.userId
    );

    sendSuccess(res, assignment, 201, "Task assigned successfully");
    } catch (error) {
    next(error);
        }
    }

    async reAssignTaskHandler(req: Request, res: Response, next: NextFunction) {
        try {
        const { user } = req as AuthenticatedRequest;
        const taskId = BigInt(req.params.taskId as string);
        const data = req.body;

    const assignment = await this.taskAssignmentService.reAssignTask(
        taskId,
        data,
        user.userId
      );

    sendSuccess(res, assignment, 200, "Task reassigned successfully");
        } catch (error) {
    next(error);
        }
    }

    async unAssignTaskHandler(req: Request,res: Response,next: NextFunction) {
  try {
    const taskId = BigInt(req.params.taskId as string);
    const data = req.body;

    await this.taskAssignmentService.unAssignTask(
      taskId,
      data
    );

    sendSuccess(
      res,
      null,
      200,
      "Task unassigned successfully"
    );
  } catch (error) {
    next(error);
  }
}
}