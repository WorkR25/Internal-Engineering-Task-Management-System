import { z } from 'zod';

export const signupRequestSchema = z.object({
    fullName: z.string()
        .min(1, 'Full name is required')
        .max(150, 'Full name must not exceed 150 characters'),
    email: z.string()
        .email('Invalid email format'),
    password: z.string()
        .min(8, 'Password must be at least 8 characters')
        .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
        .regex(/[0-9]/, 'Password must contain at least one number')
        .regex(/[@$!%*?&]/, 'Password must contain at least one special character'),
    roleId: z.number()
        .int('Role ID must be an integer')
        .positive('Role ID must be positive')
});

export type SignupRequestDto = z.infer<typeof signupRequestSchema>;

export interface SignupResponseDto {
    success: boolean;
    message: string;
    data: {
        id: bigint;
        fullName: string;
        email: string;
        roleId: bigint;
    };
}
