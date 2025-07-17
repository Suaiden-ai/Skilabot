import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import HeroSection from "@/components/sections/psychologists-therapists/HeroSection";
import MetricsSection from "@/components/sections/psychologists-therapists/MetricsSection";
import BenefitsSection from "@/components/sections/psychologists-therapists/BenefitsSection";
import DealershipsPlansSection from "@/components/sections/dealerships/PlansSection";
import ExpertiseSectionPsychologists from "@/components/sections/psychologists-therapists/ExpertiseSectionPsychologists";
import TestimonialsSection from "@/components/sections/psychologists-therapists/TestimonialsSection";
import FAQSection from "@/components/sections/psychologists-therapists/FAQSection";
import { usePageTitle } from "@/hooks/usePageTitle";

export default function PsychologistsTherapists() {
  usePageTitle("Psychologists & Therapists | Skilabot");
  return (
    <>
      <Header />
      <HeroSection />
      <MetricsSection />
      <BenefitsSection />
      <ExpertiseSectionPsychologists />
      <DealershipsPlansSection />
      <TestimonialsSection />
      <FAQSection />
      <Footer />
    </>
  );
} 