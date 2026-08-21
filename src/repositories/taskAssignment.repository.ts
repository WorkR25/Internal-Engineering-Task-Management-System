import { Prisma, TaskAssignment } from "../../generated/prisma/client.js";
import { prisma } from "../configs/db.config.js";

export interface ITaskAssignmentRepository {
    create(data: Prisma.TaskAssignmentCreateInput): Promise<TaskAssignment>;
    findCurrentByTaskId(taskId: bigint): Promise<TaskAssignment | null>;
    closeAssignment(id: bigint): Promise<TaskAssignment>;
}

export class TaskAssignmentRepository implements ITaskAssignmentRepository {
  async create(
  data: Prisma.TaskAssignmentCreateInput
): Promise<TaskAssignment> {
  return prisma.taskAssignment.create({
    data,
  });
}

    async findCurrentByTaskId(taskId: bigint): Promise<TaskAssignment | null> {
    return prisma.taskAssignment.findFirst({
    where: {
      taskId,
      isCurrent: true,
    },
  });
}

async closeAssignment(id: bigint): Promise<TaskAssignment> {
  return prisma.taskAssignment.update({
    where: { id },
    data: {
      isCurrent: false,
      unassignedAt: new Date(),
        },
    });
    }
}
