import React from "react";
import Header from "@/components/sections/Header";
import HeroSection from "@/components/sections/cleaning-pools/HeroSection";
import MetricsSection from "@/components/sections/cleaning-pools/MetricsSection";
import BenefitsSection from "@/components/sections/cleaning-pools/BenefitsSection";
import DealershipsPlansSection from "@/components/sections/dealerships/PlansSection";
import ExpertiseSectionCleaningPools from "@/components/sections/cleaning-pools/ExpertiseSectionCleaningPools";
import TestimonialsSection from "@/components/sections/cleaning-pools/TestimonialsSection";
import FAQSection from "@/components/sections/cleaning-pools/FAQSection";
import Footer from "@/components/sections/Footer";
import { usePageTitle } from "@/hooks/usePageTitle";
// Section imports will be added as each is created

const CleaningPools: React.FC = () => {
  usePageTitle("Cleaning Pools | Skilabot");
  return (
    <>
      <Header />
      <HeroSection />
      <MetricsSection />
      <BenefitsSection />
      <ExpertiseSectionCleaningPools />
      <DealershipsPlansSection />
      <TestimonialsSection />
      <FAQSection />
      {/* PlansSection (optional) - to be implemented */}
      <Footer />
    </>
  );
};

export default CleaningPools; 