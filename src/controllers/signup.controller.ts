import { Request, Response, NextFunction } from "express";
import { SignupService } from "../services/signup.service.js";
import { SignupRepository } from "../repositories/signup.repository.js";
import { signupRequestSchema, SignupResponseDto } from "../dtos/signup.dto.js";
import { sendSuccess } from "../utils/helpers/response.helper.js";
import { StatusCodes } from "http-status-codes";

export class SignupController {
    private readonly signupService: SignupService;

    constructor(signupService: SignupService = new SignupService(new SignupRepository())) {
        this.signupService = signupService;
    }

    async register(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            // Validate request payload
            const validatedPayload = signupRequestSchema.parse(req.body);

            // Call signup service
            const result = await this.signupService.register(validatedPayload);

            // Prepare response
            const response: SignupResponseDto = {
                success: true,
                message: 'User registered successfully',
                data: {
                    id: result.id,
                    fullName: result.fullName,
                    email: result.email,
                    roleId: result.roleId
                }
            };

            // Send response
            sendSuccess(res, response.data, StatusCodes.CREATED, response.message);
        } catch (error) {
            next(error);
        }
    }
}
