import React from "react";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import HeroSection from "@/components/sections/online-fashion-footwear/HeroSection";
import MetricsSection from "@/components/sections/online-fashion-footwear/MetricsSection";
import BenefitsSection from "@/components/sections/online-fashion-footwear/BenefitsSection";
import DealershipsPlansSection from "@/components/sections/dealerships/PlansSection";
import ExpertiseSectionOnlineFashionFootwear from "@/components/sections/online-fashion-footwear/ExpertiseSectionOnlineFashionFootwear";
import ConversionSection from "@/components/sections/online-fashion-footwear/ConversionSection";
import TestimonialsSection from "@/components/sections/online-fashion-footwear/TestimonialsSection";
import FAQSection from "@/components/sections/online-fashion-footwear/FAQSection";
import { usePageTitle } from "@/hooks/usePageTitle";

export default function OnlineFashionFootwear() {
  usePageTitle("Online Fashion & Footwear | Skilabot");
  return (
    <>
      <Header />
      <HeroSection />
      <MetricsSection />
      <BenefitsSection />
      <ExpertiseSectionOnlineFashionFootwear />
      <ConversionSection />
      <DealershipsPlansSection />
      <TestimonialsSection />
      <FAQSection />
      <Footer />
    </>
  );
} 