import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import HeroSection from "@/components/sections/infoproducers-online-courses/HeroSection";
import MetricsSection from "@/components/sections/infoproducers-online-courses/MetricsSection";
import BenefitsSection from "@/components/sections/infoproducers-online-courses/BenefitsSection";
import DealershipsPlansSection from "@/components/sections/dealerships/PlansSection";
import ExpertiseSectionInfoproducers from "@/components/sections/infoproducers-online-courses/ExpertiseSectionInfoproducers";
import ConversionSection from "@/components/sections/infoproducers-online-courses/ConversionSection";
import TestimonialsSection from "@/components/sections/infoproducers-online-courses/TestimonialsSection";
import FAQSection from "@/components/sections/infoproducers-online-courses/FAQSection";
import { usePageTitle } from "@/hooks/usePageTitle";

export default function InfoproducersOnlineCourses() {
  usePageTitle("Infoproducers & Online Courses | Skilabot");
  return (
    <>
      <Header />
      <HeroSection />
      <MetricsSection />
      <BenefitsSection />
      <ExpertiseSectionInfoproducers />
      <ConversionSection />
      <DealershipsPlansSection />
      <TestimonialsSection />
      <FAQSection />
      <Footer />
    </>
  );
} 