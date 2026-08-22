import { TaskAssignment } from "../../generated/prisma/client.js";
import { prisma } from "../configs/db.config.js";

export interface ITaskAssignmentRepository {

  create(data: {taskId: bigint;developerId: bigint;assignedBy: bigint; }): Promise<TaskAssignment>;
  findCurrentByTaskId(taskId: bigint): Promise<TaskAssignment | null>;
  closeAssignment(id: bigint,unassignmentReasonId?: bigint): Promise<TaskAssignment>;
  getAssignmentHistory(taskId: bigint): Promise<TaskAssignment[]>;
}

export class TaskAssignmentRepository implements ITaskAssignmentRepository {

  async create(data: {taskId: bigint;developerId: bigint;assignedBy: bigint;}): Promise<TaskAssignment> {

    return prisma.taskAssignment.create({
      data: {
        task: { connect: { id: data.taskId } },
        developer: { connect: { id: data.developerId } },
        assignedByUser: { connect: { id: data.assignedBy } },
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

  async getAssignmentHistory(taskId: bigint): Promise<TaskAssignment[]> {

    return prisma.taskAssignment.findMany({
      where: {
        taskId,
      },
      orderBy: {
        assignedAt: "asc",
      },
    });
  }
}