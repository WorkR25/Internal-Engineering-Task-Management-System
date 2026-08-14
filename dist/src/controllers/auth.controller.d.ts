import { Request, Response, NextFunction } from "express";
import { IAuthService } from "../services/auth.service.js";
export declare class AuthController {
    private readonly authService;
    constructor(authService: IAuthService);
    signupHandler(_req: Request, _res: Response, next: NextFunction): Promise<void>;
    signinHandler(_req: Request, _res: Response, next: NextFunction): Promise<void>;
}
//# sourceMappingURL=auth.controller.d.ts.map