import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "./ThemeToggle"
import NavLinks from './NavLinks'
import Image from 'next/image'
import MobileMenu from "./MobileMenu"
import UserMenu from "./UserMenu"
import { getUserData } from "@/app/actions"

const navItems = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "Contact", href: "/contact" },
  { name: "FAQ", href: "/faq" },
]

export default async function Header() {
  const { authData, profile } = await getUserData()

  return (
    <div className="sticky top-0 z-50 h-[74px] flex justify-center items-center w-full py-2 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="w-full max-w-7xl px-2 sm:px-6 flex justify-between items-center">
        <Link href="/" className="inline-block w-[100px] h-[45px]">
          <Image src="/logo.png" alt="logo" width={100} height={100} className="w-full h-full" priority />
        </Link>
        <NavLinks navItems={navItems} />
        <div className="flex items-center gap-2">
          {authData ? <UserMenu authData={authData} profile={profile} /> : <Button size="sm" asChild><Link href="/login">Sign In</Link></Button>}
          <ThemeToggle />
          <MobileMenu navItems={navItems} />
        </div>
      </div>
    </div>
  )
}