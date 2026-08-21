import { Comment, Prisma } from "../../generated/prisma/client.js";
import { prisma } from "../configs/db.config.js";

export interface ICommentRepository {
    create(data: Prisma.CommentCreateInput): Promise<Comment>;
    getAll(): Promise<Comment[]>;
    get(id: bigint): Promise<Comment>;
    update(is: bigint): Promise<Comment>;
    delete(id: bigint): Promise<void>;
}

export class CommentRepository implements ICommentRepository {
    async create(data: Prisma.CommentCreateInput): Promise<Comment> {
        return prisma.comment.create({ data });
    }

    async getAll(): Promise<Comment[]> {
        return prisma.comment.findMany();
    }

    async get(id: bigint): Promise<Comment> {
        return prisma.comment.findUniqueOrThrow({
            where: { id },
        });
    }

    async update(id: bigint): Promise<Comment> {
        return prisma.comment.update({
            where: { id },
            data: {},
        });
    }

    async delete(id: bigint): Promise<void> {
        await prisma.comment.delete({
            where: { id },
        });
    }
}