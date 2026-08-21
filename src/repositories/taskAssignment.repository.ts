import { Prisma, TaskAssignment } from "../../generated/prisma/client.js";
import { prisma } from "../configs/db.config.js";

export interface ITaskAssignmentRepository {
    create(data: Prisma.TaskAssignmentCreateInput): Promise<TaskAssignment>
}

export class TaskAssignmentRepository implements ITaskAssignmentRepository {
    async create(data: Prisma.TaskAssignmentCreateInput): Promise<TaskAssignment> {
        return prisma.taskAssignment.create({ data });
    }
}