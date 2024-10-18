"use client"
import { Button } from "@/components/ui/button"
import { HamburgerMenuIcon } from "@radix-ui/react-icons"
import { useState } from "react"
import Link from "next/link"
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetHeader,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet"

export default function MobileMenu({ navItems }: { navItems: { name: string, href: string }[] }) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className="sm:hidden">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" >
            <HamburgerMenuIcon className="h-[1.2rem] w-[1.2rem]" />
          </Button>
        </SheetTrigger>
        <SheetContent side="top" className="inset-0">
          <SheetTitle></SheetTitle>
          <SheetDescription></SheetDescription>
          <div className="mt-6 flow-root">
            <div className="space-y-1 py-6">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block text-center px-3 py-2 rounded-md text-base hover:text-custom-blue"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}