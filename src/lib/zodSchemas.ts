import { z } from "zod"

export const loginFormSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  password: z.string()
    .min(6, "Password must be at least 6 characters.")
    .regex(/^\S*$/, "Password must not contain spaces"),
})

export type TloginFormData = z.infer<typeof loginFormSchema>


export const signupFormSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(6, "Password must be at least 6 characters."),
  confirmPassword: z.string(),
  fullName: z.string().optional(),
  phoneCountryCode: z.string().optional(),
  phoneNumber: z
    .string()
    .regex(/^\d{1,15}$/, "Please enter a valid phone number")
    .optional()
    .or(z.literal("")),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

export type TsignupFormData = z.infer<typeof signupFormSchema>

export const forgotPasswordFormSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
})

export type TforgotPasswordFormData = z.infer<typeof forgotPasswordFormSchema>

export const updatePasswordFormSchema = z.object({
  newPassword: z.string().min(6, "Password must be at least 6 characters."),
  confirmNewPassword: z.string().min(6, "Password must be at least 6 characters."),
}).refine((data) => data.newPassword === data.confirmNewPassword, {
  message: "Passwords don't match",
  path: ["confirmNewPassword"],
})

export type TupdatePasswordFormData = z.infer<typeof updatePasswordFormSchema>


export const contactFormSchema = z.object({
  name: z.string()
    .min(1, "Name is required.")
    .max(50, "Name must not exceed 50 characters."),
  company: z.string()
    .max(50, "Company name must not exceed 50 characters.")
    .or(z.literal("")),
  email: z.string()
    .email("Please enter a valid email address."),
  message: z.string()
    .min(1, "Message is required."),
})

export type TcontactFormData = z.infer<typeof contactFormSchema>