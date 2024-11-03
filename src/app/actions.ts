'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { TloginFormData, TsignupFormData } from "@/lib/zodSchemas"
import { prisma } from '@/lib/prisma'
const nodemailer = require('nodemailer')

export async function login(formData: TloginFormData) {
  const supabase = createClient()
  console.log('formData:', formData)
  const { error } = await supabase.auth.signInWithPassword(formData)

  if (error) {
    console.log('error:', error.message)
    return { error: error.message }
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

export async function signup(formData: TsignupFormData) {
  const { email, password, fullName, phoneCountryCode, phoneNumber } = formData
  const supabase = createClient()
  console.log('formData:', formData)
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
    })

    if (error) {
      console.log('Supabase auth error:', error)
      return { error: error.message }
    }

    // Get the new user's ID from Supabase
    const userId = data?.user?.id;

    if (userId) {
      // Update the profile with additional information (full_name, phone, etc.)
      await prisma.profile.update({
        where: { id: userId },  // Match the profile by Supabase user ID
        data: {
          full_name: fullName || null,
          phone_country_code: phoneCountryCode || null,
          phone_number: phoneNumber || null,
        },
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

export async function signOut() {
  const supabase = createClient()
  const { error } = await supabase.auth.signOut()

  if (error) {
    console.log('error:', error?.message)
    redirect('/error')
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

export async function validateAuth() {
  const supabase = createClient()
  const { data, error } = await supabase.auth.getUser()

  if (error || !data?.user) {
    redirect('/login')
  }
  console.log("user:", data?.user)
  return true
}

export async function getUserData() {
  const supabase = createClient()
  const { data, error } = await supabase.auth.getUser()

  if (error || !data?.user) {
    redirect('/login')
    return { error: "User is not logged in. Please login in your account first." }
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