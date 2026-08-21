import { Request, Response, NextFunction } from "express";

import { ITaskAssignmentService } from "../services/taskAssignment.service.js";

export class TaskAssignmentController {
    private readonly taskAssignmentService: ITaskAssignmentService;

    constructor(taskAssignmentService: ITaskAssignmentService) {
        this.taskAssignmentService = taskAssignmentService;
    }

    async assignTaskHandler(_req: Request, _res: Response, _next: NextFunction) {

    }

    async reAssignTaskHandler(_req: Request, _res: Response, _next: NextFunction) {
    
    }

    async unAssignTaskHandler(_req: Request, _res: Response, _next: NextFunction) {
        
    }
}