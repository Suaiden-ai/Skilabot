
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import HeroSection from "@/components/sections/gym/HeroSection";
import MetricsSection from "@/components/sections/gym/MetricsSection";
import BenefitsSection from "@/components/sections/gym/BenefitsSection";
import ChatbotSection from "@/components/sections/dealerships/ChatbotSection";
import ConversionSection from "@/components/sections/gym/ConversionSection";
import TestimonialsSection from "@/components/sections/gym/TestimonialsSection";
import FAQSection from "@/components/sections/gym/FAQSection";

export default function GymsPersonalTrainers() {
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
