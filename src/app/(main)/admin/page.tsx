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
  const supabase = await createClient()
  const { authData, profile, error } = await getUserData()
  const users = await prisma.profile.findMany()

  if (error) {
    return (
      <div className="container py-20 text-center">
        <h1 className="text-3xl font-bold text-red-500">Error loading dashboard</h1>
        <p className="mt-4 text-gray-600">{error}</p>
      </div>
    )
  }

  if (profile?.role !== "ADMIN") {
    redirect('/')
  }

  return (
    <main className='flex-1'>
      <div className='container py-12 max-w-7xl mx-auto'>
        <h1 className="text-3xl font-bold text-center mb-16">Admin Dashboard</h1>

        <div className="space-y-12">
          <section className="rounded-lg border shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-6">Admin Information</h2>
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
                  <TableCell className="font-medium">{profile?.email}</TableCell>
                  <TableCell><span className="px-2 py-1 bg-primary/10 text-primary rounded-full text-sm">{profile?.role}</span></TableCell>
                  <TableCell>{profile?.phone_number ? `+${profile?.phone_country_code} ${profile?.phone_number}` : "—"}</TableCell>
                  <TableCell>{profile?.full_name || "—"}</TableCell>
                  <TableCell>{profile?.company || "—"}</TableCell>
                  <TableCell className="text-right">{profile?.website || "—"}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </section>

          <section className="rounded-lg border shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-6">User List</h2>
            <Table>
              <TableCaption>A list of all registered users in the system.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[280px]">ID</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Full Name</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead className="text-right">Website</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-mono text-sm">{user.id}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-sm ${user.role === 'ADMIN'
                        ? 'bg-primary/10 text-primary'
                        : 'bg-muted text-muted-foreground'
                        }`}>
                        {user.role}
                      </span>
                    </TableCell>
                    <TableCell>{user.phone_number ? `+${user.phone_country_code} ${user.phone_number}` : "—"}</TableCell>
                    <TableCell>{user.full_name || "—"}</TableCell>
                    <TableCell>{user.company || "—"}</TableCell>
                    <TableCell className="text-right">{user.website || "—"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </section>
        </div>
      </div>
    </main>
  )
}