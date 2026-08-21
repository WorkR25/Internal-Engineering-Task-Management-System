import { Request, Response, NextFunction } from "express";

import { IPerformanceService } from "../services/performance.service.js";

export class PerformanceController {
    private readonly performanceService: IPerformanceService;

    constructor(performanceService: IPerformanceService) {
        this.performanceService = performanceService;
    }

    getCurrentUserPerformanceHandler(req: Request, res: Response, next: NextFunction): void {}

    getCurrentUserTaskLevelPerformanceHandler(req: Request, res: Response, next: NextFunction): void {}

    getCurrentUserPerformanceTrendHandler(req: Request, res: Response, next: NextFunction): void {}

    async getAllDevelopersPerformanceHandler(req: Request,res: Response,next: NextFunction): Promise<void> {
    try {
        const performance =
            await this.performanceService.getAllDevelopersPerformance();

        res.status(200).json({
            success: true,
            message: "Developers performance fetched successfully",
            data: performance
        });
    } catch (error) {
        next(error);
        }
    }

    getDeveloperPerformanceHandler(req: Request, res: Response, next: NextFunction): void {}

    getDeveloperTaskLevelPerformanceHandler(req: Request, res: Response, next: NextFunction): void {}

    getDeveloperPerformanceTrendHandler(req: Request, res: Response, next: NextFunction): void {}
}