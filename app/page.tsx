import Navbar from '@/components/layout/Navbar';
import BrandStrip from '@/components/sections/BrandStrip';
import CtaFooter from '@/components/sections/CtaFooter';
import Faq from '@/components/sections/Faq';
import Hero from '@/components/sections/Hero';
import HowItWorks from '@/components/sections/HowItWorks';
import SellYourCar from '@/components/sections/SellYourCar';
import Testimonials from '@/components/sections/Testimonials';
import WhyUs from '@/components/sections/WhyUs';

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <BrandStrip />
      <WhyUs />
      <SellYourCar />
      <HowItWorks />
      <Faq />
      <Testimonials />
      <CtaFooter />
    </main>
  );
}
