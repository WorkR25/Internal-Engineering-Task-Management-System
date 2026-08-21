import { Request, Response, NextFunction } from "express";
import { TaskActivityService } from "../services/taskActivity.service.js";
import { sendSuccess } from "../utils/helpers/response.helper.js";

export class TaskActivityController {
  private readonly taskActivityService: TaskActivityService;

  constructor(taskActivityService: TaskActivityService) {
    this.taskActivityService = taskActivityService;
  }

  async getTaskActivitiesHandler(req: Request,res: Response,next: NextFunction) {
    try {
      const taskId = BigInt(req.params.taskId as string);

      const activities =
        await this.taskActivityService.getTaskActivities(taskId);

      sendSuccess(
        res,
        activities,
        200,
        "Task activities fetched successfully"
      );
    } catch (error) {
      next(error);
    }
  }
}