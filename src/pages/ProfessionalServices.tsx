import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import HeroSection from "@/components/sections/professional-services/HeroSection";
import MetricsSection from "@/components/sections/professional-services/MetricsSection";
import BenefitsSection from "@/components/sections/professional-services/BenefitsSection";
import ExpertiseSectionProfessional from "@/components/sections/professional-services/ExpertiseSectionProfessional";
import TestimonialsSection from "@/components/sections/professional-services/TestimonialsSection";
import FAQSection from "@/components/sections/professional-services/FAQSection";
import DealershipsPlansSection from "@/components/sections/dealerships/PlansSection";
import { usePageTitle } from "@/hooks/usePageTitle";

export default function ProfessionalServices() {
  usePageTitle("Professional Services | Skilabot");
  return (
    <>
      <Header />
      <HeroSection />
      <MetricsSection />
      <BenefitsSection />
      <ExpertiseSectionProfessional />
      <DealershipsPlansSection />
      <TestimonialsSection />
      <FAQSection />
      <Footer />
    </>
  );
} 