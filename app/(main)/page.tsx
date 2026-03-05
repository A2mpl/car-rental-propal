import BrandStrip from '@/components/sections/brandstrip/BrandStrip';
import Faq from '@/components/sections/faq/Faq';
import Hero from '@/components/sections/hero/Hero';
import HowItWorks from '@/components/sections/howitswork/HowItWorks';
import SellYourCar from '@/components/sections/sellyourcar/SellYourCar';
import Testimonials from '@/components/sections/testimonials/Testimonials';
import WhyUs from '@/components/sections/whyus/WhyUs';

export default function Home() {
  return (
    <main>
      <Hero />
      <BrandStrip />
      <WhyUs />
      <SellYourCar />
      <HowItWorks />
      <Faq />
      <Testimonials />
    </main>
  );
}
