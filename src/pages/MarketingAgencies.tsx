
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import HeroSection from "@/components/sections/marketing/HeroSection";
import MetricsSection from "@/components/sections/marketing/MetricsSection";
import BenefitsSection from "@/components/sections/marketing/BenefitsSection";
import ChatbotSection from "@/components/sections/dealerships/ChatbotSection";
import ConversionSection from "@/components/sections/marketing/ConversionSection";
import TestimonialsSection from "@/components/sections/marketing/TestimonialsSection";
import FAQSection from "@/components/sections/marketing/FAQSection";

export default function MarketingAgencies() {
  return (
    <>
      <Header />
      <HeroSection />
      <MetricsSection />
      <BenefitsSection />
      <ChatbotSection />
      <ConversionSection />
      <TestimonialsSection />
      <FAQSection />
      <Footer />
    </>
  );
}
