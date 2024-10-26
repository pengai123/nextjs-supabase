'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { TloginFormData, TsignupFormData } from "@/lib/zodSchemas"
import { prisma } from '@/lib/prisma'
const nodemailer = require('nodemailer')

export async function login(data: TloginFormData) {
  const supabase = createClient()
  // type-casting here for convenience
  // in practice, you should validate your inputs
  // const data = {
  //   email: formData.get('email') as string,
  //   password: formData.get('password') as string,
  // }
  console.log('data:', data)
  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    console.log('error:', error.message)
    return { error: error.message }
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

export async function signup(data: TsignupFormData) {
  const supabase = createClient()
  // type-casting here for convenience
  // in practice, you should validate your inputs
  // const data = {
  //   email: formData.get('email') as string,
  //   password: formData.get('password') as string,
  // }
  console.log('data:', data)

  const user = await prisma.profile.findUnique({
    where: { email: data.email }
  })

  console.log('user:', user)

  if (user) {
    return { error: "This account already exists." }
  }

  const { error } = await supabase.auth.signUp(data)

  if (error) {
    console.log('error:', error)
    return { error: error.message }
  }

  revalidatePath('/', 'layout')
  // redirect('/')
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