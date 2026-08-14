import {
    User,
    Prisma
} from "../../generated/prisma/client.js";

import { prisma } from "../configs/db.config.js";

export interface IUserRepository {

    create(
        data: Prisma.UserCreateInput
    ): Promise<User>;

    find(
        email: string
    ): Promise<User | null>;
}

export class UserRepository
    implements IUserRepository {

    async create(
        data: Prisma.UserCreateInput
    ): Promise<User> {

        return await prisma.user.create({
            data
        });
    }

    async find(
        email: string
    ): Promise<User | null> {

        return await prisma.user.findUnique({
            where: {
                email
            }
        });
    }
}