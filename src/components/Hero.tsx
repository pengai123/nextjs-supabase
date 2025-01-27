import { MoveRight, PhoneCall } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DotPattern, WavePattern, GridPattern, CirclePattern } from "@/components/ui/decorative-svgs"
import Image from 'next/image'
import Link from "next/link"

export default function Hero() {
  return (
    <section className="relative py-14 flex justify-center items-center lg:h-[calc(100vh-74px)] overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 z-0">
        <GridPattern />
      </div>

      <div className="absolute top-20 right-10 z-[1] animate-pulse">
        <DotPattern />
      </div>

      <div className="absolute -bottom-20 left-20 z-[1]">
        <WavePattern />
      </div>

      <div className="absolute top-1/4 left-1/4 z-[1] opacity-60">
        <CirclePattern />
      </div>

      {/* Main content */}
      <div className="container relative z-10 mx-auto grid grid-cols-1 gap-8 items-center lg:grid-cols-2 justify-items-center">
        <div className="flex gap-4 flex-col">
          <div>
            <Badge variant="outline" className="text-custom-blue">We&apos;re live!</Badge>
          </div>
          <div className="flex gap-4 flex-col">
            <h1 className="text-5xl md:text-6xl max-w-xl tracking-tighter text-left font-regular">
              Connect you to the web, one hotlink at a time.
            </h1>
            <p className="text-lg leading-relaxed tracking-tight text-muted-foreground max-w-lg text-left">
              At Hotlink Studio, we create modern, user-friendly websites and provide fast, reliable hosting. Let us handle your online presence so you can focus on growing your business.
            </p>
          </div>
          <div className="flex flex-row gap-4">
            <Button asChild size="lg" className="gap-4" variant="outline">
              <Link href="/contact">
                Contact us <PhoneCall className="w-4 h-4" />
              </Link>
            </Button>
            <Button asChild size="lg" className="gap-4">
              <Link href="/signup">
                Sign up <MoveRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
        <div className="rounded-md overflow-hidden relative w-full max-w-[600px] aspect-square">
          <Image
            src="/hero.jpg"
            alt="hero"
            fill
            sizes="100%"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  )
}