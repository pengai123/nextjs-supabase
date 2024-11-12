import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { SettingsSidebar } from "@/components/SettingsSidebar"

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex flex-col">
      <SidebarProvider className="min-h-0 flex-1">
        <SettingsSidebar />
        <div className="relative w-full">
          <SidebarTrigger className="absolute left-4 top-4" />
          {children}
        </div>
      </SidebarProvider >
    </main>
  )
}