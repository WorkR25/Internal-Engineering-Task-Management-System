import { Request, Response, NextFunction } from "express";

import { ICommentService } from "../services/comment.service.js";

export class CommentController {
    private readonly commentService: ICommentService;

    constructor(commentService: ICommentService) {
        this.commentService = commentService;
    }

    async createCommentHandler(_req: Request, _res: Response, _next: NextFunction): Promise<void> {}

    async getAllCommentsHandler(_req: Request, _res: Response, _next: NextFunction): Promise<void> {}

    async getCommentHandler(_req: Request, _res: Response, _next: NextFunction): Promise<void> {}

    async updateCommentHandler(_req: Request, _res: Response, _next: NextFunction): Promise<void> {}

    async deleteCommentHandler(_req: Request, _res: Response, _next: NextFunction): Promise<void> {}
}