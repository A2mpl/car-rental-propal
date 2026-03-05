import Navbar from '@/components/layout/Navbar';
import CtaFooter from '@/components/sections/footer/CtaFooter';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
      <CtaFooter />
    </>
  );
}
