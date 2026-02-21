import Navbar from '@/components/layout/Navbar'
import Hero from '@/components/sections/Hero'
import WhyUs from '@/components/sections/WhyUs'
import SellYourCar from '@/components/sections/SellYourCar'
import FAQ from '@/components/sections/FAQ'
import Testimonials from '@/components/sections/Testimonials'
import CTAFooter from '@/components/sections/CTAFooter'
import HowItWorks from "@/components/sections/HowItWorks";

export default function Home() {
  return (
    <main className="bg-[#0a0a0a] text-white">
      <Navbar />
      <Hero />
      <WhyUs />
      <SellYourCar />
        <HowItWorks/>
      <FAQ />
      <Testimonials />
      <CTAFooter />
    </main>
  )
}
