import { Request, Response, NextFunction } from "express";

import { IPerformanceService } from "../services/performance.service.js";

export class PerformanceController {
    private readonly performanceService: IPerformanceService;

    constructor(performanceService: IPerformanceService) {
        this.performanceService = performanceService;
    }

    getCurrentUserPerformanceHandler(_req: Request, _res: Response, _next: NextFunction): void {}

    getCurrentUserTaskLevelPerformanceHandler(_req: Request, _res: Response, _next: NextFunction): void {}

    getCurrentUserPerformanceTrendHandler(_req: Request, _res: Response, _next: NextFunction): void {}

    getAllDevelopersPerformanceHandler(_req: Request, _res: Response, _next: NextFunction): void {}

    getDeveloperPerformanceHandler(_req: Request, _res: Response, _next: NextFunction): void {}

    getDeveloperTaskLevelPerformanceHandler(_req: Request, _res: Response, _next: NextFunction): void {}

    getDeveloperPerformanceTrendHandler(_req: Request, _res: Response, _next: NextFunction): void {}
}