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

export const updateEmailFormSchema = z.object({
  currentEmail: z.string().email("Please enter a valid email address."),
  newEmail: z.string().email("Please enter a valid email address."),
  password: z.string().min(6, "Password must be at least 6 characters."),
}).refine((data) => data.currentEmail !== data.newEmail, {
  message: "New Email can't be the same as old Email",
  path: ["newEmail"],
})

export type TupdateEmailFormData = z.infer<typeof updateEmailFormSchema>

export const profileFormData = z.object({
  fullName: z.string().optional(),
  phoneCountryCode: z.string().optional(),
  phoneNumber: z
    .string()
    .regex(/^\d{1,15}$/, "Please enter a valid phone number")
    .optional()
    .or(z.literal("")),
  company: z.string().optional(),
  website: z
    .string()
    .url("Please enter a valid URL")
    .optional()
    .or(z.literal("")),
})

export type TprofileFormData = z.infer<typeof profileFormData>

export const forgotPasswordFormSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
})

export type TforgotPasswordFormData = z.infer<typeof forgotPasswordFormSchema>

// Schema for update password form for account page
export const updatePasswordFormSchema = z.object({
  currentPassword: z.string().min(6, "Password must be at least 6 characters."),
  newPassword: z.string().min(6, "Password must be at least 6 characters."),
  confirmNewPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmNewPassword, {
  message: "Passwords don't match",
  path: ["confirmNewPassword"],
})

export type TupdatePasswordFormData = z.infer<typeof updatePasswordFormSchema>

// Schema for update password form for forgot password
export const forgotPasswordUpdateForm = z.object({
  newPassword: z.string().min(6, "Password must be at least 6 characters."),
  confirmNewPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmNewPassword, {
  message: "Passwords don't match",
  path: ["confirmNewPassword"],
})

export type TForgotPasswordUpdateData = z.infer<typeof forgotPasswordUpdateForm>

export const deleteAccountSchema = z.object({
  confirmation: z.string().refine((val) => val === "DELETE" || val === "", {
    message: 'Please type "DELETE" to confirm',
  }),
});

export type TdeleteAccountData = z.infer<typeof deleteAccountSchema>;

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