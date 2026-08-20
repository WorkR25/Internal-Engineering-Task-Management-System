import { z } from "zod";

import { TaskStatus, TaskPriority } from "../../generated/prisma/enums.js";

export const taskIdSchema = z.object({
  taskId: z.coerce.bigint("taskId must be a valid number"),
});

export const getTasksQuerySchema = z.object({
  projectId: z.coerce.bigint("Project ID must be a valid number"),
});

export const createTaskSchema = z.object({
  projectId: z.coerce.bigint("Project ID must be a valid number"),
  title: z.string().min(1, "Title is required").max(255),
  description: z.string().optional(),
  status: z.enum(TaskStatus).optional(),
  priority: z.enum(TaskPriority).optional(),
  deadline: z.coerce.date("Deadline must be a valid date").optional(),
});

export const updateTaskSchema = z.object({
  title: z.string().min(1, "Title cannot be empty").max(255).optional(),
  description: z.string().optional(),
  priority: z.enum(TaskPriority).optional(),
  deadline: z.coerce.date("Deadline must be a valid date").optional(),
}).refine(
  function (data) {
    return data.title !== undefined || 
           data.description !== undefined || 
           data.priority !== undefined || 
           data.deadline !== undefined;
  },
  { message: "At least one field must be provided to update" }
);

export const assignTaskSchema = z.object({
  developerId: z.coerce.bigint("Developer ID must be a valid number"),
});

export const reassignTaskSchema = z.object({
  developerId: z.coerce.bigint("Developer ID must be a valid number"),
});

export type TaskIdDto = z.infer<typeof taskIdSchema>;
export type CreateTaskDto = z.infer<typeof createTaskSchema>;
export type UpdateTaskDto = z.infer<typeof updateTaskSchema>;
export type AssignTaskDto = z.infer<typeof assignTaskSchema>;
export type ReassignTaskDto = z.infer<typeof reassignTaskSchema>;
