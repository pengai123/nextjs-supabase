'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { TloginFormData, TsignupFormData } from "@/lib/zodSchemas"
import { prisma } from '@/lib/prisma'

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
  redirect('/')
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

export async function resetPasswordForEmail(email: string) {
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
  redirect('/success')
}

export async function updatePassword(newPwd: { password: string }) {
  const supabase = createClient()
  const { error } = await supabase.auth.updateUser(newPwd)

  if (error) {
    console.log('error:', error.message)
    return { error: error.message }
  }

  revalidatePath('/', 'layout')
  redirect('/success')
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