import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import HeroSection from "@/components/sections/healthcare-professionals/HeroSection";
import MetricsSection from "@/components/sections/healthcare-professionals/MetricsSection";
import BenefitsSection from "@/components/sections/healthcare-professionals/BenefitsSection";
import DealershipsPlansSection from "@/components/sections/dealerships/PlansSection";
import ExpertiseSectionHealthcare from "@/components/sections/healthcare-professionals/ExpertiseSectionHealthcare";
import TestimonialsSection from "@/components/sections/healthcare-professionals/TestimonialsSection";
import FAQSection from "@/components/sections/healthcare-professionals/FAQSection";
import { usePageTitle } from "@/hooks/usePageTitle";

export default function HealthcareProfessionals() {
  usePageTitle("Healthcare Professionals | Skilabot");
  return (
    <>
      <Header />
      <HeroSection />
      <MetricsSection />
      <BenefitsSection />
      <ExpertiseSectionHealthcare />
      <DealershipsPlansSection />
      <TestimonialsSection />
      <FAQSection />
      <Footer />
    </>
  );
} 