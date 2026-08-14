import { prisma } from "../configs/db.config.js";
import type { User } from "../../generated/prisma/client.js";

export interface IUserRepository {
    findByEmail(email: string): Promise<User | null>;

    create(
        fullName: string,
        email: string,
        passwordHash: string,
        roleId: bigint
    ): Promise<User>;

    find(): Promise<void>;
    findAll(): Promise<void>;
    update(): Promise<void>;
    delete(): Promise<void>;
}

export class UserRepository implements IUserRepository {

    async findByEmail(email: string): Promise<User | null> {
        return await prisma.user.findUnique({
            where: {
                email
            }
        });
    }

    async create(
        fullName: string,
        email: string,
        passwordHash: string,
        roleId: bigint
    ): Promise<User> {
        return await prisma.user.create({
            data: {
                fullName,
                email,
                passwordHash,
                roleId
            }
        });
    }

    async find(): Promise<void> {
        // Will implemented later
    }

    async findAll(): Promise<void> {
        
    }

    async update(): Promise<void> {
       
    }

    async delete(): Promise<void> {
        
    }
}