
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import DealershipsPlansSection from "@/components/sections/dealerships/PlansSection";
import ExpertiseSectionPolitical from "@/components/sections/political/ExpertiseSectionPolitical";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  MessageCircle, 
  Calendar, 
  FileText, 
  Clock, 
  BarChart3, 
  Megaphone, 
  MapPin,
  CheckCircle,
  Play,
  ArrowRight,
  Zap
} from "lucide-react";
import FAQSection from "@/components/sections/political/FAQSection";
import TestimonialsSection from "@/components/sections/political/TestimonialsSection";
import BenefitsSection from "@/components/sections/political/BenefitsSection";
import MetricsSection from "@/components/sections/political/MetricsSection";
import { usePageTitle } from "@/hooks/usePageTitle";

const PoliticalAgents = () => {
  usePageTitle("Political Agents | Skilabot");
  const features = [
    "AI with natural language",
    "Integration with WhatsApp, Instagram and Facebook",
    "Dashboard with conversation history",
    "Filters by location or interests",
    "Automated reminder sending"
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <Badge className="bg-[#C62828] text-white">
                <Users className="w-4 h-4 mr-2" />
                For Political Agents
              </Badge>
              
              <div className="space-y-6">
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight text-black">
                  The New Era of{" "}
                  <span className="text-[#C62828]">
                    Political Communication
                  </span>
                </h1>
                
                <p className="text-xl text-black leading-relaxed">
                  An AI chatbot that responds to voters, organizes demands 
                  and keeps your base informed — 24h a day, directly on WhatsApp, Instagram and Facebook.
                </p>
              </div>
              
              <div className="flex gap-4">
                <Button className="h-12 px-8 bg-[#C62828] hover:bg-[#a61b1b] text-white font-semibold rounded-lg transition-all duration-300">
                  Try Free
                </Button>
              </div>
            </div>
            
            <div className="relative flex justify-center items-center">
              <img 
                src="/Imagens/political-hero.png"
                alt="Political Agent Hero"
                className="rounded-2xl shadow-2xl w-full max-w-md object-cover border-4 border-white"
              />
              {/* Floating Cards */}
              <div className="absolute -top-6 -left-6 bg-white p-4 rounded-2xl shadow-xl border border-[#183153] flex items-center gap-2">
                <span className="text-[#C62828] text-lg">🎯</span>
                <div>
                  <p className="font-bold text-[#183153]">New supporter registered!</p>
                  <p className="text-sm text-[#183153]">Welcome to the campaign</p>
                </div>
              </div>
              <div className="absolute top-1/2 -right-8 bg-[#C62828] text-white p-3 rounded-xl shadow-lg flex items-center gap-2">
                <span className="text-lg">📈</span>
                <span>120 new messages</span>
              </div>
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-white text-[#183153] p-4 rounded-2xl shadow-xl flex items-center gap-2 border border-[#C62828]">
                <CheckCircle className="w-5 h-5 text-[#C62828]" />
                <span>Proposal sent successfully!</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <MetricsSection />

      <BenefitsSection />

      <ExpertiseSectionPolitical />

      <DealershipsPlansSection />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* FAQ Section */}
      <FAQSection />

      <Footer />
    </div>
  );
};

export default PoliticalAgents;
