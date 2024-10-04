'use client'
import Link from "next/link"
import { usePathname } from 'next/navigation'

export default function NavLinks({ navItems }: { navItems: { name: string, href: string }[] }) {
  const pathname = usePathname()

  return (
    <nav className="gap-4 lg:gap-6 text-sm items-center hidden sm:flex">
      {navItems.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className={`${pathname === item.href ? "text-custom-blue" : ""} hover:text-custom-blue`}
        >
          {item.name}
        </Link>
      ))
      }
    </nav >
  )
}