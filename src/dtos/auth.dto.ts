import { z } from "zod";

export const signupSchema = z.object({
    fullName: z.string().min(2).max(100),

    email: z.email(),

    password: z.string().min(6).max(100),

    roleName: z.string().min(1).max(50)
});

export type SignupDto = z.infer<typeof signupSchema>;