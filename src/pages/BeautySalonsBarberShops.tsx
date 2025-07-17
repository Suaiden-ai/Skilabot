import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import HeroSection from "@/components/sections/beauty-salons-barber-shops/HeroSection";
import MetricsSection from "@/components/sections/beauty-salons-barber-shops/MetricsSection";
import BenefitsSection from "@/components/sections/beauty-salons-barber-shops/BenefitsSection";
import ExpertiseSectionBeauty from "@/components/sections/beauty-salons-barber-shops/ExpertiseSectionBeauty";
import TestimonialsSection from "@/components/sections/beauty-salons-barber-shops/TestimonialsSection";
import FAQSection from "@/components/sections/beauty-salons-barber-shops/FAQSection";
import DealershipsPlansSection from "@/components/sections/dealerships/PlansSection";
import { usePageTitle } from "@/hooks/usePageTitle";

export default function BeautySalonsBarberShops() {
  usePageTitle("Beauty Salons & Barber Shops | Skilabot");
  return (
    <>
      <Header />
      <HeroSection />
      <MetricsSection />
      <BenefitsSection />
      <ExpertiseSectionBeauty />
      <DealershipsPlansSection />
      <TestimonialsSection />
      <FAQSection />
      <Footer />
    </>
  );
} 