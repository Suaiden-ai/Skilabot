
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import HeroSection from "@/components/sections/dealerships/HeroSection";
import MetricsSection from "@/components/sections/dealerships/MetricsSection";
import BenefitsSection from "@/components/sections/dealerships/BenefitsSection";
import ExpertiseSection from "@/components/sections/dealerships/ExpertiseSection";
import ConversionSection from "@/components/sections/dealerships/ConversionSection";
import TestimonialsSection from "@/components/sections/dealerships/TestimonialsSection";
import DealershipsPlansSection from "@/components/sections/dealerships/PlansSection";
import FAQSection from "@/components/sections/dealerships/FAQSection";
import { usePageTitle } from "@/hooks/usePageTitle";

export default function DealershipsResellers() {
  usePageTitle("Dealerships & Resellers | Skilabot");
  return (
    <>
      <Header />
      <HeroSection />
      <MetricsSection />
      <BenefitsSection />
      <ExpertiseSection />
      <ConversionSection />
      <TestimonialsSection />
      <DealershipsPlansSection />
      <FAQSection />
      <Footer />
    </>
  );
}
