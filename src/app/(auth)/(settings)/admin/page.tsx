import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { prisma } from "@/lib/prisma"
import { getUserData } from '@/app/actions'
import { formatPhoneNumber } from '@/lib/utils'
import { Separator } from "@/components/ui/separator"
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

export default async function AdminPage() {
  const { error, profile } = await getUserData()
  if (error || profile?.role !== "ADMIN") {
    redirect('/')
    return null
  }

  const users = await prisma.profile.findMany()

  return (
    <div className="px-2 py-20 sm:px-4 md:px-8 lg:px-16 space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Admin Dashboard</h2>
        <p className="text-muted-foreground">
          Manage system users and settings
        </p>
      </div>

      <Separator />

      <div className="grid gap-6">
        <section className="rounded-lg border p-6">
          <h3 className="text-lg font-semibold mb-4">Admin Information</h3>
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
                <TableCell>
                  <span className="px-2 py-1 bg-primary/10 text-primary rounded-full text-sm">
                    {profile?.role}
                  </span>
                </TableCell>
                <TableCell>
                  {profile?.phone_number ?
                    `+${profile?.phone_country_code} ${formatPhoneNumber(profile?.phone_number)}` :
                    "—"}
                </TableCell>
                <TableCell>{profile?.full_name || "—"}</TableCell>
                <TableCell>{profile?.company || "—"}</TableCell>
                <TableCell className="text-right">{profile?.website || "—"}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </section>

        <section className="rounded-lg border p-6">
          <h3 className="text-lg font-semibold mb-4">User List</h3>
          <Table>
            <TableCaption>A list of all registered users in the system.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Full Name</TableHead>
                <TableHead>Company</TableHead>
                {/* <TableHead className="text-right">Created At</TableHead> */}
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.email}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-sm ${user.role === 'ADMIN'
                      ? 'bg-primary/10 text-primary'
                      : 'bg-muted text-muted-foreground'
                      }`}>
                      {user.role}
                    </span>
                  </TableCell>
                  <TableCell>
                    {user.phone_number ?
                      `+${user.phone_country_code} ${formatPhoneNumber(user.phone_number)}` :
                      "—"}
                  </TableCell>
                  <TableCell>{user.full_name || "—"}</TableCell>
                  <TableCell>{user.company || "—"}</TableCell>
                  {/* <TableCell className="text-right">
                    {new Date(user.created_at).toLocaleDateString()}
                  </TableCell> */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </section>
      </div>
    </div>
  )
}