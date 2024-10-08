import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "./ThemeToggle"
import NavLinks from './NavLinks'
import { createClient } from '@/utils/supabase/server'
import { signOut } from "@/app/(auth)/actions"
import Image from 'next/image'
import MobileMenu from "./MobileMenu"

const navItems = [
  { name: "Home", href: "/" },
  { name: "Product", href: "/product" },
  { name: "Admin", href: "/admin" },
  { name: "Private", href: "/private" },
]

export default async function Header() {
  const supabase = createClient()
  const { data, error } = await supabase.auth.getUser()

  return (
    <div className="sticky top-0 z-50 w-full py-2 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto h-14 px-2 sm:px-6 flex justify-between items-center">
        <Link href="/" className="text-lg font-semibold">
          <Image src="/logo.png" alt="logo" width={100} height={100} />
        </Link>
        <NavLinks navItems={navItems} />
        <div className="flex items-center gap-2">
          {data?.user ? <><p className="text-sm">{data?.user?.email}</p><form action={signOut}><Button size="sm" type="submit">Log Out</Button></form></> : <Button size="sm" asChild><Link href="/login">Sign In</Link></Button>}
          <ThemeToggle />
          <MobileMenu navItems={navItems} />
        </div>
      </div>
    </div>
  )
}