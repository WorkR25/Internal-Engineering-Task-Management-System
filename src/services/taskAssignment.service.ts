import { ITaskAssignmentRepository } from "../repositories/taskAssignment.repository.js";
import {AssignTaskDto,ReassignTaskDto,UnassignTaskDto,} from "../dtos/task.dto.js";
import { TaskAssignment } from "../../generated/prisma/client.js";

export interface ITaskAssignmentService {
  assignTask(taskId: bigint, data: AssignTaskDto, assignedBy: bigint): Promise<TaskAssignment>;
  reAssignTask(taskId: bigint, data: ReassignTaskDto, assignedBy: bigint): Promise<TaskAssignment>;
  unAssignTask(taskId: bigint, data: UnassignTaskDto): Promise<void>;
  getAssignmentHistory(taskId: bigint): Promise<TaskAssignment[]>;
}

export class TaskAssignmentService implements ITaskAssignmentService {
  private readonly taskassignmentRepository: ITaskAssignmentRepository;

  constructor(taskassignmentRepository: ITaskAssignmentRepository) {
    this.taskassignmentRepository = taskassignmentRepository;
  }

  async assignTask(taskId: bigint, data: AssignTaskDto, assignedBy: bigint): Promise<TaskAssignment> {
    return this.taskassignmentRepository.create({
      taskId,
      developerId: data.developerId,
      assignedBy,
    });
  }

  async reAssignTask(taskId: bigint, data: ReassignTaskDto, assignedBy: bigint): Promise<TaskAssignment> {
    const currentAssignment = await this.taskassignmentRepository.findCurrentByTaskId(taskId);

    if (currentAssignment) {
      await this.taskassignmentRepository.closeAssignment(currentAssignment.id);
    }

    return this.taskassignmentRepository.create({
      taskId,
      developerId: data.developerId,
      assignedBy,
    });
  }

  async unAssignTask(taskId: bigint, data: UnassignTaskDto): Promise<void> {
    const currentAssignment = await this.taskassignmentRepository.findCurrentByTaskId(taskId);

    if (currentAssignment) {
      await this.taskassignmentRepository.closeAssignment(
        currentAssignment.id,
        data.unassignmentReasonId
      );
    }
  }

  async getAssignmentHistory(taskId: bigint): Promise<TaskAssignment[]> {
    return this.taskassignmentRepository.getAssignmentHistory(taskId);
  }
}