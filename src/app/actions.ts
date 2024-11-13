'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { TloginFormData, TprofileFormData, TsignupFormData, TupdateEmailFormData, TupdatePasswordFormData } from "@/lib/zodSchemas"
import { prisma } from '@/lib/prisma'
import { headers } from 'next/headers'
const nodemailer = require('nodemailer')

function getOrigin() {
  const headersList = headers()
  const host = headersList.get('host')
  const protocol = headersList.get('x-forwarded-proto') || 'http' // Use https in production if set by your reverse proxy
  const origin = `${protocol}://${host}`
  return origin
}

export async function login(formData: TloginFormData) {
  const supabase = createClient()
  console.log('formData:', formData)
  const { data, error } = await supabase.auth.signInWithPassword(formData)

  if (error || !data.user) {
    return { error: "Invalid email or password." }
  }

  revalidatePath('/', 'layout')
  redirect('/profile')
}

export async function signup(formData: TsignupFormData) {
  const { email, password, fullName, phoneCountryCode, phoneNumber } = formData
  const supabase = createClient()
  const origin = getOrigin()
  const redirectTo = `${origin}/profile`
  try {
    // Check if a profile with this email already exists
    const existingUser = await prisma.profile.findUnique({
      where: { email }
    })

    console.log('existingUser:', existingUser)

    if (existingUser) {
      return { error: "This account already exists." }
    }

    // Create new user in Supabase Auth
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectTo, // Redirect to "/profile" after confirmation
      },
    })

    if (error || !data.user) {
      console.log('signup error:', error)
      return { error: error?.message }
    }

    // Get the new user's ID from Supabase
    const userId = data.user?.id;

    //Update any filled profile data
    const profileData: Record<string, any> = {}
    if (fullName) {
      profileData.full_name = fullName
    }

    if (phoneNumber) {
      profileData.phone_number = phoneNumber
      profileData.phone_country_code = phoneCountryCode
    }

    if (fullName || phoneNumber) {
      // Update the profile with additional information (full_name, phone, etc.)
      await prisma.profile.update({
        where: { id: userId },  // Match the profile by Supabase user ID
        data: profileData,
      });
    }
  } catch (error: any) {
    console.log('error:', error.message)
    return { error: "An unexpected error occurred. Please try again." }
  }
  //Redirect to success page
  revalidatePath('/', 'layout')
  redirect('/success?from=signup')
}

export async function updateEmail(formData: TupdateEmailFormData) {
  //Get origin
  const origin = getOrigin()
  console.log('origin:', origin)

  const { currentEmail, newEmail, password } = formData
  console.log('update email formData:', formData)
  const supabase = createClient()

  //Authenticate the user with their current email and password
  const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
    email: currentEmail,
    password,
  })

  if (signInError || !signInData.user) {
    return { error: "Invalid email or password." };
  }

  // Update the user's email with Supabase auth
  const { data: updateData, error: updateError } = await supabase.auth.updateUser({
    email: newEmail,
  }, {
    emailRedirectTo: `${origin}/account`
  });

  if (updateError) {
    return { error: "Failed to update email. Please try again." };
  }
  revalidatePath('/', 'layout')
  return { success: true, message: "We've sent a confirmation email to your new email address. Please check your inbox and follow the link to confirm the change and complete the update." }
}

export async function updateAccountPassword({ email, formData }: { email: string, formData: TupdatePasswordFormData }) {
  //Get origin
  const headersList = headers()
  const host = headersList.get('host')
  const protocol = headersList.get('x-forwarded-proto') || 'http' // Use https in production if set by your reverse proxy
  const origin = `${protocol}://${host}`

  console.log('origin:', origin)

  const { currentPassword, newPassword } = formData
  console.log('update password formData:', formData)
  const supabase = createClient()

  //Authenticate the user with their current email and password
  const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
    email,
    password: currentPassword,
  })

  if (signInError || !signInData.user) {
    return { error: "Invalid email or password." };
  }

  // Update the user's password with Supabase auth
  const { data: updateData, error: updateError } = await supabase.auth.updateUser({
    password: newPassword,
  });

  if (updateError) {
    return { error: "Failed to update password. Please try again." };
  }

  return { success: true, message: "Your password has been successfully updated. You can now log in with your new password." }
}

