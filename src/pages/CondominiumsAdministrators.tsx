import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import HeroSection from "@/components/sections/condominiums-administrators/HeroSection";
import MetricsSection from "@/components/sections/condominiums-administrators/MetricsSection";
import BenefitsSection from "@/components/sections/condominiums-administrators/BenefitsSection";
import ExpertiseSectionCondominiums from "@/components/sections/condominiums-administrators/ExpertiseSectionCondominiums";
import TestimonialsSection from "@/components/sections/condominiums-administrators/TestimonialsSection";
import FAQSection from "@/components/sections/condominiums-administrators/FAQSection";
import DealershipsPlansSection from "@/components/sections/dealerships/PlansSection";
import { usePageTitle } from "@/hooks/usePageTitle";

export default function CondominiumsAdministrators() {
  usePageTitle("Condominiums Administrators | Skilabot");
  return (
    <>
      <Header />
      <HeroSection />
      <MetricsSection />
      <BenefitsSection />
      <ExpertiseSectionCondominiums />
      <DealershipsPlansSection />
      <TestimonialsSection />
      <FAQSection />
      <Footer />
    </>
  );
} 