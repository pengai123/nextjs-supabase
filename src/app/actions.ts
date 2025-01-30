'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { TloginFormData, TprofileFormData, TsignupFormData, TupdateEmailFormData, TupdatePasswordFormData } from "@/lib/zodSchemas"
import { prisma } from '@/lib/prisma'
import { headers } from 'next/headers'
const nodemailer = require('nodemailer')

type ActionResponse = {
  success: boolean;
  message: string;
}

async function getOrigin() {
  const headersList = await headers()
  const host = headersList.get('host')
  const protocol = headersList.get('x-forwarded-proto') || 'http' // Use https in production if set by your reverse proxy
  const origin = `${protocol}://${host}`
  return origin
}


export async function login(formData: TloginFormData): Promise<ActionResponse> {
  const supabase = await createClient()
  console.log('formData:', formData)
  const { data, error } = await supabase.auth.signInWithPassword(formData)

  if (error || !data.user) {
    return {
      success: false,
      message: "Invalid email or password."
    }
  }

  redirect('/profile')
  return { success: true, message: "Login successful" }
}

export async function loginWithGoogle(): Promise<ActionResponse> {
  const supabase = await createClient()
  const origin = await getOrigin()

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${origin}/auth/callback?next=/profile`,
      queryParams: {
        prompt: "select_account",
      }
    },
  });

  if (error) {
    return {
      success: false,
      message: `Google sign-in failed: ${error.message}`
    }
  }

  if (!data?.url) {
    return {
      success: false,
      message: "Failed to get Google authentication URL"
    }
  }

  // Perform redirect OUTSIDE of try/catch
  redirect(data.url)
  return { success: true, message: "Redirecting to Google login..." } // This line is never reached
}

export async function signup(formData: TsignupFormData): Promise<ActionResponse> {
  const { email, password, fullName, phoneCountryCode, phoneNumber } = formData
  const supabase = await createClient()
  const origin = await getOrigin()
  const redirectToURL = `${origin}/profile`

  // Check if a profile with this email already exists
  const existingUser = await prisma.profile.findUnique({
    where: { email }
  })

  if (existingUser) {
    return {
      success: false,
      message: "This account already exists."
    }
  }

  // Create new user in Supabase Auth
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: redirectToURL,
    },
  })

  if (error || !data.user) {
    return {
      success: false,
      message: error?.message || "Signup failed"
    }
  }

  // Update any filled profile data
  const profileData: Record<string, any> = {}
  if (fullName) profileData.full_name = fullName
  if (phoneNumber) {
    profileData.phone_number = phoneNumber
    profileData.phone_country_code = phoneCountryCode
  }

  if (Object.keys(profileData).length > 0) {
    await prisma.profile.update({
      where: { id: data.user.id },
      data: profileData,
    })
  }

  // Redirect after all operations
  await redirectTo('/success?from=signup')
  return { success: true, message: "Signup successful" } // Never reached
}

export async function updateEmail(formData: TupdateEmailFormData): Promise<ActionResponse> {
  //Get origin
  const origin = await getOrigin()
  console.log('origin:', origin)

  const { currentEmail, newEmail, password } = formData
  console.log('update email formData:', formData)
  const supabase = await createClient()

  //Authenticate the user with their current email and password
  const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
    email: currentEmail,
    password,
  })

  if (signInError || !signInData.user) {
    return {
      success: false,
      message: "Invalid email or password."
    }
  }

  // Update the user's email with Supabase auth
  const { data: updateData, error: updateError } = await supabase.auth.updateUser({
    email: newEmail,
  }, {
    emailRedirectTo: `${origin}/account`
  });

  if (updateError) {
    return {
      success: false,
      message: "Failed to update email. Please try again."
    }
  }
  revalidatePath('/', 'layout')
  return { success: true, message: "We've sent a confirmation email to your new email address. Please check your inbox and follow the link to confirm the change and complete the update." }
}

export async function updateAccountPassword({ email, formData }: { email: string, formData: TupdatePasswordFormData }): Promise<ActionResponse> {
  const origin = await getOrigin()

  console.log('origin:', origin)

  const { currentPassword, newPassword } = formData
  console.log('update password formData:', formData)
  const supabase = await createClient()

  //Authenticate the user with their current email and password
  const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
    email,
    password: currentPassword,
  })

  if (signInError || !signInData.user) {
    return {
      success: false,
      message: "Invalid email or password."
    }
  }

  // Update the user's password with Supabase auth
  const { data: updateData, error: updateError } = await supabase.auth.updateUser({
    password: newPassword,
  });

  if (updateError) {
    return {
      success: false,
      message: "Failed to update password. Please try again."
    }
  }

  return { success: true, message: "Your password has been successfully updated. You can now log in with your new password." }
}

export async function updateProfile(formData: TprofileFormData): Promise<ActionResponse> {
  const { fullName, phoneCountryCode, phoneNumber, company, website } = formData

  try {
    // Get the current user's ID from Supabase Auth
    const { authData, profile, error } = await getUserData()
    if (error) {
      return {
        success: false,
        message: "Failed to fetch user information."
      }
    }

    // Check for changes, update profile table
    const updates: Record<string, any> = {}
    if (fullName !== profile?.full_name) updates.full_name = fullName;
    if (phoneCountryCode !== profile?.phone_country_code) updates.phone_country_code = phoneCountryCode;
    if (phoneNumber !== profile?.phone_number) updates.phone_number = phoneNumber;
    if (company !== profile?.company) updates.company = company;
    if (website !== profile?.website) updates.website = website;

    // If there are changes, update the profile
    if (Object.keys(updates).length > 0) {
      // Update the profile with additional information (full_name, phone, etc.)
      await prisma.profile.update({
        where: { id: authData?.id },  // Match the profile by Supabase user ID
        data: updates,
      });

      revalidatePath('/profile')
      return { success: true, message: "Profile updated successfully" };
    } else {
      return { success: true, message: "No changes detected" };
    }
  } catch (error: any) {
    return {
      success: false,
      message: "An unexpected error occurred. Please try again."
    }
  }
}

export async function signOut(): Promise<ActionResponse> {
  const supabase = await createClient()
  const { error } = await supabase.auth.signOut()

  if (error) {
    return {
      success: false,
      message: "Failed to sign out. Please try again later."
    }
  }

  // Perform redirect after successful logout
  await redirectTo('/')
  return {
    success: true,
    message: "You have been successfully signed out."
  }
}

export async function forgotPasswordForEmail(email: string): Promise<ActionResponse> {
  const supabase = await createClient()
  const user = await prisma.profile.findUnique({
    where: { email }
  })

  console.log('user:', user)

  if (!user) {
    return {
      success: false,
      message: "This account does not exist."
    }
  }

  const { data, error } = await supabase.auth.resetPasswordForEmail(email)

  if (error) {
    console.log('error:', error)
    return {
      success: false,
      message: error.message
    }
  }
  await redirectTo('/success?from=forgotpassword')
  return { success: true, message: "Password reset email sent" }
}

export async function updatePassword(newPwd: { password: string }): Promise<ActionResponse> {
  const supabase = await createClient()
  const { error } = await supabase.auth.updateUser(newPwd)

  if (error) {
    return {
      success: false,
      message: error.message
    }
  }

  await redirectTo('/success?from=updatepassword')
  return { success: true, message: "Password updated successfully" }
}

export async function deleteAccount(confirmation: string): Promise<ActionResponse> {
  const supabase = await createClient()

  if (confirmation !== "DELETE") {
    return {
      success: false,
      message: "Please type DELETE to confirm the deletion of your account."
    }
  }

  try {
    const { data, error } = await supabase.auth.getUser()

    if (error || !data.user) {
      return {
        success: false,
        message: "User is not logged in."
      }
    }

    // Delete the currently authenticated user from the auth.users table
    const { error: deleteAuthError } = await supabase.rpc("delete_user")
    if (deleteAuthError) {
      return {
        success: false,
        message: `Failed to delete user from Auth: ${deleteAuthError.message}`
      }
    }

    revalidatePath('/', 'layout')
    return {
      success: true,
      message: "Account successfully deleted"
    }
  } catch (error: any) {
    return {
      success: false,
      message: "Failed to delete account: " + error.message
    }
  }
}

export async function getAuthData(): Promise<{ error?: string; authData?: any }> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase.auth.getUser()

    if (error || !data?.user) {
      return { error: "User is not logged in." }
    }
    return { authData: data.user }
  } catch (error) {
    return { error: "Failed to get auth data." }
  }
}

export async function getUserData(): Promise<{ error?: string; authData?: any; profile?: any }> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase.auth.getUser()

    if (error || !data?.user) {
      return { error: "User is not logged in." }
    }

    const userId = data.user.id
    const profile = await prisma.profile.findUnique({
      where: { id: userId },
    })

    if (!profile) {
      return { error: "Profile not found for the user." }
    }

    return { authData: data.user, profile }
  } catch (error) {
    console.error("Error getting user data:", error)
    return { error: "An unexpected error occurred. Please try again." }
  }
}

export async function submitContactMessage(msgBody: { name: string, company?: string, email: string, message: string }): Promise<ActionResponse> {
  const { name, company, email, message } = msgBody
  const transporter = nodemailer.createTransport({
    host: 'smtp.zoho.com', // Change this based on the SMTP service you're using (e.g., smtp.gmail.com for Gmail)
    port: 587, // or 587 if using TLS
    secure: false, // true for port 465 (SSL), false for port 587 (TLS)
    auth: {
      user: process.env.HLS_CONTACT_EMAIL, // Your email address (e.g., Zoho Mail or Gmail)
      pass: process.env.HLS_CONTACT_EMAIL_PASS, // Your email password or app-specific password
    },
  })

  try {
    const mailOptions = {
      from: `"Hotlink Studio" <${process.env.HLS_CONTACT_EMAIL}>`,
      to: process.env.HLS_CONTACT_EMAIL,
      replyTo: email,
      subject: `New message from ${name} via Hotlink Studio`,

      html: `
        <h1>New message from ${name} via Hotlink Studio</h1>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Company:</strong> ${company}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    }

    // 4. Send email
    await transporter.sendMail(mailOptions)
    return {
      success: true,
      message: 'Message sent successfully!'
    }
  } catch (error: any) {
    return {
      success: false,
      message: 'Something went wrong while sending the message.'
    }
  }
}

export async function redirectTo(path: string): Promise<void> {
  // Revalidate the layout to ensure fresh data
  revalidatePath('/', 'layout')
  // Perform the redirect
  redirect(path)
}