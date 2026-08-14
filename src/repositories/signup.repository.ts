// @ts-ignore
//import { PrismaClient } from "../../../generated/prisma/client.js";
import { PrismaClient } from "../../generated/prisma/index.js";

export interface CreateUserPayload {
    fullName: string;
    email: string;
    passwordHash: string;
    roleId: bigint;
}

export interface SignupRepositoryResult {
    id: bigint;
    fullName: string;
    email: string;
    roleId: bigint;
}

export class SignupRepository {
    private readonly prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    async checkUserExists(email: string): Promise<boolean> {
        const user = await this.prisma.user.findUnique({
            where: { email }
        });
        return !!user;
    }

    async createUser(payload: CreateUserPayload): Promise<SignupRepositoryResult> {
        const user = await this.prisma.user.create({
            data: {
                fullName: payload.fullName,
                email: payload.email,
                passwordHash: payload.passwordHash,
                roleId: payload.roleId
            }
        });

        return {
            id: user.id,
            fullName: user.fullName,
            email: user.email,
            roleId: user.roleId
        };
    }
}
