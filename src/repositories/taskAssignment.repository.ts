import { Prisma, TaskAssignment } from "../../generated/prisma/client.js";
import { prisma } from "../configs/db.config.js";

export interface ITaskAssignmentRepository {
    create(data: Prisma.TaskAssignmentCreateInput): Promise<TaskAssignment>
    assign(taskId: bigint, developerId: bigint, assignedBy: bigint): Promise<TaskAssignment>;
    reassign(taskId: bigint, developerId: bigint, assignedBy: bigint): Promise<TaskAssignment>;
    findCurrentByTaskId(taskId: bigint): Promise<TaskAssignment | null>;
    closeAssignment(id: bigint): Promise<TaskAssignment>;
}

export class TaskAssignmentRepository implements ITaskAssignmentRepository {
    async create(data: Prisma.TaskAssignmentCreateInput): Promise<TaskAssignment> {
        return prisma.taskAssignment.create({ data });
    }

    async assign(taskId: bigint, developerId: bigint, assignedBy: bigint): Promise<TaskAssignment> {
    return prisma.taskAssignment.create({
    data: {
      task: { connect: { id: taskId } },
      developer: { connect: { id: developerId } },
      assignedByUser: { connect: { id: assignedBy } },
      isCurrent: true,
    },
  });
}
    async reassign(taskId: bigint, developerId: bigint, assignedBy: bigint): Promise<TaskAssignment> {
    const currentAssignment = await prisma.taskAssignment.findFirst({
    where: {
      taskId,
      isCurrent: true,
    },
  });

  if (currentAssignment) {
    await prisma.taskAssignment.update({
      where: { id: currentAssignment.id },
      data: {
        isCurrent: false,
        unassignedAt: new Date(),
      },
    });
  }

  return prisma.taskAssignment.create({
    data: {
      task: { connect: { id: taskId } },
      developer: { connect: { id: developerId } },
      assignedByUser: { connect: { id: assignedBy } },
      isCurrent: true,
    },
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
