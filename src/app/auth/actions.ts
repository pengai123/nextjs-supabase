'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { TloginFormData, TsignupFormData } from "@/lib/zodSchemas"

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
  const { error } = await supabase.auth.signUp(data)


  if (error) {
    console.log('error:', error.message)
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
