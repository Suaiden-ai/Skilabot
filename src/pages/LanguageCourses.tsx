import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import HeroSection from "@/components/sections/language-courses/HeroSection";
import MetricsSection from "@/components/sections/language-courses/MetricsSection";
import BenefitsSection from "@/components/sections/language-courses/BenefitsSection";
import DealershipsPlansSection from "@/components/sections/dealerships/PlansSection";
import ExpertiseSectionLanguageCourses from "@/components/sections/language-courses/ExpertiseSectionLanguageCourses";
import ConversionSection from "@/components/sections/language-courses/ConversionSection";
import TestimonialsSection from "@/components/sections/language-courses/TestimonialsSection";
import FAQSection from "@/components/sections/language-courses/FAQSection";
import { usePageTitle } from "@/hooks/usePageTitle";

export default function LanguageCourses() {
  usePageTitle("Language Courses | Skilabot");
  return (
    <>
      <Header />
      <HeroSection />
      <MetricsSection />
      <BenefitsSection />
      <ExpertiseSectionLanguageCourses />
      <ConversionSection />
      <DealershipsPlansSection />
      <TestimonialsSection />
      <FAQSection />
      <Footer />
    </>
  );
} 