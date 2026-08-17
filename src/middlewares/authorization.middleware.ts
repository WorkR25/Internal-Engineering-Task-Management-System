import { Request, Response, NextFunction } from "express";
import { UnauthorizedError } from "../utils/errors/app.error.js";
import { RoleRepository } from "../repositories/role.repository.js";
import { RoleService } from "../services/role.service.js";
import { UserTokenPayload } from "../types/user.type.js";

const roleService = new RoleService(new RoleRepository());

export async function authorizeAdmin(
    _req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        const user = res.locals.user as UserTokenPayload;

        if (!user) {
            return next(
                new UnauthorizedError("Authentication required")
            );
        }

        const role = await roleService.findRoleById(
    BigInt(user.roleId)
);

if (!role || role.name !== "ADMIN") {
    return next(
        new UnauthorizedError("You are not authorized")
    );
}

next();
    } catch (error) {
        next(error);
    }
}