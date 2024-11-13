import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "./ThemeToggle"
import NavLinks from './NavLinks'
import { createClient } from '@/utils/supabase/server'
import Image from 'next/image'
import MobileMenu from "./MobileMenu"
import UserMenu from "./UserMenu"
import { prisma } from "@/lib/prisma"

const navItems = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "Contact", href: "/contact" },
  { name: "FAQ", href: "/faq" },
]

export default async function Header() {
  const supabase = createClient()
  const { data, error } = await supabase.auth.getUser()
  let isAdmin: boolean = false

  if (data?.user) {
    const user = await prisma.profile.findUnique({
      where: {
        id: data.user.id
      }
    })
    if (user?.role === "ADMIN") {
      isAdmin = true
    }
  }

  return (
    <div className="sticky top-0 z-50 h-[74px] flex justify-center items-center w-full py-2 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="w-full max-w-7xl px-2 sm:px-6 flex justify-between items-center">
        <Link href="/" className="text-lg font-semibold">
          <Image src="/logo.png" alt="logo" width={100} height={100} />
        </Link>
        <NavLinks navItems={navItems} />
        <div className="flex items-center gap-2">
          {data?.user ? <UserMenu user={data.user} isAdmin={isAdmin} /> : <Button size="sm" asChild><Link href="/login">Sign In</Link></Button>}
          <ThemeToggle />
          <MobileMenu navItems={navItems} />
        </div>
      </div>
    </div>
  )
}