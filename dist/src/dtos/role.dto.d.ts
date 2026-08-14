import { z } from 'zod';
export declare const createRoleDto: z.ZodObject<{
    name: z.ZodString;
    description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, z.core.$strict>;
export declare const updateRoleDto: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
}, z.core.$strict>;
export type CreateRoleDto = z.infer<typeof createRoleDto>;
export type UpdateRoleDto = z.infer<typeof updateRoleDto>;
//# sourceMappingURL=role.dto.d.ts.map