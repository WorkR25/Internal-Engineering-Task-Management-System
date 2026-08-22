import { ITaskAssignmentRepository } from "../repositories/taskAssignment.repository.js";
import { AssignTaskDto } from "../dtos/task.dto.js";
import { UnassignTaskDto } from "../dtos/task.dto.js";
import { ReassignTaskDto } from "../dtos/task.dto.js";
import { TaskAssignment } from "../../generated/prisma/client.js";

export interface ITaskAssignmentService {
    assignTask(taskId: bigint,data: AssignTaskDto,assignedBy: bigint): Promise<TaskAssignment> // populate parameter and return type using dto
    reAssignTask(taskId: bigint,data: ReassignTaskDto,assignedBy: bigint): Promise<TaskAssignment> // populate parameter and return type using dto
    unAssignTask(taskId: bigint,data: UnassignTaskDto): Promise<void>; // populate parameter and return type using dto

    // rest methods create one by one
}

export class TaskAssignmentService implements ITaskAssignmentService {
    private readonly taskassignmentRepository: ITaskAssignmentRepository;

    constructor(taskassignmentRepository: ITaskAssignmentRepository) {
        this.taskassignmentRepository = taskassignmentRepository;
    }

 async assignTask(taskId: bigint,data: AssignTaskDto,assignedBy: bigint): Promise<TaskAssignment> {
    return this.taskassignmentRepository.create({
      taskId,
      developerId: data.developerId,
      assignedBy,
    } as any);
  }

  async reAssignTask(taskId: bigint,data: ReassignTaskDto,assignedBy: bigint): Promise<TaskAssignment> {
    const currentAssignment =
      await this.taskassignmentRepository.findCurrentByTaskId(taskId);

    if (!currentAssignment) {
      throw new Error("Task is not currently assigned");
    }

    await this.taskassignmentRepository.closeAssignment(
      currentAssignment.id
    );

    return this.taskassignmentRepository.create({
      taskId,
      developerId: data.developerId,
      assignedBy,
    } as any);
  }

  async unAssignTask(taskId: bigint,data: UnassignTaskDto): Promise<void> {
    const currentAssignment =
      await this.taskassignmentRepository.findCurrentByTaskId(taskId);

    if (!currentAssignment) {
      throw new Error("Task is not currently assigned");
    }

    await this.taskassignmentRepository.closeAssignment(
      currentAssignment.id,
      data.unassignmentReasonId
    );
  }
}