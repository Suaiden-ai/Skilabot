import Header from "@/components/sections/Header";
import Hero from "@/components/sections/Hero";
import TrustedCompanies from "@/components/sections/TrustedCompanies";
import Features from "@/components/sections/Features";
import AboutUs from "@/components/sections/AboutUs";
import DetailedFeatures from "@/components/sections/DetailedFeatures";
import Pricing from "@/components/sections/Pricing";
import Integrations from "@/components/sections/Integrations";
import News from "@/components/sections/News";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import BusinessCards from "@/components/sections/BusinessCards";
import ChatBot from "@/components/Chatbot";
import FadeInUp from "@/components/FadeInUp";
import { usePageTitle } from "@/hooks/usePageTitle";
import { useEffect, useState } from "react";

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  return isMobile;
}

export default function Index() {
  usePageTitle("Home | Skilabot");
  const isMobile = useIsMobile();
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="pt-16"> {/* Add padding to account for fixed header */}
        {isMobile ? <Hero /> : <FadeInUp><Hero /></FadeInUp>}
        {/* <TrustedCompanies /> */}
        {/* <Features /> */}
        <div id="about">
          {isMobile ? <AboutUs /> : <FadeInUp><AboutUs /></FadeInUp>}
        </div>
        {isMobile ? <BusinessCards /> : <FadeInUp><BusinessCards /></FadeInUp>}
        <div id="features">
          {isMobile ? <DetailedFeatures /> : <FadeInUp><DetailedFeatures /></FadeInUp>}
        </div>
        <div id="pricing">
          {isMobile ? <Pricing /> : <FadeInUp><Pricing /></FadeInUp>}
        </div>
        <div id="integrations">
          {isMobile ? <Integrations /> : <FadeInUp><Integrations /></FadeInUp>}
        </div>
        {/* <News /> */}
        <div id="contact">
          {isMobile ? <Contact /> : <FadeInUp><Contact /></FadeInUp>}
        </div>
        <Footer />
      </div>
      <ChatBot />
    </div>
  );
}
