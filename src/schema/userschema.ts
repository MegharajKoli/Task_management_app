import { z } from "zod";

const userCore = {
  name: z
    .string({ message: "Name is required" })
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name is too long")
    .trim(),

  email: z
    .string({ message: "Email is required" })
    .trim()
    .toLowerCase()
    .pipe(z.email("Invalid email format")),

  contact: z
    .string({ message: "Contact number is required" })
    .min(10, "Contact number is short")
    .max(10, "Contact number is long")
    .regex(
      /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[6789]\d{9}$/,
      "Please enter a valid  mobile number "
    )
    .trim(),

  password: z
    .string({ message: "Password is required" })
    .min(8, "Password must be at least 8 characters")
    .max(100, "Password is too long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
};

export const createUserSchema = z
  .object({
    ...userCore,
  })
  .strict(); 


