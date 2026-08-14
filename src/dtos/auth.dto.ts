import { z } from "zod";

export const signupSchema = z.object({
    fullName: z
        .string()
        .min(1, "Full name is required")
        .max(150, "Full name must not exceed 150 characters"),

    email: z
        .string()
        .email("Invalid email address")
        .max(255, "Email must not exceed 255 characters"),

    password: z
        .string()
        .min(8, "Password must be at least 8 characters long")
});

export type SignupDto = z.infer<typeof signupSchema>;