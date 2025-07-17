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
import FadeInUp from "@/components/FadeInUp";
import { usePageTitle } from "@/hooks/usePageTitle";

export default function Index() {
  usePageTitle("Home | Skilabot");
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="pt-16"> {/* Add padding to account for fixed header */}
        <FadeInUp>
          <Hero />
        </FadeInUp>
        {/* <TrustedCompanies /> */}
        {/* <Features /> */}
        <div id="about">
          <FadeInUp>
            <AboutUs />
          </FadeInUp>
        </div>
        <FadeInUp>
          <BusinessCards />
        </FadeInUp>
        <div id="features">
          <FadeInUp>
            <DetailedFeatures />
          </FadeInUp>
        </div>
        <div id="pricing">
          <FadeInUp>
            <Pricing />
          </FadeInUp>
        </div>
        <div id="integrations">
          <FadeInUp>
            <Integrations />
          </FadeInUp>
        </div>
        {/* <News /> */}
        <div id="contact">
          <FadeInUp>
            <Contact />
          </FadeInUp>
        </div>
        <Footer />
      </div>
    </div>
  );
}
