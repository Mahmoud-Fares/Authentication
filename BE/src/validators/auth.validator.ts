import { z, ZodError } from "zod";
import customError from "../utils/customError";

// Custom error map for Zod
const customErrorMap: z.ZodErrorMap = (issue) => {
   return { message: issue.message || "Invalid input" };
};

z.setErrorMap(customErrorMap);

// Schema definitions
const nameSchema = z
   .string()
   .min(2, "Name must be at least 2 characters")
   .max(50, "Name must not exceed 50 characters")
   .trim();

const emailSchema = z
   .string()
   .email("Invalid email address")
   .toLowerCase()
   .trim();

const passwordSchema = z
   .string()
   .min(6, "Password must be at least 6 characters")
   .max(100, "Password is too long");

// Combined schemas
const registerSchema = z.object({
   name: nameSchema,
   email: emailSchema,
   password: passwordSchema,
});

const loginSchema = z.object({
   email: emailSchema,
   password: passwordSchema,
});

// Types based on schemas
export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;

// Validation functions
export const validateRegister = (data: unknown): RegisterInput => {
   try {
      return registerSchema.parse(data);
   } catch (error) {
      if (error instanceof ZodError) {
         const firstError = error.errors[0];
         throw customError.create(
            firstError.message || "Validation failed",
            400,
            "VALIDATION_ERROR"
         );
      }
      throw customError.create("Validation failed", 400, "VALIDATION_ERROR");
   }
};

export const validateLogin = (data: unknown): LoginInput => {
   try {
      return loginSchema.parse(data);
   } catch (error) {
      if (error instanceof ZodError) {
         const firstError = error.errors[0];
         throw customError.create(
            firstError.message || "Validation failed",
            400,
            "VALIDATION_ERROR"
         );
      }
      throw customError.create("Validation failed", 400, "VALIDATION_ERROR");
   }
};

// Schema exports (for reuse in other validators if needed)
export const schemas = {
   register: registerSchema,
   login: loginSchema,
   name: nameSchema,
   email: emailSchema,
   password: passwordSchema,
} as const;
