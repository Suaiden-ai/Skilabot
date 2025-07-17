
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import HeroSection from "@/components/sections/marketing/HeroSection";
import MetricsSection from "@/components/sections/marketing/MetricsSection";
import BenefitsSection from "@/components/sections/marketing/BenefitsSection";
import DealershipsPlansSection from "@/components/sections/dealerships/PlansSection";
import ExpertiseSectionMarketing from "@/components/sections/marketing/ExpertiseSectionMarketing";
import ConversionSection from "@/components/sections/marketing/ConversionSection";
import TestimonialsSection from "@/components/sections/marketing/TestimonialsSection";
import FAQSection from "@/components/sections/marketing/FAQSection";
import { usePageTitle } from "@/hooks/usePageTitle";

export default function MarketingAgencies() {
  usePageTitle("Marketing Agencies | Skilabot");
  return (
    <>
      <Header />
      <HeroSection />
      <MetricsSection />
      <BenefitsSection />
      <ExpertiseSectionMarketing />
      <ConversionSection />
      <DealershipsPlansSection />
      <TestimonialsSection />
      <FAQSection />
      <Footer />
    </>
  );
}
