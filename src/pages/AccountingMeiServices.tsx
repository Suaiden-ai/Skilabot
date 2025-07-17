import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import HeroSection from "@/components/sections/accounting-mei-services/HeroSection";
import MetricsSection from "@/components/sections/accounting-mei-services/MetricsSection";
import BenefitsSection from "@/components/sections/accounting-mei-services/BenefitsSection";
import ExpertiseSectionAccounting from "@/components/sections/accounting-mei-services/ExpertiseSectionAccounting";
import TestimonialsSection from "@/components/sections/accounting-mei-services/TestimonialsSection";
import FAQSection from "@/components/sections/accounting-mei-services/FAQSection";
import DealershipsPlansSection from "@/components/sections/dealerships/PlansSection";
import { usePageTitle } from "@/hooks/usePageTitle";

export default function AccountingMeiServices() {
  usePageTitle("Accounting MEI Services | Skilabot");
  return (
    <>
      <Header />
      <HeroSection />
      <MetricsSection />
      <BenefitsSection />
      <ExpertiseSectionAccounting />
      <DealershipsPlansSection />
      <TestimonialsSection />
      <FAQSection />
      <Footer />
    </>
  );
} 