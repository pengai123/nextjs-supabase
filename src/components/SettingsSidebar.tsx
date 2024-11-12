import { User, Shield, Settings } from "lucide-react"
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
]

export function SettingsSidebar() {
  return (
    <Sidebar className="h-full inset-y-auto">
      <SidebarContent>
        <SidebarGroup className="px-2 py-6">
          {/* <SidebarGroupLabel>
            <Settings className="h-5 w-5" />
            <h2 className="text-lg font-semibold tracking-tight">Settings</h2>
          </SidebarGroupLabel> */}
          <div className="flex items-center gap-2 px-2 py-2">
            <Settings className="h-5 w-5" />
            <h2 className="text-lg font-semibold tracking-tight">Settings</h2>
          </div>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.href}>
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