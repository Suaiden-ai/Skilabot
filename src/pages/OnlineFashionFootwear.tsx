import React from "react";
import HeroSection from "@/components/sections/online-fashion-footwear/HeroSection";
import { usePageTitle } from "@/hooks/usePageTitle";
// Section imports will be added as each is created

const OnlineFashionFootwear: React.FC = () => {
  usePageTitle("Online Fashion & Footwear | Skilabot");
  return (
    <div>
      <HeroSection />
      {/* MetricsSection - to be implemented */}
      {/* BenefitsSection - to be implemented */}
      {/* ExpertiseSection - to be implemented */}
      {/* TestimonialsSection - to be implemented */}
      {/* FAQSection - to be implemented */}
      {/* PlansSection (optional) - to be implemented */}
    </div>
  );
};

export default OnlineFashionFootwear; 