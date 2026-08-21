import { prisma } from "../configs/db.config.js";
import { TaskActivity } from "../../generated/prisma/client.js";

export interface ITaskActivityRepository {findByTaskId(taskId: bigint): Promise<TaskActivity[]>;}

export class TaskActivityRepository implements ITaskActivityRepository {
  async findByTaskId(taskId: bigint): Promise<TaskActivity[]> {
    return prisma.taskActivity.findMany({
      where: {
        taskId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }
}