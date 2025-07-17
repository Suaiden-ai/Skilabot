
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import HeroSection from "@/components/sections/aesthetic/HeroSection";
import MetricsSection from "@/components/sections/aesthetic/MetricsSection";
import BenefitsSection from "@/components/sections/aesthetic/BenefitsSection";
import DealershipsPlansSection from "@/components/sections/dealerships/PlansSection";
import ExpertiseSectionAesthetic from "@/components/sections/aesthetic/ExpertiseSectionAesthetic";
import ConversionSection from "@/components/sections/aesthetic/ConversionSection";
import TestimonialsSection from "@/components/sections/aesthetic/TestimonialsSection";
import FAQSection from "@/components/sections/aesthetic/FAQSection";
import { usePageTitle } from "@/hooks/usePageTitle";

export default function AestheticClinics() {
  usePageTitle("Aesthetic Clinics | Skilabot");
  return (
    <>
      <Header />
      <HeroSection />
      <MetricsSection />
      <BenefitsSection />
      <ExpertiseSectionAesthetic />
      <ConversionSection />
      <DealershipsPlansSection />
      <TestimonialsSection />
      <FAQSection />
      <Footer />
    </>
  );
}
