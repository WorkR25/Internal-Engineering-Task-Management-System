import { Request, Response, NextFunction } from "express";

import { ISubmissionService } from "../services/submission.service.js";

export class SubmissionController {
    private readonly submissionService: ISubmissionService; 

    constructor(submissionService: ISubmissionService) {
        this.submissionService = submissionService;
    }

    async createSubmissionHandler(_req: Request, _res: Response, _next: NextFunction) {
    }
}