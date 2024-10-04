import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { prisma } from "@/lib/prisma"

export const metadata: Metadata = {
  title: 'Admin Dashboard',
  description: 'Admin page',
}

export default async function Dashboard() {
  const supabase = createClient()
  const { data, error } = await supabase.auth.getUser()

  if (error || !data?.user) {
    redirect('/login')
  }

  const user = await prisma.profile.findUnique({
    where: {
      id: data.user.id
    }
  })

  if (user?.role !== "ADMIN") {
    redirect('/')
  }

  return (
    <main className='flex-1'>
      <div className="text-md">Admin Dashboard</div>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </main>
  )
}