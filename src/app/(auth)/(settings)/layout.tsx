import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { SettingsSidebar } from "@/components/SettingsSidebar"
import { getUserData } from '@/app/actions'
import { redirect } from 'next/navigation'

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { error, profile } = await getUserData()
  if (error) {
    redirect('/login')
    return
  }

  return (
    <main className="flex flex-col">
      <SidebarProvider className="min-h-0 flex-1">
        <SettingsSidebar isAdmin={profile?.role === 'ADMIN'} />
        <div className="relative w-full">
          <SidebarTrigger className="absolute left-4 top-4" />
          {children}
        </div>
      </SidebarProvider>
    </main>
  )
}