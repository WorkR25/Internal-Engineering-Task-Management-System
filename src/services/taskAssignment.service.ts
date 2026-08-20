import { ITaskAssignmentRepository } from "../repositories/taskAssignment.repository.js";
import { AssignTaskDto } from "../dtos/task.dto.js";
import { ReassignTaskDto } from "../dtos/task.dto.js";
import { TaskAssignment } from "../../generated/prisma/client.js";

export interface ITaskAssignmentService {
    assignTask(taskId: bigint, data: AssignTaskDto, assignedBy: bigint): Promise<TaskAssignment>;  // populate parameter and return type using dto
    reAssignTask(taskId: bigint, data: ReassignTaskDto, assignedBy: bigint): Promise<TaskAssignment>;  // populate parameter and return type using dto
    unAssignTask(): Promise<void>  // populate parameter and return type using dto

    // rest methods create one by one
}

export class TaskAssignmentService implements ITaskAssignmentService {
    private readonly taskassignmentRepository: ITaskAssignmentRepository;

    constructor(taskassignmentRepository: ITaskAssignmentRepository) {
        this.taskassignmentRepository = taskassignmentRepository;
    }

    async assignTask(taskId: bigint, data: AssignTaskDto, assignedBy: bigint): Promise<TaskAssignment> {
    return this.taskassignmentRepository.assign(taskId, data.developerId, assignedBy);
  }

    async reAssignTask(taskId: bigint, data: ReassignTaskDto, assignedBy: bigint): Promise<TaskAssignment> {
    return this.taskassignmentRepository.reassign(taskId, data.developerId, assignedBy);
  }

    async unAssignTask(): Promise<void> {
        // implement properly
    }
}