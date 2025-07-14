
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import HeroSection from "@/components/sections/aesthetic/HeroSection";
import MetricsSection from "@/components/sections/aesthetic/MetricsSection";
import BenefitsSection from "@/components/sections/aesthetic/BenefitsSection";
import ChatbotSection from "@/components/sections/dealerships/ChatbotSection";
import ConversionSection from "@/components/sections/aesthetic/ConversionSection";
import TestimonialsSection from "@/components/sections/aesthetic/TestimonialsSection";
import FAQSection from "@/components/sections/aesthetic/FAQSection";

export default function AestheticClinics() {
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
