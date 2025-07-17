import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import HeroSection from "@/components/sections/dentistry/HeroSection";
import MetricsSection from "@/components/sections/dentistry/MetricsSection";
import BenefitsSection from "@/components/sections/dentistry/BenefitsSection";
import DealershipsPlansSection from "@/components/sections/dealerships/PlansSection";
import ExpertiseSectionDentistry from "@/components/sections/dentistry/ExpertiseSectionDentistry";
import ConversionSection from "@/components/sections/dentistry/ConversionSection";
import TestimonialsSection from "@/components/sections/dentistry/TestimonialsSection";
import FAQSection from "@/components/sections/dentistry/FAQSection";
import { usePageTitle } from "@/hooks/usePageTitle";

export default function Dentistry() {
  usePageTitle("Dentistry | Skilabot");
  return (
    <>
      <Header />
      <HeroSection />
      <MetricsSection />
      <BenefitsSection />
      <ExpertiseSectionDentistry />
      <ConversionSection />
      <DealershipsPlansSection />
      <TestimonialsSection />
      <FAQSection />
      <Footer />
    </>
  );
} 