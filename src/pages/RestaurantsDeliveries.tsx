import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import HeroSection from "@/components/sections/restaurants-deliveries/HeroSection";
import MetricsSection from "@/components/sections/restaurants-deliveries/MetricsSection";
import BenefitsSection from "@/components/sections/restaurants-deliveries/BenefitsSection";
import DealershipsPlansSection from "@/components/sections/dealerships/PlansSection";
import ExpertiseSectionRestaurants from "@/components/sections/restaurants-deliveries/ExpertiseSectionRestaurants";
import TestimonialsSection from "@/components/sections/restaurants-deliveries/TestimonialsSection";
import FAQSection from "@/components/sections/restaurants-deliveries/FAQSection";
import { usePageTitle } from "@/hooks/usePageTitle";

export default function RestaurantsDeliveries() {
  usePageTitle("Restaurants & Deliveries | Skilabot");
  return (
    <>
      <Header />
      <HeroSection />
      <MetricsSection />
      <BenefitsSection />
      <ExpertiseSectionRestaurants />
      <DealershipsPlansSection />
      <TestimonialsSection />
      <FAQSection />
      <Footer />
    </>
  );
} 