import { MoveRight, PhoneCall } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from 'next/image'

export default function Hero() {
  return (
    <section className="py-16 lg:py-32 bg-[url('/abstract-bg1.jpg')] bg-cover bg-center">
      <div className="container mx-auto grid grid-cols-1 gap-8 items-center lg:grid-cols-2 justify-items-center">
        <div className="flex gap-4 flex-col">
          <div>
            <Badge variant="outline" className="text-custom-blue">We&apos;re live!</Badge>
          </div>
          <div className="flex gap-4 flex-col">
            <h1 className="text-5xl md:text-6xl max-w-xl tracking-tighter text-left font-regular">
              Connect you to the web, one hotlink at a time.
            </h1>
            <p className="text-lg leading-relaxed tracking-tight text-muted-foreground max-w-lg text-left">
              Managing a small business is tough enough. Avoid added complications by ditching outdated web solutions. At Hotlink Studio, we create modern, user-friendly websites and provide fast, reliable hosting. Let us handle your online presence so you can focus on growing your business.
            </p>
          </div>
          <div className="flex flex-row gap-4">
            <Button size="lg" className="gap-4" variant="outline">
              Call us <PhoneCall className="w-4 h-4" />
            </Button>
            <Button size="lg" className="gap-4">
              Sign up <MoveRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
        <div className="bg-muted rounded-md overflow-hidden aspect-square relative w-full max-w-[625px]">
          <Image
            src="/hero.jpg"
            alt="hero"
            fill
            style={{ objectFit: "cover" }}
            sizes="100%"
          />
        </div>
      </div>
    </section>
  )
}