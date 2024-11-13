"use client"

import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LogOut, Settings, Shield, User, Bell } from "lucide-react"
import { signOut } from "@/app/actions"

export default function UserMenu({ authData, profile }: { authData: any, profile: any }) {

  const handleLogout = async () => {
    try {
      await signOut()
    } catch (error) {
      console.error(error)
    }
  }

  const displayName = profile.full_name ? profile.full_name : authData.email.split("@")[0]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {/* <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/icon.ico" alt="@user" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </Button> */}
        <Button variant="ghost" size="icon" className="relative h-8 w-8 rounded-full">
          <User className="h-5 w-5" />
          <span className="sr-only">User menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="center" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{displayName}</p>
            <p className="text-xs leading-none text-muted-foreground">{authData.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {profile.role === "ADMIN" && (
            <DropdownMenuItem asChild>
              <Link href="/admin">
                <Shield className="mr-2 h-4 w-4" />
                <span>Admin Panel</span>
              </Link>
            </DropdownMenuItem>
          )}
          <DropdownMenuItem asChild>
            <Link href="/profile">
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/account">
              <Shield className="mr-2 h-4 w-4" />
              <span>Account</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/notification">
              <Bell className="mr-2 h-4 w-4" />
              <span>Notifications</span>
            </Link>
          </DropdownMenuItem>
          {/* <DropdownMenuItem asChild>
            <Link href="/settings">
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </Link>
          </DropdownMenuItem> */}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}