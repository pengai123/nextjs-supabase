"use client"
import Image from 'next/image'
import Link from "next/link"
import { usePathname } from 'next/navigation'
import ServiceTitle from './ServiceTitle'
import { Badge } from "@/components/ui/badge"
import { MoveRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import About from '@/components/About'

const services = [
  {
    title: "Website Developemnt",
    description: "Streamline your online presence with cutting-edge web development. At Hotlink Studio, we design responsive, high-performance websites tailored to meet your business needs",
    image: "/webdev.jpg"
  },
  {
    title: "Website Hosting",
    description: "Keep your website online and fast with dependable hosting from Hotlink Studio. Our hosting services ensure your site is always secure, stable, and ready for visitors.",
    image: "/webhosting.jpg"
  },
  {
    title: "Domain Setup",
    description: "Get your domain up and running with ease at Hotlink Studio. We handle everything from domain registration to renewals, ensuring your online identity is secure and up-to-date.",
    image: "/domain.jpg"
  },
  {
    title: "Business Email Setup",
    description: "Set up a professional business email with Hotlink Studio. We provide seamless email setup services to help you establish a credible, branded communication platform for your business.",
    image: "/email.jpg"
  },
]
export default function Services() {
  const pathname = usePathname()

  return (
    <section className="w-full">
      <div className="container mx-auto">
        <div className="flex gap-10 py-16 lg:py-32 items-center justify-center flex-col">
          {pathname === "/" &&
            <Button variant="secondary" size="sm" className="gap-4" asChild>
              <Link href="/services">
                Learn more <MoveRight className="w-4 h-4" />
              </Link>
            </Button>
          }
          <ServiceTitle />
          {pathname !== "/" && <About />}
          <div className='flex flex-col gap-4 items-center mt-10'>
            <Badge variant="outline" className="text-primary">Services</Badge>
            <div className="flex gap-2 flex-col">
              <h4 className="text-3xl md:text-5xl tracking-tighter max-w-xl text-center font-regular">
                Our Web Services
              </h4>
              <p className="text-lg leading-relaxed tracking-tight text-muted-foreground max-w-xl text-center">
                Clear Answers to Help You Navigate Our Services for a Seamless Online Experience
              </p>
            </div>
            <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-20">
              {
                services.map(svc => (
                  <div className="flex flex-col gap-2 w-full max-w-[500px]" key={svc.title}>
                    <div className="bg-muted rounded-md overflow-hidden aspect-video relative w-full">
                      <Image
                        src={svc.image}
                        alt="hero"
                        fill
                        style={{ objectFit: "cover" }}
                        sizes="100%"
                      />
                    </div>
                    <h3 className="text-xl tracking-tight">{svc.title}</h3>
                    <p className="text-muted-foreground text-base">
                      {svc.description}
                    </p>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </section >
  )
}