'use client'
import Link from "next/link"
import { usePathname } from 'next/navigation'

export default function NavLinks() {
  const pathname = usePathname()
  return (
    <nav className="gap-4 lg:gap-6 text-sm items-center hidden sm:flex">
      <Link href="/" className={`${pathname === "/" ? "text-blue-400" : ""} hover:text-blue-400`}>Home</Link>
      <Link href="/product" className={`${pathname === "/product" ? "text-blue-400" : ""} hover:text-blue-400`}>Product</Link>
      <Link href="/admin" className={`${pathname === "/demo" ? "text-blue-400" : ""} hover:text-blue-400`}>Admin</Link>
      <Link href="/private" className={`${pathname === "/contact" ? "text-blue-400" : ""} hover:text-blue-400`}>Private</Link>
    </nav>
  )
}