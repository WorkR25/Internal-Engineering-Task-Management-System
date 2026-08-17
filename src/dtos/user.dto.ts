import { z } from "zod";

export const createUserSchema = z.object({
  fullName: z
    .string()
    .min(1, "fullName is required")
    .max(150, "fullName must not exceed 150 characters"),

  email: z
    .email("Invalid email"),

  password: z
    .string()
    .min(8, "password must contain at least 8 characters"),
});

export type SignupDto = z.infer<typeof createUserSchema>;

export const signinSchema = z.object({
  email: z
    .string()
    .email("Invalid email address"),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters"),
});

export type SigninDto = z.infer<typeof signinSchema>;