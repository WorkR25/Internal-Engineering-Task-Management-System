import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { IUserRepository } from "../repositories/user.repository.js";
import { LoginDto } from "../dtos/user.dto.js";
import { JWT_SECRET } from "../configs/server.config.js";
import { InternalServerError, UnauthorizedError } from "../utils/errors/app.error.js";

export interface IAuthService {
    signup(): Promise<void>;
    signin(): Promise<void>;
    login(data: LoginDto): Promise<{ token: string; user: { id: bigint; email: string; fullName: string; roleId: bigint; isActive: boolean; mustChangePassword: boolean; createdAt: Date; updatedAt: Date } }>;
}

export class AuthService implements IAuthService {
    private readonly userRepository: IUserRepository;

    constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository;
    }

    async signup(): Promise<void> {
        return;
    }

    async signin(): Promise<void> {
        return;
    }

    async login(data: LoginDto): Promise<{ token: string; user: { id: bigint; email: string; fullName: string; roleId: bigint; isActive: boolean; mustChangePassword: boolean; createdAt: Date; updatedAt: Date } }> {
        if (!JWT_SECRET) {
            throw new InternalServerError('JWT secret is not configured');
        }

        const user = await this.userRepository.findByEmail(data.email);

        if (!user) {
            throw new UnauthorizedError('Invalid email or password');
        }

        const isPasswordValid = await bcrypt.compare(data.password, user.passwordHash);

        if (!isPasswordValid) {
            throw new UnauthorizedError('Invalid email or password');
        }

        const token = jwt.sign(
            {
                userId: user.id,
                email: user.email,
            },
            JWT_SECRET,
            {
                expiresIn: '1h',
            }
        );

        return {
            token,
            user: {
                id: user.id,
                email: user.email,
                fullName: user.fullName,
                roleId: user.roleId,
                isActive: user.isActive,
                mustChangePassword: user.mustChangePassword,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
            },
        };
    }
}