
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import HeroSection from "@/components/sections/tech/HeroSection";
import MetricsSection from "@/components/sections/tech/MetricsSection";
import BenefitsSection from "@/components/sections/tech/BenefitsSection";
import DealershipsPlansSection from "@/components/sections/dealerships/PlansSection";
import ExpertiseSectionTech from "@/components/sections/tech/ExpertiseSectionTech";
import ConversionSection from "@/components/sections/tech/ConversionSection";
import TestimonialsSection from "@/components/sections/tech/TestimonialsSection";
import FAQSection from "@/components/sections/tech/FAQSection";
import { usePageTitle } from "@/hooks/usePageTitle";

export default function TechSupport() {
  usePageTitle("Tech Support | Skilabot");
  return (
    <>
      <Header />
      <HeroSection />
      <MetricsSection />
      <BenefitsSection />
      <ExpertiseSectionTech />
      <ConversionSection />
      <DealershipsPlansSection />
      <TestimonialsSection />
      <FAQSection />
      <Footer />
    </>
  );
}
