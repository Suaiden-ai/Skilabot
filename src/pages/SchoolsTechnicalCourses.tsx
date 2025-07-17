import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import HeroSection from "@/components/sections/schools-technical-courses/HeroSection";
import MetricsSection from "@/components/sections/schools-technical-courses/MetricsSection";
import BenefitsSection from "@/components/sections/schools-technical-courses/BenefitsSection";
import DealershipsPlansSection from "@/components/sections/dealerships/PlansSection";
import ExpertiseSectionSchoolsTechnicalCourses from "@/components/sections/schools-technical-courses/ExpertiseSectionSchoolsTechnicalCourses";
import ConversionSection from "@/components/sections/schools-technical-courses/ConversionSection";
import TestimonialsSection from "@/components/sections/schools-technical-courses/TestimonialsSection";
import FAQSection from "@/components/sections/schools-technical-courses/FAQSection";
import { usePageTitle } from "@/hooks/usePageTitle";

export default function SchoolsTechnicalCourses() {
  usePageTitle("Schools & Technical Courses | Skilabot");
  return (
    <>
      <Header />
      <HeroSection />
      <MetricsSection />
      <BenefitsSection />
      <ExpertiseSectionSchoolsTechnicalCourses />
      <ConversionSection />
      <DealershipsPlansSection />
      <TestimonialsSection />
      <FAQSection />
      <Footer />
    </>
  );
} 