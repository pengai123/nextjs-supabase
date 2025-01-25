import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { prisma } from "@/lib/prisma"
import { getUserData } from '@/app/actions'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"


export const metadata: Metadata = {
  title: 'Admin Dashboard',
  description: 'Admin page',
}

export default async function Dashboard() {
  const supabase = createClient()
  const { authData, profile, error } = await getUserData()
  const users = await prisma.profile.findMany()

  if (error) {
    return (
      <div className="container py-10 text-center">
        <h1 className="text-2xl text-red-500">Error loading dashboard</h1>
        <p>{error}</p>
      </div>
    )
  }

  if (profile?.role !== "ADMIN") {
    redirect('/')
  }

  return (
    <main className='flex-1'>
      <div className='container py-10 '>
        <h1 className="text-2xl text-center mb-14">Admin Dashboard</h1>

        <div className="mb-10">
          <h2 className="text-lg mb-4">Admin Information</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Full Name</TableHead>
                <TableHead>Company</TableHead>
                <TableHead className="text-right">Website</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>{profile?.email}</TableCell>
                <TableCell>{profile?.role}</TableCell>
                <TableCell>{profile?.phone_number ? `+${profile?.phone_country_code} ${profile?.phone_number}` : ""}</TableCell>
                <TableCell>{profile?.full_name}</TableCell>
                <TableCell>{profile?.company}</TableCell>
                <TableCell className="text-right">{profile?.website}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        <h2 className="text-lg">User list</h2>
        <div className='mt-5'>
          <Table>
            <TableCaption>All users.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className='min-w-[320px]'>ID</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead >Phone</TableHead>
                <TableHead >Full Name</TableHead>
                <TableHead >Company</TableHead>
                <TableHead className="text-right">Website</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {
                users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.id}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>{user.phone_number ? `+${user.phone_country_code} ${user.phone_number}` : ""}</TableCell>
                    <TableCell>{user.full_name}</TableCell>
                    <TableCell>{user.company}</TableCell>
                    <TableCell className="text-right">{user.website}</TableCell>
                  </TableRow>
                ))
              }
            </TableBody>
          </Table>
        </div>
      </div>
    </main>
  )
}