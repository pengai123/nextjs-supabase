import Hero from "@/components/Hero"
import Services from "@/components/Services"
import FAQ from "@/components/FAQ"

export default function Home() {
  return (
    <main className="flex-1 w-full">
      <Hero />
      <Services />
      <FAQ />
    </main>
  )
}
