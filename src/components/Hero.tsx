import { MoveRight, PhoneCall } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from 'next/image'
import Link from "next/link"

export default function Hero() {
  return (
    <section className="relative flex justify-center items-center lg:h-[calc(100vh-74px)]">
      <div className="absolute top-16 right-10 z-[-1]"><svg width="93" height="93" viewBox="0 0 93 93" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="2.5" cy="2.5" r="2.5" fill="#3056D3"></circle><circle cx="2.5" cy="24.5" r="2.5" fill="#3056D3"></circle><circle cx="2.5" cy="46.5" r="2.5" fill="#3056D3"></circle><circle cx="2.5" cy="68.5" r="2.5" fill="#3056D3"></circle><circle cx="2.5" cy="90.5" r="2.5" fill="#3056D3"></circle><circle cx="24.5" cy="2.5" r="2.5" fill="#3056D3"></circle><circle cx="24.5" cy="24.5" r="2.5" fill="#3056D3"></circle><circle cx="24.5" cy="46.5" r="2.5" fill="#3056D3"></circle><circle cx="24.5" cy="68.5" r="2.5" fill="#3056D3"></circle><circle cx="24.5" cy="90.5" r="2.5" fill="#3056D3"></circle><circle cx="46.5" cy="2.5" r="2.5" fill="#3056D3"></circle><circle cx="46.5" cy="24.5" r="2.5" fill="#3056D3"></circle><circle cx="46.5" cy="46.5" r="2.5" fill="#3056D3"></circle><circle cx="46.5" cy="68.5" r="2.5" fill="#3056D3"></circle><circle cx="46.5" cy="90.5" r="2.5" fill="#3056D3"></circle><circle cx="68.5" cy="2.5" r="2.5" fill="#3056D3"></circle><circle cx="68.5" cy="24.5" r="2.5" fill="#3056D3"></circle><circle cx="68.5" cy="46.5" r="2.5" fill="#3056D3"></circle><circle cx="68.5" cy="68.5" r="2.5" fill="#3056D3"></circle><circle cx="68.5" cy="90.5" r="2.5" fill="#3056D3"></circle><circle cx="90.5" cy="2.5" r="2.5" fill="#3056D3"></circle><circle cx="90.5" cy="24.5" r="2.5" fill="#3056D3"></circle><circle cx="90.5" cy="46.5" r="2.5" fill="#3056D3"></circle><circle cx="90.5" cy="68.5" r="2.5" fill="#3056D3"></circle><circle cx="90.5" cy="90.5" r="2.5" fill="#3056D3"></circle></svg></div>
      <div className="absolute bottom-0 left-0 z-[-1] opacity-50"><svg width="364" height="201" viewBox="0 0 364 201" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.88928 72.3303C33.6599 66.4798 101.397 64.9086 150.178 105.427C211.155 156.076 229.59 162.093 264.333 166.607C299.076 171.12 337.718 183.657 362.889 212.24" stroke="url(#paint0_linear_25:218)"></path><path d="M-22.1107 72.3303C5.65989 66.4798 73.3965 64.9086 122.178 105.427C183.155 156.076 201.59 162.093 236.333 166.607C271.076 171.12 309.718 183.657 334.889 212.24" stroke="url(#paint1_linear_25:218)"></path><path d="M-53.1107 72.3303C-25.3401 66.4798 42.3965 64.9086 91.1783 105.427C152.155 156.076 170.59 162.093 205.333 166.607C240.076 171.12 278.718 183.657 303.889 212.24" stroke="url(#paint2_linear_25:218)"></path><path d="M-98.1618 65.0889C-68.1416 60.0601 4.73364 60.4882 56.0734 102.431C120.248 154.86 139.905 161.419 177.137 166.956C214.37 172.493 255.575 186.165 281.856 215.481" stroke="url(#paint3_linear_25:218)"></path><circle opacity="0.8" cx="214.505" cy="60.5054" r="49.7205" transform="rotate(-13.421 214.505 60.5054)" stroke="url(#paint4_linear_25:218)"></circle><circle cx="220" cy="63" r="43" fill="url(#paint5_radial_25:218)"></circle><defs><linearGradient id="paint0_linear_25:218" x1="184.389" y1="69.2405" x2="184.389" y2="212.24" gradientUnits="userSpaceOnUse"><stop stopColor="#4A6CF7" stopOpacity="0"></stop><stop offset="1" stopColor="#4A6CF7"></stop></linearGradient><linearGradient id="paint1_linear_25:218" x1="156.389" y1="69.2405" x2="156.389" y2="212.24" gradientUnits="userSpaceOnUse"><stop stopColor="#4A6CF7" stopOpacity="0"></stop><stop offset="1" stopColor="#4A6CF7"></stop></linearGradient><linearGradient id="paint2_linear_25:218" x1="125.389" y1="69.2405" x2="125.389" y2="212.24" gradientUnits="userSpaceOnUse"><stop stopColor="#4A6CF7" stopOpacity="0"></stop><stop offset="1" stopColor="#4A6CF7"></stop></linearGradient><linearGradient id="paint3_linear_25:218" x1="93.8507" y1="67.2674" x2="89.9278" y2="210.214" gradientUnits="userSpaceOnUse"><stop stopColor="#4A6CF7" stopOpacity="0"></stop><stop offset="1" stopColor="#4A6CF7"></stop></linearGradient><linearGradient id="paint4_linear_25:218" x1="214.505" y1="10.2849" x2="212.684" y2="99.5816" gradientUnits="userSpaceOnUse"><stop stopColor="#4A6CF7"></stop><stop offset="1" stopColor="#4A6CF7" stopOpacity="0"></stop></linearGradient><radialGradient id="paint5_radial_25:218" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(220 63) rotate(90) scale(43)"><stop offset="0.145833" stopColor="white" stopOpacity="0"></stop><stop offset="1" stopColor="white" stopOpacity="0.08"></stop></radialGradient></defs></svg></div>
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
        <div className="rounded-md overflow-hidden aspect-square relative w-full max-w-[600px]">
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