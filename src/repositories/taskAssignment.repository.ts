import { Prisma, TaskAssignment } from "../../generated/prisma/client.js";
import { prisma } from "../configs/db.config.js";

export interface ITaskAssignmentRepository {
    create(data: Prisma.TaskAssignmentCreateInput): Promise<TaskAssignment>;
    findCurrentByTaskId(taskId: bigint): Promise<TaskAssignment | null>;
    closeAssignment(id: bigint,unassignmentReasonId?: bigint): Promise<TaskAssignment>;
}

export class TaskAssignmentRepository implements ITaskAssignmentRepository {
  async create(
    data: Prisma.TaskAssignmentCreateInput
  ): Promise<TaskAssignment> {
    const assignment = data as any;

    return prisma.taskAssignment.create({
      data: {
        task: { connect: { id: assignment.taskId } },
        developer: { connect: { id: assignment.developerId } },
        assignedByUser: { connect: { id: assignment.assignedBy } },
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

async closeAssignment(id: bigint,unassignmentReasonId?: bigint): Promise<TaskAssignment> {
    return prisma.taskAssignment.update({
      where: { id },
      data: {
        isCurrent: false,
        unassignedAt: new Date(),
        ...(unassignmentReasonId !== undefined && {
          unassignmentReason: {
            connect: { id: unassignmentReasonId },
          },
        }),
      },
    });
  }
}
