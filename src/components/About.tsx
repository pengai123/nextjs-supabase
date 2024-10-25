"use client"

import Link from "next/link"
import { usePathname } from 'next/navigation'
import AboutTitle from '@/components/AboutTitle'
import { MoveRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function About() {
  const pathname = usePathname()
  return (<section className="flex gap-10 items-center justify-center flex-col">
    {pathname === "/" &&
      <Button variant="secondary" size="sm" className="gap-4" asChild>
        <Link href="/services">
          Learn more <MoveRight className="w-4 h-4" />
        </Link>
      </Button>
    }
    <AboutTitle />
    {pathname !== "/" &&
      <div className="max-w-5xl text-lg">
        <p className="mb-4">
          At Hotlink Studio, we specialize in creating modern, user-friendly websites that help businesses establish a powerful online presence. With a focus on simplicity and efficiency, we replace outdated web solutions with innovative, sleek designs tailored to your needs.
        </p>
        <p className="mb-4">
          Our mission is to streamline the web development process, eliminating unnecessary complexities and delivering high-performance websites that look great and work seamlessly.
        </p>
        <p className="">
          Whether you're looking for a fresh design or reliable hosting, Hotlink Studio is your go-to partner for all things web.
        </p>
      </div>
    }
  </section>
  )
}