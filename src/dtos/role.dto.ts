import { z } from 'zod';

const roleName = z.string()
    .trim()
    .min(1, 'Role name is required')
    .max(50, 'Role name must be at most 50 characters');

const roleDescription = z.string()
    .trim()
    .max(255, 'Role description must be at most 255 characters')
    .nullable();

export const createRoleDto = z.object({
    name: roleName,
    description: roleDescription.optional(),
}).strict();

export const updateRoleDto = createRoleDto.partial()
    .refine((data) => Object.keys(data).length > 0, {
        message: 'Provide at least one field to update',
    });

export type CreateRoleDto = z.infer<typeof createRoleDto>;
export type UpdateRoleDto = z.infer<typeof updateRoleDto>;
