import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import HeroSection from "@/components/sections/accounting/HeroSection";
import MetricsSection from "@/components/sections/accounting/MetricsSection";
import BenefitsSection from "@/components/sections/accounting/BenefitsSection";
import ExpertiseSectionAccounting from "@/components/sections/accounting/ExpertiseSectionAccounting";
import TestimonialsSection from "@/components/sections/accounting/TestimonialsSection";
import FAQSection from "@/components/sections/accounting/FAQSection";
import DealershipsPlansSection from "@/components/sections/dealerships/PlansSection";
import { usePageTitle } from "@/hooks/usePageTitle";

export default function AccountingMeiServices() {
  usePageTitle("Digital Accounting for Small Businesses | Skilabot");
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