import { Request, Response, NextFunction } from "express";
import { sendSuccess } from "../utils/helpers/response.helper.js";
import { AuthenticatedRequest } from "../types/express.js";

import { IPerformanceService } from "../services/performance.service.js";

export class PerformanceController {
    private readonly performanceService: IPerformanceService;

    constructor(performanceService: IPerformanceService) {
        this.performanceService = performanceService;
    }

    async getCurrentUserPerformanceHandler(req: Request, res: Response, next: NextFunction){
        try {
        const { user } = req as AuthenticatedRequest;

        const performance =
            await this.performanceService.getCurrentUserPerformance(
                user.userId
            );

        sendSuccess(
            res,
            performance,
            200,
            "Performance fetched successfully"
        );
    } catch (error) {
        next(error);
    }

 }

   async getCurrentUserTaskLevelPerformanceHandler(req: Request, res: Response, next: NextFunction)
        {
        try {
            const { user } = req as AuthenticatedRequest;

            const performance =
                await this.performanceService.getCurrentUserTaskLevelPerformance(
                    user.userId
                );

            sendSuccess(
                res,
                performance,
                200,
                "Task-level performance fetched successfully"
            );
        } catch (error) {
            next(error);
        }
    }
 

    async getCurrentUserPerformanceTrendHandler(req: Request, res: Response, next: NextFunction){
        
        console.log("API 3 CONTROLLER HIT");
        
        try {
            const { user } = req as AuthenticatedRequest;

            const performance =
                await this.performanceService.getCurrentUserPerformanceTrend(
                    user.userId
                );

            sendSuccess(
                res,
                performance,
                200,
                "Performance trend fetched successfully"
            );
            } catch (error) {
                next(error);
        }
    }

    getAllDevelopersPerformanceHandler(req: Request, res: Response, next: NextFunction): void {}

    getDeveloperPerformanceHandler(req: Request, res: Response, next: NextFunction): void {}

    getDeveloperTaskLevelPerformanceHandler(req: Request, res: Response, next: NextFunction): void {}

    getDeveloperPerformanceTrendHandler(req: Request, res: Response, next: NextFunction): void {}
}