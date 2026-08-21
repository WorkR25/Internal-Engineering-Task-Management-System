import { TaskActivity } from "../../generated/prisma/client.js";
import {ITaskActivityRepository,} from "../repositories/taskActivity.repository.js";

export interface ITaskActivityService {getTaskActivities(taskId: bigint): Promise<TaskActivity[]>;}

export class TaskActivityService implements ITaskActivityService {
  private readonly taskActivityRepository: ITaskActivityRepository;

  constructor(taskActivityRepository: ITaskActivityRepository) {
    this.taskActivityRepository = taskActivityRepository;
  }

  async getTaskActivities(taskId: bigint): Promise<TaskActivity[]> {
    return this.taskActivityRepository.findByTaskId(taskId);
  }
}