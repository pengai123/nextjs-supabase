"use client"
import { User, Shield, Settings, Bell } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import Link from 'next/link'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar
} from "@/components/ui/sidebar"


// Menu items.
const items = [
  {
    title: "Profile",
    href: "/profile",
    icon: User,
  },
  {
    title: "Account",
    href: "/account",
    icon: Shield,
  },
  {
    title: "Notifications",
    href: "/notification",
    icon: Bell,
  },
]

export function SettingsSidebar() {
  const { setOpenMobile } = useSidebar()
  return (
    <Sidebar className="h-full inset-y-auto">
      <SidebarContent>
        <SidebarGroup className="px-5 py-10">
          {/* <SidebarGroupLabel>
            <Settings className="h-5 w-5" />
            <h2 className="text-lg font-semibold tracking-tight">Settings</h2>
          </SidebarGroupLabel> */}
          <div className="flex items-center gap-2 px-2 py-2">
            <Settings className="h-5 w-5" />
            <h2 className="text-2xl font-semibold tracking-tight">Settings</h2>
          </div>

          <Separator className="my-2" />

          <SidebarGroupContent className="py-4">
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.href}
                      onClick={() => setOpenMobile(false)}
                      className="!text-base"
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}