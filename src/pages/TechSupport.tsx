
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import HeroSection from "@/components/sections/tech/HeroSection";
import MetricsSection from "@/components/sections/tech/MetricsSection";
import BenefitsSection from "@/components/sections/tech/BenefitsSection";
import ChatbotSection from "@/components/sections/dealerships/ChatbotSection";
import ConversionSection from "@/components/sections/tech/ConversionSection";
import TestimonialsSection from "@/components/sections/tech/TestimonialsSection";
import FAQSection from "@/components/sections/tech/FAQSection";

export default function TechSupport() {
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