export async function updateProfile(formData: TprofileFormData) {
  const { fullName, phoneCountryCode, phoneNumber, company, website } = formData

  try {
    // Get the current user's ID from Supabase Auth
    const { authData, profile, error } = await getUserData()
    if (error) {
      return { error: "Failed to fetch user information." }
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
    return { error: "An unexpected error occurred. Please try again." };
  }
}

export async function signOut() {
  const supabase = createClient()
  const { error } = await supabase.auth.signOut()

  if (error) {
    console.log('error:', error?.message)
    redirect('/error')
    return
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

export async function forgotPasswordForEmail(email: string) {
  const supabase = createClient()
  const user = await prisma.profile.findUnique({
    where: { email }
  })

  console.log('user:', user)

  if (!user) {
    return { error: "This account does not exist." }
  }

  const { data, error } = await supabase.auth.resetPasswordForEmail(email)

  if (error) {
    console.log('error:', error)
    return { error: error.message }
  }
  revalidatePath('/', 'layout')
  redirect('/success?from=forgotpassword')
}

export async function updatePassword(newPwd: { password: string }) {
  const supabase = createClient()
  const { error } = await supabase.auth.updateUser(newPwd)

  if (error) {
    console.log('error:', error.message)
    return { error: error.message }
  }

  revalidatePath('/', 'layout')
  redirect('/success?from=updatepassword')
}

export async function deleteAccount(confirmation: string) {
  const supabase = createClient()

  if (confirmation !== "DELETE") {
    return { error: "Please type DELETE to confirm the deletion of your account." }
  }

  try {
    const { data, error } = await supabase.auth.getUser()

    if (error || !data.user) {
      return { error: "User is not logged in." }
    }

    // Delete the currently authenticated user from the auth.users table
    const { error: deleteAuthError } = await supabase.rpc("delete_user")
    if (deleteAuthError) {
      return { error: `Failed to delete user from Auth: ${deleteAuthError.message}` }
    }

    revalidatePath('/', 'layout')
    return { success: true, message: 'Account deleted successfully.' }
  } catch (error: any) {
    return { success: false, message: `Error deleting account: ${error.message}` }
  }
}

export async function getAuthData() {
  const supabase = createClient()
  const { data, error } = await supabase.auth.getUser()

  if (error || !data?.user) {
    return { error: "User is not logged in." }
  }
  return { authData: data.user }
}

export async function getUserData() {
  const supabase = createClient()
  const { data, error } = await supabase.auth.getUser()

  if (error || !data.user) {
    return { error: "User is not logged in." }
  }

  // Get the user's ID from Supabase
  const userId = data?.user?.id;
  try {
    // Fetch the profile from Prisma using the user's ID
    const profile = await prisma.profile.findUnique({
      where: { id: userId },  // Match the profile by Supabase user ID
    })
    if (!profile) {
      return { error: "Profile not found for the user." };
    }
    return { authData: data.user, profile }
  } catch (error) {
    return { error: "An unexpected error occurred. Please try again." }
  }
}


export async function submitContactMessage(msgBody: { name: string, company?: string, email: string, message: string }) {
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
      subject: 'New Contact Message from Hotlink Studio', // Subject line
      html: `
        <h1>New Message from Hotlink Studio Contact Page</h1>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Company:</strong> ${company}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    }

    // 4. Send email
    await transporter.sendMail(mailOptions)
    return { success: 'Message sent successfully!' }
  } catch (error: any) {
    console.log(error.message)
    return { error: 'Something went wrong while sending the message.' }
  }
}