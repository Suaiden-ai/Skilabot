import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import HeroSection from "@/components/sections/pet-shops-vet-clinics/HeroSection";
import MetricsSection from "@/components/sections/pet-shops-vet-clinics/MetricsSection";
import BenefitsSection from "@/components/sections/pet-shops-vet-clinics/BenefitsSection";
import DealershipsPlansSection from "@/components/sections/dealerships/PlansSection";
import ExpertiseSectionPetShopsVetClinics from "@/components/sections/pet-shops-vet-clinics/ExpertiseSectionPetShopsVetClinics";
import ConversionSection from "@/components/sections/pet-shops-vet-clinics/ConversionSection";
import TestimonialsSection from "@/components/sections/pet-shops-vet-clinics/TestimonialsSection";
import FAQSection from "@/components/sections/pet-shops-vet-clinics/FAQSection";
import { usePageTitle } from "@/hooks/usePageTitle";

export default function PetShopsVetClinics() {
  usePageTitle("Pet Shops & Vet Clinics | Skilabot");
  return (
    <>
      <Header />
      <HeroSection />
      <MetricsSection />
      <BenefitsSection />
      <ExpertiseSectionPetShopsVetClinics />
      <ConversionSection />
      <DealershipsPlansSection />
      <TestimonialsSection />
      <FAQSection />
      <Footer />
    </>
  );
} 