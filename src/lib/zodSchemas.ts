import { z } from "zod"

export const loginFormSchema = z.object({
  email: z.string().email("Must be a valid email address."),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
})

export type TloginFormData = z.infer<typeof loginFormSchema>


export const signupFormSchema = z.object({
  email: z.string().email("Must be a valid email address."),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
  confirmPassword: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

export type TsignupFormData = z.infer<typeof signupFormSchema>