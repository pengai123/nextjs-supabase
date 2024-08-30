import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export default async function PrivateData() {
  const supabase = createClient()
  const { data, error } = await supabase.auth.getUser()
  await new Promise((resolve) => setTimeout(resolve, 2000))
  if (error || !data?.user) {
    redirect('/login')
  }
  return (
    <>
      <p>Welcome, {data.user.email}</p>
      <pre>{JSON.stringify(data.user, null, 2)}</pre>
    </>
  )
}