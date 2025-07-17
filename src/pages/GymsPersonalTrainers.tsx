
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import HeroSection from "@/components/sections/gym/HeroSection";
import MetricsSection from "@/components/sections/gym/MetricsSection";
import BenefitsSection from "@/components/sections/gym/BenefitsSection";
import ConversionSection from "@/components/sections/gym/ConversionSection";
import TestimonialsSection from "@/components/sections/gym/TestimonialsSection";
import FAQSection from "@/components/sections/gym/FAQSection";
import DealershipsPlansSection from "@/components/sections/dealerships/PlansSection";
import ExpertiseSectionGym from "@/components/sections/gym/ExpertiseSectionGym";
import { usePageTitle } from "@/hooks/usePageTitle";

export default function GymsPersonalTrainers() {
  usePageTitle("Gyms & Personal Trainers | Skilabot");
  return (
    <>
      <Header />
      <HeroSection />
      <MetricsSection />
      <BenefitsSection />
      <ExpertiseSectionGym />
      <ConversionSection />
      <DealershipsPlansSection />
      <TestimonialsSection />
      <FAQSection />
      <Footer />
    </>
  );
}
